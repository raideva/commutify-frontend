<template>
  <div class="grey lighten-5">
    username: {{ userDetails.username }} <br />
    status: {{ userDetails.status }} <br />
    frcount: {{ userDetails.frcount }} <br />
    fname: {{ userDetails.fname }} <br />
    lname: {{ userDetails.lname }} <br />
    <button v-if="username === $store.state.auth.username">Edit Profile</button>
    <button v-if="username !== $store.state.auth.username">Add Friend</button>
  </div>
</template>

<script>
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      userDetails: {},
      username: "",
    };
  },
  methods: {
    getDetails() {
      this.username = this.$route.params.username;
      this.axios
        .get(`api/profile/${this.username}/`)
        .then((res) => (this.userDetails = res.data))
        .catch((e) => console.log(e));
    },
  },
  created() {
    this.getDetails();
  },
};
</script>

<style lang="scss" scoped>
</style>