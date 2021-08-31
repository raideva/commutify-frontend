// import Vuex from 'vuex';
import auth from './auth';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// Create store
export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {

  },

  mutations: {

  },

  actions: {

  },

  modules: {
    auth
  }
});