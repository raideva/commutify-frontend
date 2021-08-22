<template>
  <div>
    <div>
      <label for="username">
        <input
          id="username"
          v-model="username"
          type="text"
          name="username"
          placeholder="Username"
        />
      </label>
      <label for="password">
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </label>
    </div>
    <button type="submit" @click="login">Login</button>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      setToken: 'auth/setToken'
    }),

    login(){
      if(this.username==='' || this.password==='')return;
      const data = {
        username: this.username,
        password: this.password
      }
      this.axios.post('auth/login/',data)
        .then(res=>{
          this.setToken(res.data.token);
        })
        .catch(err=>{
          console.log(err)
          if(err.response.status===401)console.log('Not Verified');
          else console.log('Invalid Credentials');
        })
    }
  },
};
</script>

<style>
</style>