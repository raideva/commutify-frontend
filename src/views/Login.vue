<template>
  <div>
            <v-card class="elevation-15" fluid fill-width>
              <v-app-bar dark color="primary">
                <v-app-bar-title>Login form</v-app-bar-title>
              </v-app-bar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    v-model="username"
                    :rules="rules"
                    label="Username"
                    type="text"
                    :error-messages="error_username"
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
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login" elevation="8">Login</v-btn>
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
#try{
  color: rgb(255, 0, 0);
  /* display: none; */

}
</style>