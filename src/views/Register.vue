<template>
  <!-- <div>
    <label for="username">
      <input
        id="username"
        v-model="username"
        type="text"
        name="username"
        placeholder="Username"
        required
      />
    </label>
    <label for="first_name">
      <input
        id="first_name"
        v-model="first_name"
        type="text"
        name="first_name"
        placeholder="First Name"
        required
      />
    </label>
    <label for="last_name">
      <input
        id="last_name"
        v-model="last_name"
        type="text"
        name="last_name"
        placeholder="Last Name"
        required
      />
    </label>
    <label for="email">
      <input
        id="email"
        v-model="email"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
    </label>
    <label for="dob">
      <input
        id="dob"
        v-model="dob"
        type="date"
        name="dob"
        placeholder="dd-mm-yyyy"
        required
      />
    </label>
    <label for="password">
      <input
        id="password"
        v-model="password"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
    </label>
    <label for="password1">
      <input
        id="password1"
        v-model="password1"
        type="password"
        name="password1"
        placeholder="Repeat Password"
        required
      />
    </label>
    <button type="submit" @click="register">Register</button>
  </div> -->
  <div>
    <Navbar />
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs6 sm5 md4>
            <v-card class="elevation-12">
              <v-app-bar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
              </v-app-bar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="register"
                    v-model="username"
                    :rules="rules"
                    label="Username"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    name="first_name"
                    prepend-icon="contact"
                    v-model="first_name"
                    :rules="rules"
                    label="First Name"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    name="last_name"
                    prepend-icon="contact"
                    v-model="last_name"
                    :rules="rules"
                    label="Last Name"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    name="email"
                    prepend-icon="email"
                    v-model="email"
                    :rules="rules"
                    label="Email"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    name="dob"
                    prepend-icon="contact"
                    v-model="dob"
                    :rules="rules"
                    label="Date Of Birth"
                    type="date"
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
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    v-model="password1"
                    :rules="rules"
                    label="Repeat Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Register",
  components: {
    Navbar,
  },
  data() {
    return {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      dob: "",
      password: "",
      password1: "",
      rules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    validate() {
      if (this.password !== this.password1) return false;
      return true;
    },
    register() {
      if (!this.validate()) return;
      const data = {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        dob: this.dob,
        password: this.password,
      };
      this.axios
        .post("auth/register/", data)
        .then(() => {console.log("Verify Email Now");this.$router.push('login/');})
        .catch((err) => console.log(err.response.data));
    },
  },
};
</script>

<style>
.autofill-fix .v-text-field--outlined .v-input--dense .v-label {
  left: -28px!important;
  transform: translateY(-16px) scale(.75);
}
</style>