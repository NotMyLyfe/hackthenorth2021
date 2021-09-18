import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: "vuex",
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    discordAPICreds: {},
    userInfoCache: {}
  },
  mutations: {
    setDiscordAPICreds(state, creds) {
      state.discordAPICreds = creds;
    },
    // setUserInfoCache(state, userID, info) {
    //
    // }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
