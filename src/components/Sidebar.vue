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

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout()">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
          <div flat v-for="friend in friends" :key="friend.id" @click="displayChats(friend,1)">
            <ChatListItem :user="friend"/>
          </div>
        </v-tab-item>
        <v-tab-item key="Groups">
          <div flat v-for="group in groups" :key="group.id"  @click="displayChats(group,0)">
            <ChatListItem :user="group"/>
          </div>
        </v-tab-item>
      </v-tabs-items>
      <v-container style="height: 1000px"></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import axios from "axios";
import ChatListItem from "./ChatListItem.vue";
import { mapActions } from "vuex";

export default {
  components: {
    ChatListItem,
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
    ...mapActions({
      setToken: "auth/setToken",
    }),
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
    displayChats(user,isFriend){
      this.$parent.renderChat(user,isFriend);
    },
    logout(){
      this.setToken({token:null,username:null});
      this.$router.push('main/');
    }
  },
  created() {
    this.getFriends();
    this.getGroups();
  },
};
</script>

<style>
.sidebar {
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
}
</style>