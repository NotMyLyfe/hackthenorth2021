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
            <a-button type="primary" style="margin-top : 1vh;">Add New Configuration</a-button>
          </a-col>
          <a-col :span="16" :offset="2">
            <h1>Configuring Mode: <strong>{{selectedMode}}</strong></h1>
            <div style="margin-left: 2em;">
              <a-form :form="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
                <a-form-item label="Name">
                  <a-input v-model="modeInfo.name" />
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
                    <a-select mode="multiple" size="default" placeholder="Please select">
                      <a-select-option v-for="day in DAYS_OF_WEEK" v-bind:key="day" :value="day">
                        {{day}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="Start Time">
                    <a-time-picker use12-hours format="h:mm:ss A" v-model="modeInfo.automationData.startTime" />
                  </a-form-item>
                  <a-form-item label="End Time">
                    <a-time-picker use12-hours format="h:mm:ss A" v-model="modeInfo.automationData.endTime" />
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
          </a-col>
        </a-row>
      </a-layout-content>
      <a-row type = "flex" justify="end" id = "configRow">
          <a-col>
            <a-button type="danger">Cancel</a-button>
            &nbsp;
            <a-button type="primary">Save Changes</a-button>
          </a-col>
        </a-row>
    </a-layout>
  </div>
</template>

<script>
import * as DiscordApiService from '@/services/DiscordAPIService';
export default {
  name: "Configuration",
  data() {
    return {
      selectedMode: "",
      modeInfo: {},
      modes: ["Urgent", "NotSoMuch"], // get from IPC
      modeUsersRich: [],
      DAYS_OF_WEEK: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
    await this.changeConfiguringMode("Urgent")
  },
  methods: {
    async hydrateModeUsers() {
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
    async changeConfiguringMode(name) {
      this.selectedMode = name;
      const modeData = {
        Urgent: {
          name: "yay",
          sound: "yay",
          users: ["454791971244867620", "859093199390113803"],
          automation: "none",
          automationData: {}
        },
        NotSoMuch: {
          name: "yay",
          sound: "yay",
          users: ["454791971244867620", "859093199390113803", "562711744523403274", "140212462929707008", "884092037509566524"],
          automation: "app",
          automationData: {
            appName: "lol.exe"
          }
        }
      };

      this.modeInfo = modeData[name];
      this.modeUsersRich = [];
      await this.hydrateModeUsers();
    },
    async addModeUser() {
      console.log(this.addingUserID.value);
      if(this.addingUserID.value){
        try {
          const userData = await DiscordApiService.getUserInfoFromID(this.addingUserID.value);
          console.log(userData);
          this.addingUserID.validateStatus = 'success';
          this.addingUserID.errorMsg = '';

          this.addingUserID.value = "";
          // TODO: implement add
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
      //TODO: Implement item
      // await this.hydrateModeUsers();
    }
  }
}
</script>

<style>
  #configRow {
      margin-top: 1vh;
  }
</style>