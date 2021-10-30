<template>
  <div class="grey lighten-5">
    <v-layout>
      <v-flex md3 sm5 v-show="!isMobile || !chatopen" class="sidebar">
        <Sidebar />
      </v-flex>
      <v-flex md9 sm7 v-show="!isMobile && !chatopen">
        <div id="nochatopen" md9 sm7 v-show="!isMobile && !chatopen">
          <img id="logo" src="@/assets/Commutify-logos_transparent.png">
          <p>Click On Any Chat To Connect !</p>
        </div>
      </v-flex>
      <v-flex md9 sm7 v-show="chatopen">
        <Chat :currChat="currChat" :title="getTitle()" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Chat from "../components/Chat.vue";

export default {
  components: { Sidebar, Chat },
  data() {
    return {
      chatopen: false,
      currChat: {},
      isFriend: null,
      isMobile: false,
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
  background: url("https://i.guim.co.uk/img/media/3ae369f9334cfa1486513a3a1780ea1bad8ee3a0/0_189_5320_3191/master/5320.jpg?width=1200&quality=85&auto=format&fit=max&s=6e98b988b50db8a8419636267f7ce05a");
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