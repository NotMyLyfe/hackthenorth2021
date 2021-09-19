<template>
  <div>
    <a-layout style="padding: 24px; background-color: #fff">
      <a-layout-content :style="{padding: '24px', margin: 0, minHeight: '280px' }">
        <a-row>
          <a-col :span="6">
            <h2>Modes</h2>
            <a-list item-layout="horizontal" :data-source="modes">
              <a-list-item slot="renderItem" slot-scope="item" @click="changeConfiguringMode(item)">
                <a-list-item-meta :description="item">
                </a-list-item-meta>
              </a-list-item>
            </a-list>
            <a-button type="primary" style="margin-top : 1vh;" @click="createMode">Add Mode</a-button>
          </a-col>
          <a-col :span="16" :offset="2">
            <h1>Configuring Mode: <strong>{{selectedMode || "NONE"}}</strong></h1>
            <div v-if="selectedMode">
              <div style="margin-left: 2em;">
                <a-form :form="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
                  <a-form-item label="Name">
                    <a-input v-model="modeInfo.name" :disabled="!creatingMode"/>
                  </a-form-item>
                  <a-form-item label="Sound">
                    <a-input v-model="modeInfo.sound" />
                  </a-form-item>
                  <a-form-item label="Automation">
                    <a-radio-group v-model="modeInfo.automation">
                      <a-radio value="none">
                        None
                      </a-radio>
                      <a-radio value="time">
                        Time
                      </a-radio>
                      <a-radio value="app">
                        App
                      </a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item label="App Name" v-if="modeInfo && modeInfo.automation === 'app'">
                    <a-input v-model="modeInfo.automationData.appName" />
                  </a-form-item>
                  <div v-if="modeInfo && modeInfo.automation === 'time'">
                    <a-form-item label="Days">
                      <a-select mode="multiple" size="default" placeholder="Please select" v-model="modeInfo.automationData.timeDay">
                        <a-select-option v-for="day in DAYS_OF_WEEK" v-bind:key="day" :value="day">
                          {{day}}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="Start Time">
                      <a-time-picker use12-hours format="h:mm:ss A" v-model="modeInfo.automationData.timeStartTime" />
                    </a-form-item>
                    <a-form-item label="End Time">
                      <a-time-picker use12-hours format="h:mm:ss A" v-model="modeInfo.automationData.timeEndTime" />
                    </a-form-item>
                  </div>
                </a-form>
              </div>
              <h1>Allowed Users:</h1>
              <div style="margin-left: 2em;">
                <a-form layout="inline">
                  <a-form-item :validate-status="addingUserID.validateStatus" :help="addingUserID.errorMsg">
                    <a-input placeholder="Discord ID" v-model="addingUserID.value"></a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" @click="addModeUser">Add</a-button>
                  </a-form-item>
                </a-form>
                <div style="height: 33vh; overflow-y: scroll;">
                  <a-list item-layout="horizontal" :data-source="modeUsersRich">
                    <a-list-item slot="renderItem" slot-scope="item">
                      <a-button slot="actions" type="danger" @click="removeModeUser(item)">x</a-button>
                      <a-list-item-meta :description="item.id">
                        <a slot="title">{{item.username}}#{{item.discriminator}}</a>
                        <a-avatar slot="avatar" :src="item.img"/>
                      </a-list-item-meta>
                    </a-list-item>
                  </a-list>
                </div>
              </div>
            </div>
            <div v-else>
              <h2>No mode selected.</h2>
            </div>
          </a-col>
        </a-row>
        <a-row type = "flex" justify="end" id = "configRow" v-if="selectedMode">
          <a-col>
            <a-button type="danger" @click="deleteMode">Delete</a-button>
            &nbsp;
            <a-button type="primary" @click="saveModeChanges">Save Changes</a-button>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import * as DiscordApiService from '@/services/DiscordAPIService';
import Swal from 'sweetalert2';
import moment from 'moment';
export default {
  name: "Configuration",
  data() {
    return {
      selectedMode: "",
      modeInfo: {},
      modes: [], // get from IPC
      modeUsersRich: [],
      DAYS_OF_WEEK: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      creatingMode: false,
      addingUserID: {
        validateStatus: "",
        errorMsg: null,
        value: ""
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'editModeConfig'})
    this.form2 = this.$form.createForm(this, {name: 'addUser'})
  },
  async mounted() {
    // add IPC call to fetch configured modeUsers for the mode
    this.modes = await DiscordApiService.getModes();

    if(this.modes.length > 0){
      await this.changeConfiguringMode(this.modes[0]);
    }
  },
  methods: {
    unselectMode() {
      this.selectedMode = "";
      this.modeInfo = {};
      this.creatingMode = false;
    },
    async refreshModes() {
      this.modes = await DiscordApiService.getModes();
    },
    async hydrateModeUsers() {
      this.modeUsersRich = [];
      const startingMode = this.selectedMode;
      for(const userID of this.modeInfo.users){
        // replace with IPC call
        DiscordApiService.getUserInfoFromID(userID).then((userInfo) => {
          if(startingMode === this.selectedMode){
            this.modeUsersRich.push({
              img: this.buildUserAvaterURL(userInfo.id, userInfo.discriminator, userInfo.avatar),
              ...userInfo,
            });
          }
        })

      }
    },
    buildUserAvaterURL(id, disc, avatar) {
      if(avatar){
        return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
      }
      else {
        return `https://cdn.discordapp.com/embed/avatars/${Number(disc) % 5}.png`
      }
    },
    async changeConfiguringMode(name, creating=false) {
      this.selectedMode = name;
      this.creatingMode = creating;
      if(creating){
        this.modeInfo = {
          name: name,
          sound: "",
          users: [],
          automation: "none",
          automationData: {}
        }
      }
      else {
        const remoteModeInfo = await DiscordApiService.getMode(name);
        if(remoteModeInfo.automationData.timeStartTime){
          remoteModeInfo.automationData.timeStartTime = moment(remoteModeInfo.automationData.timeStartTime);
        }
        if(remoteModeInfo.automationData.timeEndTime){
          remoteModeInfo.automationData.timeEndTime = moment(remoteModeInfo.automationData.timeEndTime);
        }
        this.modeInfo = {
          name: name,
          ...remoteModeInfo
        }
      }

      await this.hydrateModeUsers();
    },
    async addModeUser() {
      if(this.addingUserID.value){
        try {
          const userData = await DiscordApiService.getUserInfoFromID(this.addingUserID.value);
          console.log(userData);
          this.addingUserID.validateStatus = 'success';
          this.addingUserID.errorMsg = '';

          if(this.modeInfo.users.indexOf(this.addingUserID.value) === -1){
            this.modeInfo.users.push(this.addingUserID.value);
          }

          this.addingUserID.value = "";

          await this.hydrateModeUsers();
        }
        catch(err){
          this.addingUserID.validateStatus = 'error';
          this.addingUserID.errorMsg = 'The given user does not exist!';
        }
      }
      else {
        this.addingUserID.validateStatus = 'error';
        this.addingUserID.errorMsg = 'Please enter an ID';
      }
    },
    async removeModeUser(item) {
      console.log(item);
      const ind = this.modeInfo.users.indexOf(item.id);
      this.modeInfo.users.splice(ind, 1);
      await this.hydrateModeUsers();
    },
    async createMode() {
      const modeName = "cool-mode-" + Math.floor(Math.random() * 1000);
      await this.changeConfiguringMode(modeName, true);
    },
    async saveModeChanges() {
      // filter automation info
      if(this.modeInfo.automation === "none"){
        this.modeInfo.automationData = {};
      }
      else if(this.modeInfo.automation === "app"){
        const t = {};
        for(const key of Object.keys(this.modeInfo.automationData)){
          if(key.startsWith("app")){
            t[key] = this.modeInfo.automationData[key];
          }
        }
        this.modeInfo.automationData = t;
      }
      else {
        const t = {};
        for(const key of Object.keys(this.modeInfo.automationData)){
          if(key.startsWith("time")){
            t[key] = this.modeInfo.automationData[key];
          }
        }
        this.modeInfo.automationData = t;

        if(this.modeInfo.automationData["timeStartTime"].isAfter(this.modeInfo.automationData["timeEndTime"])){
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "The start time must be before the end time!"
          });
          return;
        }
      }

      if(this.creatingMode){
        await DiscordApiService.createMode(this.modeInfo.name, this.modeInfo.sound, this.modeInfo.automation, this.modeInfo.automationData, this.modeInfo.users);
        await this.refreshModes();
      }
      else {
        await DiscordApiService.editMode(this.modeInfo.name, this.modeInfo.sound, this.modeInfo.automation, this.modeInfo.automationData, this.modeInfo.users)
      }
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Mode ${this.creatingMode ? 'created' : 'updated'}!`
      })
    },
    async deleteMode() {
      await DiscordApiService.deleteMode(this.modeInfo.name);
      this.unselectMode();
      await this.refreshModes();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Mode deleted!`
      })
    }
  }
}
</script>

<style>
  #configRow {
      margin-top: 1vh;
  }
</style>