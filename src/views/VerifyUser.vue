<template>
  <div>
    <h1 v-if="!verified">Account is being Verified.</h1>
    <h1 v-if="verified">Account has been Verified.</h1>
  </div>
</template>

<script>
export default {
  name: "VerifyUser",
  data() {
    return {
      verified: false,
    };
  },
  methods: {
    verify() {
      let email = this.$route.params.email
      let verify_pin = this.$route.params.pin
      console.log(email,verify_pin);
      this.axios.get(`auth/verify/${email}/${verify_pin}/`)
        .then(()=>{this.verified=true;this.$router.push('/login/')})
        .catch(err=>console.log(err.response.data))
    },
  },
  created() {
    this.verify();
  },
};
</script>

<style>
</style>