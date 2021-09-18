<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/configuration">Configuration</router-link> |
      <router-link to="/sms">SMS</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import * as DiscordApiService from '@/services/DiscordAPIService';
import store from '@/store/index';
export default {
  mounted() {
    this.refreshToken();
  },
  methods: {
    async refreshToken() {
      if(!store.state.discordAPICreds?.access_token){
        const authInfo = await DiscordApiService.getUserInfoFromID();
        store.commit('setDiscordAPICreds', authInfo);

        setTimeout(this.refreshToken, authInfo.expires_in)
      }
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
