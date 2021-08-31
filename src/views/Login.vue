<template>
  <div>
    <Navbar />
    <!-- <div>
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
    <button type="submit" @click="login">Login</button> -->
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
          this.setToken(res.data.token);
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) console.log("Not Verified");
          else console.log("Invalid Credentials");
        });
    },
  },
};
</script>

<style>
</style>