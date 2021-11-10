import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueSimpleAlert from "vue-simple-alert"
import firebase from 'firebase'
 
Vue.use(VueSimpleAlert);

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

var firebaseConfig = {

  apiKey: "AIzaSyB9j26jNE9RJWY97jL9ZH9O0ucdmhydAeo",

  authDomain: "commutify-server.firebaseapp.com",

  databaseURL: "https://commutify-server-default-rtdb.firebaseio.com",

  projectId: "commutify-server",

  storageBucket: "commutify-server.appspot.com",

  messagingSenderId: "1024396092441",

  appId: "1:1024396092441:web:d4e809d5456deeda94b688",

  measurementId: "G-P84FRQNHCF"

};

firebase.initializeApp(firebaseConfig);
console.log(firebase);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
