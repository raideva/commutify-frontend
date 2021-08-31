<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      color="#6A76AB"
      dark
      class="hide-overflow"
      style="position: relative"
      scroll-target="#scrolling-techniques-3"
    >
      <v-toolbar-title>Commutify</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" fixed-tabs>
          <v-tab>Friends </v-tab>
          <v-tab>Groups</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-tabs-items v-model="tab">
        <v-tab-item key="Friends">
          <div flat v-for="friend in friends" :key="friend.id">
            <Chat :user="friend" />
          </div>
        </v-tab-item>
        <v-tab-item key="Groups">
          <div flat v-for="group in groups" :key="group.id">
            <Chat :user="group" />
          </div>
        </v-tab-item>
      </v-tabs-items>
      <v-container style="height: 1000px"></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import axios from "axios";
import Chat from "./Chat.vue";

export default {
  components: {
    Chat,
  },
  data() {
    return {
      tab: null,
      items: ["Friends", "Groups"],
      friends: [],
      groups: [],
    };
  },
  methods: {
    getFriends() {
      console.log(this.$store.state.auth.token);
      axios({
        headers: { Authorization: "Token " + this.$store.state.auth.token },
        url: "api/friends/",
        method: "get",
      }).then((res) => {
        this.friends = res.data;
        console.log(this.friends);
      });
    },
    getGroups() {
      axios({
        headers: { Authorization: "Token " + this.$store.state.auth.token },
        url: "api/groups/",
        method: "get",
      }).then((res) => {(this.groups = res.data);console.log(this.groups);});
      
    },
  },
  created() {
    this.getFriends();
    this.getGroups();
  },
};
</script>

<style>
.chats {
  overflow-y: scroll;
  position: fixed;
  width: 100%;
  height: 100vh;
}
.sidebar {
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
}
</style>