<template>
  <div>
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
    <button v-if="!otpsent" @click="sendotp">Send OTP</button>
    <label for="otp">
      <input
        id="otp"
        v-model="otp"
        type="text"
        v-if="otpsent"
        name="otp"
        placeholder="Enter OTP"
        required
      />
    </label>
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
    <button v-if="otpsent" @click="changePwd">Submit</button>
  </div>
</template>

<script>
export default {
  name: "ResetPwd",
  data() {
    return {
      email: "",
      otp:"",
      newpasswd: "",
      newpasswd1: "",
      otpsent: false,
    };
  },
  methods: {
    sendotp(){
      this.axios.post(`auth/forgotpwd/${this.email}/`,{})
        .then(()=>{
          this.otpsent=true
        })
        .catch(err=>console.log(err.response.data))
    },
    changePwd(){
      if(this.newpasswd!==this.newpasswd1)return;
      let data = {
        email: this.email,
        otp: this.otp,
        newpasswd: this.newpasswd
      }
      this.axios.post(`auth/resetpwd/`,data)
        .then((res)=>{
          console.log(res.data);
        })
        .catch(err=>console.log(err.response.data))
    }
  }
};
</script>

<style>
</style>