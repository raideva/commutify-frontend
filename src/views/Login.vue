<template>
  <div>
            <v-card class="elevation-15" fluid fill-width>
              <v-app-bar dark color="#141414">
                <v-app-bar-title>Login form</v-app-bar-title>
                <v-spacer></v-spacer>
                <v-btn
              dark
              color="#80002a"
              @click="Close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
              </v-app-bar>
              <v-card-text class="form">
                <v-form v-on:submit.prevent>
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    v-model="username"
                    :rules="rules"
                    label="Username"
                    type="text"
                    :error-messages="error_username"
                    v-on:keyup.enter="login"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    v-model="password"
                    :rules="rules"
                    label="Password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    counter
                    :error-messages="error_password"
                    v-on:keyup.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="form">
                <div class="center">
                <v-btn color="teal" @click="login" elevation="8" class="btn">Login</v-btn>
                </div>
              </v-card-actions>
            </v-card>


  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      show: "",
      error_username: "",
      error_password: "",
      rules: [ value => !!value || 'Required.' ],
    };
  },
  methods: {
    ...mapActions({
      setToken: "auth/setToken",
    }),

    Close() {
      this.$emit('close', );
    },

    login() {
      if (this.username === ""){
        this.error_username = "This field is required";
      return;}
      else this.error_username = "";
      if(this.password === ""){
        this.error_password = "This field is required";
        return;
      }
      else this.error_password = "";
      const data = {
        username: this.username,
        password: this.password,
      };
      this.axios
        .post("auth/login/", data)
        .then((res) => {
          this.setToken({token: res.data.token,username: this.username});
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401){
          this.password = "";
          this.$fire({
          title: "Verify your Email",
          text: "Your email id is not verified, check the link in your inbox.",
          type: "warning",
          timer: 100000
        });
          }
          else {
            this.error_username = "Invalid Credentials";
          this.password = "";
          setTimeout(() => {
          this.error_username = "";}, 5000);}
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form{
  background-color: rgb(210, 214, 221);
}
.btn{
  align-self: center;
  color: white;
}
.center {
  margin: 0;
  position: relative;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>