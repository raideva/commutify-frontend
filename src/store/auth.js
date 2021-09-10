export default {
  namespaced: true,
  state: {
    token: null,
    loggedIn: false,
    username: null,
  },

  mutations: {
    SET_TOKEN(state,{token,username}) {
        state.token = token
        state.loggedIn = token===null?false:true
        state.username = username
    }
  },

  actions: {
    setToken({commit}, {token,username}){
      console.log(token,username,'hi');
        commit('SET_TOKEN', {token, username})
    },
    getToken(){
      
    }
  },

  modules: {

  }
}