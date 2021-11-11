<template>
  <div class="grey lighten-5">
    <v-layout>
      <v-flex md3 sm5 v-show="!isMobile || !chatopen" class="sidebar">
        <Sidebar @msg="updateMsg" />
      </v-flex>
      <v-flex md9 sm7 v-show="!isMobile && !chatopen">
        <div id="nochatopen" md9 sm7 v-show="!isMobile && !chatopen">
          <img id="logo" src="@/assets/Commutify-logos_transparent.png">
          <p>Click On Any Chat To Connect !</p>
        </div>
      </v-flex>
      <v-flex md9 sm7 v-show="chatopen & !infoPane">
        <Chat :currChat="currChat" :title="getTitle()" :compress="false" :newMsg="newMsg" />
      </v-flex>
      <v-flex md5 sm7 v-show="chatopen & infoPane & !isMobile">
        <Chat :currChat="currChat" :title="getTitle()" :compress="(chatopen & infoPane & !isMobile) & (chatopen & infoPane & !isMobile)" :newMsg="newMsg" />
      </v-flex>
      <v-flex md4 sm5 v-show="infoPane & chatopen">
        <GroupInformation :id="currGroupId" ref="grpInfo" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Chat from "../components/Chat.vue";
import GroupInformation from '../components/GroupInformation.vue';

export default {
  components: { Sidebar, Chat, GroupInformation },
  data() {
    return {
      chatopen: false,
      currChat: {},
      isFriend: null,
      isMobile: false,
      infoPane: false,
      currGroupId: null,
      newMsg: 0,
    };
  },
  methods: {
    renderChat(user, isFriend) {
      this.chatopen = true;
      this.currChat = user;
      this.isFriend = isFriend;
    },
    getTitle() {
      if (this.isFriend === null) return "";
      if (this.isFriend) {
        let user1 = this.$store.state.auth.username;
        let user2 = this.currChat.username;
        if (user1 > user2) [user1, user2] = [user2, user1];
        return `fr-${user1}-${user2}`;
      }
      return "grp-" + this.currChat.id;
    },
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },

    showGroupInfo(id) {
      this.currGroupId = id;
      this.infoPane = true;
    },
    updateMsg(msg){
      this.newMsg = msg;
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true })
  },
};
</script>

<style lang="scss">

html, body {
  margin: 0; 
  height: 100%; 
  overflow: hidden;
}

.sendMsg {
  position: fixed;
  bottom: 0;
  width: 60%;
  padding-left: 2px;
}

.sidebar {
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

* {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
*::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

#nochatopen{
  background: url("../assets/nochatopen.jpg");
  background-size: cover;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#logo {
  width: 180px;
  cursor: pointer;
  // margin: 10px;
}
</style>