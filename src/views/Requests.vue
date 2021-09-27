<template>
    <div>
      <Navbar />
     <v-container>
          <v-card v-for="item in requests" :key="item.index" class="cards" @click="show(item)">
            <div class="text-h5" v-if="item.type">
              <v-card-title> {{ item.name }} </v-card-title>
              <v-card-text class="text-h7"> Description : <i> {{ item.description }} </i>
              <v-chip class="tags"  color="red">Group Request</v-chip></v-card-text>
            </div>
              <div class="text-h5" v-else>
              <v-card-title> {{ item.username }} </v-card-title>
              <v-card-text class="text-h7"> {{ item.first_name }} {{ item.last_name }} 
              <v-chip class="tags" color="green">Friend Request</v-chip></v-card-text>
            </div>
              
              
          </v-card>
    </v-container>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";
import { mapActions } from "vuex";

export default ({
    components: { Navbar },
    data: () => ({
        requests: [],
    }),
    methods: {
        ...mapActions({
          setToken: "auth/setToken",
        }),
        show(a) {
          var st = (a.type === 1) ? a.name : a.username;
          this.$fire({
          title: "Accept request from " + st + " ?",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: 'Accept',
          cancelButtonText: 'Decline',
        }).then((result) => {
          if (result.value) {
            (a.type == 1) ? this.grpResponse(a.id, 1) : this.frResponse(a.username, 1);}
          else if (result.dismiss === "cancel"){
            (a.type == 1) ? this.grpResponse(a.id, 0) : this.frResponse(a.username, 0);}
        })
        },
        getRequests() {
          axios({
            headers: { Authorization: "Token " + this.$store.state.auth.token },
            url: "api/requests/",
            method: "get",
          }).then((res) => {
            this.requests = res.data;
          });
        },
        grpResponse(id, bool) {
          axios({
            headers: { Authorization: "Token " + this.$store.state.auth.token },
            url: "api/grp_response/",
            method: "post",
            data: {
            id: id,
            bool: bool,
            },
          })
          .then((res) => {
          this.getRequests();
          console.log(res);
          })
          .catch((e) => console.log(e));
          },

        frResponse(username, bool) {
          axios({
            headers: { Authorization: "Token " + this.$store.state.auth.token },
            url: "api/fr_response/",
            method: "post",
            data: {
            username: username,
            bool: bool,
            },
          })
          .then((res) => {
          this.getRequests();
          console.log(res);
          })
          .catch((e) => console.log(e));
        },
    },
    created() {
    this.getRequests();
    },

})
</script>
<style lang="scss" scoped>
  .cards{
      margin-bottom: 30px;
  }
  .tags{
      float: right;
  }
</style>