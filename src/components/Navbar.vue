<template>
  <nav>
    <v-app-bar dark color="#141414">
      <v-btn class="ma-2" text icon color="lighten-2" @click="closeChat()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <div @click="profilePage" class="profilePage">
        <v-list color="#141414" class="image">
          <v-list-item-avatar><img :src="data.img_url" /></v-list-item-avatar>
        </v-list>
      </div>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-if="isfriend">
            <v-btn dark @click="removefriend(isfriend)">Remove Friend</v-btn>
          </v-list-item>
          <v-list-item v-else>
            <v-btn dark @click="exitGroup(data.id)">Exit Group</v-btn>
          </v-list-item>
          <v-list-item v-if="!isfriend">
            <v-btn dark @click="GroupInformation()">Group Information</v-btn>
          </v-list-item>
          <v-list-item v-else>
            <v-btn dark @click="viewProfile(isfriend)">View Profile</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  props: ["title", "isfriend", "data"],
  data() {
    return {
      dialog: false,
      nav: [],
    };
  },
  methods: {
    GroupInformation() {
      this.$parent.$parent.showGroupInfo(this.data.id);
    },
    closeChat() {
      this.$parent.$parent.chatopen = false;
      this.$parent.$parent.infoPane = false;
      this.$parent.$parent.curGroupId = null;
    },
    profilePage() {
      if (this.data.username === undefined) return;
      window.open(`#/profile/${this.data.username}`, "_blank");
    },
    removefriend(username) {
      axios({
        headers: {
          Authorization: "Token " + this.$store.state.auth.token,
        },
        url: "api/fr_remove/",
        method: "post",
        data: {
          username: username,
        },
      })
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((e) => console.log(e));
    },
    exitGroup(id) {
      axios({
        headers: {
          Authorization: "Token " + this.$store.state.auth.token,
        },
        url: "api/grp_exit/",
        method: "post",
        data: {
          id: id,
        },
      })
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((e) => console.log(e));
    },
    viewProfile(username) {
      this.$router.push("../profile/" + String(username));
    },
  },
};
</script>

<style scoped>
.theme {
  margin-top: 20px;
  margin-right: 20px;
}
.v-btn {
  width: 100%;
}
.v-list-item {
  padding-left: 5px;
  padding-right: 5px;
}
.image {
  padding: 0;
}
.profilePage {
  cursor: pointer;
}
</style>
