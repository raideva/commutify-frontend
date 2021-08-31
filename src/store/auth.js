export default {
  namespaced: true,
  state: {
    token: null,
    loggedIn: false,
  },

  mutations: {
    SET_TOKEN(state,token) {
        state.token = token
        state.loggedIn = token===null?false:true
    }
  },

  actions: {
    setToken({commit}, token){
        commit('SET_TOKEN', token)
    },
    getToken(){
      
    }
  },

  modules: {

  }
}