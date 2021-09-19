<template>
  <div id="mainPage">
      <a-layout style="padding: 24px; background-color: #fff">
        <a-page-header
            title="Main Menu"
            sub-title = "Welcome to Focuscord!"
        />
        <a-layout-content :style="{padding: '24px', margin: 0, minHeight: '280px' }">
          <a-row id = "changeStat">
            <a-col :span="24"><h2>CURRENT STATUS:</h2>
              <a-cascader :options="options"
                          :display-render="displayRender"
                          placeholder="Select Status"
                          v-model="currentMode"
                          @change="switchMode" />
            </a-col>
          </a-row>
          <a-row class="inbtw" v-if="currentMode[0] !== 'Disabled'">
            <a-col :span="24"><h2>Only allow notifications for:</h2>
            </a-col>
            <a-col :span="24">
              <a-list class="listScroller" item-layout="horizontal" :data-source="modeUsersRich" v-if="currentMode !== 'Disabled'">
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta :description="item.id">
                    <a slot="title" >{{item.username}}#{{item.discriminator}}</a>
                    <a-avatar slot="avatar" :src="item.img"></a-avatar>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="24">
              <router-link to="/configuration"><a-button id = "configBtn" type="primary">Configure Modes</a-button></router-link>
            </a-col>
          </a-row>
          <a-row class="inbtw" v-else>
            <a-col :span="24"><h1>FocusCord is disabled. All notifications are permitted.</h1></a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
  </div>
</template>
<style scoped>
  #changeStat {
    font-weight: bold;
  }
  #configBtn {
    float: right;
  }
  #configRow {
    padding-top : 1vh;
  }
  .listScroller {
    max-height: 30vh;
    overflow: scroll;
  }
  .inbtw {
    margin-top: 1vh;
  }
</style>
<script>
import * as DiscordApiService from '@/services/DiscordAPIService';
export default {
  name: "Home",
  async beforeMount() {
    this.currentMode = [await DiscordApiService.getCurrentMode()];
    await this.refreshModes();
    await this.hydrateModeUsers();

    setInterval(async () => {
      const oMode = this.currentMode[0];
      const nMode = await DiscordApiService.getCurrentMode();

      if(oMode !== nMode){
        this.currentMode = [await DiscordApiService.getCurrentMode()];
        await this.hydrateModeUsers();
      }

    }, 10000);
  },
  data() {
    return {
      currentMode: ["Disabled"],
      modeUsersRich: [],
      options : []
    }
  },
  methods : {
    async refreshModes() {
      const modes = await DiscordApiService.getModes();
      const modesHydrated = [{
        value: "Disabled",
        label: "Disabled"
      }];
      for(const mode of modes){
        modesHydrated.push({
          value: mode,
          label: mode
        })
      }
      this.options = modesHydrated;
    },
    async hydrateModeUsers() {
      if(this.currentMode[0] !== 'Disabled'){
        const modeInfo = await DiscordApiService.getMode(this.currentMode[0]);
        this.modeUsersRich = [];
        const startingMode = this.currentMode[0];
        for(const userID of modeInfo.users){
          // replace with IPC call
          DiscordApiService.getUserInfoFromID(userID).then((userInfo) => {
            console.log(userInfo);
            if(startingMode === this.currentMode[0]){
              this.modeUsersRich.push({
                img: this.buildUserAvaterURL(userInfo.id, userInfo.discriminator, userInfo.avatar),
                ...userInfo,
              });
            }
          })

        }
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
    displayRender({ labels }) {
      return labels[labels.length-1];
    },
    async switchMode() {
      await DiscordApiService.setCurrentMode(this.currentMode[0]);
      await this.hydrateModeUsers();
    }
  }
}
</script>

