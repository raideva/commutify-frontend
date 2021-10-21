<template>
  <div class="grey lighten-5">
    username: {{ userDetails.username }} <br />
    status: {{ userDetails.status }} <br />
    frcount: {{ userDetails.frcount }} <br />
    fname: {{ userDetails.fname }} <br />
    lname: {{ userDetails.lname }} <br />
    <button v-if="username === $store.state.auth.username">Edit Profile</button>
    <button v-if="username !== $store.state.auth.username" @click="SendRequest(username)">Add Friend</button>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: "Profile",
  components: {},
  data() {
    return {
      userDetails: {},
      username: "",
      requestSocket: null,
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
    SendRequest(username){
      axios({
            headers: { Authorization: "Token " + this.$store.state.auth.token },
            url: "api/fr_request/",
            method: "post",
            data: {
            username: username,
            },
          })
          .then((res) => {
          console.log(res);
          this.requestSocket.send(
              JSON.stringify({
              username: username,
              type: 0,

        })
      );
          })
          .catch((e) => console.log(e));
    },


    makeConnection() {
      this.requestSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/requests/${this.$store.state.auth.token}/`
      );
      this.requestSocket.onclose = function (e) {
        console.error("Chat socket closed unexpectedly", e);
      };
    },
  },
  created() {
    this.getDetails();
    this.makeConnection();
  },
};
</script>

<style lang="scss" scoped>
</style>