<template>
  <div>
    <Navbar />
    <!-- 
    <label for="newpasswd">
      <input
        id="newpasswd"
        v-model="newpasswd"
        type="text"
        v-if="otpsent"
        name="newpasswd"
        placeholder="New Password"
        required
      />
    </label>
    <label for="newpasswd1">
      <input
        id="newpasswd1"
        v-model="newpasswd1"
        type="text"
        v-if="otpsent"
        name="newpasswd1"
        placeholder="Repeat New Password"
        required
      />
    </label>
    <button v-if="otpsent" @click="changePwd">Submit</button> -->
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs6 sm5 md4>
            <v-card class="elevation-12">
              <v-app-bar dark color="primary">
                <v-toolbar-title>Reset Password</v-toolbar-title>
              </v-app-bar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="email"
                    prepend-icon="email"
                    v-model="email"
                    :rules="rules"
                    label="Email"
                    type="email"
                    :readonly="otpsent"
                  ></v-text-field>
                  <v-btn color="primary" v-if="!otpsent" @click="sendotp()">Send OTP</v-btn>
                  <v-text-field
                    name="otp"
                    prepend-icon="lock"
                    v-model="otp"
                    v-if="otpsent"
                    :rules="rules"
                    label="OTP"
                    type="number"
                  ></v-text-field>  
                  <v-text-field
                    id="newpasswd"
                    prepend-icon="lock"
                    name="newpasswd"
                    v-if="otpsent"
                    v-model="newpasswd"
                    :rules="rules"
                    label="New Password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    id="newpasswd1"
                    prepend-icon="lock"
                    name="newpasswd1"
                    v-model="newpasswd1"
                    v-if="otpsent"
                    :rules="rules"
                    label="Repeat New Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-if="otpsent" @click="changePwd()">Change Password</v-btn>
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
  name: "ResetPwd",
  components: {
    Navbar,
  },
  data() {
    return {
      email: "",
      otp: "",
      newpasswd: "",
      newpasswd1: "",
      otpsent: false,
      rules: [ value => !!value || 'Required.' ],
    };
  },
  methods: {
    sendotp() {
      this.axios
        .post(`auth/forgotpwd/${this.email}/`, {})
        .then(() => {
          this.otpsent = true;
        })
        .catch((err) => console.log(err.response.data));
    },
    changePwd() {
      if (this.newpasswd !== this.newpasswd1) return;
      let data = {
        email: this.email,
        otp: this.otp,
        newpasswd: this.newpasswd,
      };
      this.axios
        .post(`auth/resetpwd/`, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err.response.data));
    },
  },
};
</script>

<style>
</style>