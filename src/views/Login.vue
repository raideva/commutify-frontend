<template>
  <div>
    <Navbar />
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs6 sm5 md4>
            <v-card class="elevation-12">
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
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    v-model="password"
                    :rules="rules"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
              <v-alert
                  id="try"
              >{{error_message}}</v-alert>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Login",
  components: { Navbar },
  data() {
    return {
      username: "",
      password: "",
      error_message: "",
      rules: [ value => !!value || 'Required.' ],
    };
  },
  methods: {
    ...mapActions({
      setToken: "auth/setToken",
    }),

    login() {
      if (this.username === "" || this.password === "") return;
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
          if (err.response.status === 401){this.error_message = "*Please verify your email.";
          this.password = "";}
          else {this.error_message = "*Invalid Credentials";
          this.password = "";}
        });
    },
  },
};
</script>

<style>
#try{
  color: rgb(255, 0, 0);
  /* display: none; */

}
</style>