<template>
  <nav>
    <v-app-bar dark color="#141414">
      <v-btn class="ma-2" text icon color="lighten-2" @click="closeChat()"
        ><v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-checkbox
        class="theme"
        v-model="$vuetify.theme.dark"
        inset
        off-icon="mdi-theme-light-dark"
        on-icon="mdi-theme-light-dark"
      ></v-checkbox>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-if="isfriend">
            <v-list-item-title @click="removefriend(isfriend)"
              >Remove Friend</v-list-item-title
            >
          </v-list-item>
          <v-list-item v-else>
            <v-list-item-title @click="exitGroup(data.id)"
              >Exit Group</v-list-item-title
            >
          </v-list-item>
          <v-list-item v-if="!isfriend">
            <v-list-item-title @click="GroupInformation()"
              >Group Information</v-list-item-title
            >
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
    removefriend(username) {
      axios({
        headers: { Authorization: "Token " + this.$store.state.auth.token },
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
        headers: { Authorization: "Token " + this.$store.state.auth.token },
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
  },
};
</script>

<style scoped>
.theme {
  margin-top: 20px;
  margin-right: 20px;
}
</style>