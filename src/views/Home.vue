<template>
  <div class="grey lighten-5">
    <v-layout>
      <v-flex md3 sm5 xs12 class="sidebar">
        <Sidebar />
      </v-flex>
      <v-flex md9 sm7 xs0 v-show="chatopen">
        <Chat :currChat="currChat" :title="getTitle()"/>
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
      sendChatSocket: null,
    };
  },
  methods: {
    renderChat(user,isFriend){
      this.chatopen=true;
      this.currChat=user;
      this.isFriend=isFriend;
    },
    getTitle(){
      if(this.isFriend===null)return ''
      if(this.isFriend){
        let user1 = this.$store.state.auth.username
        let user2 = this.currChat.username
        if(user1>user2)[user1,user2] = [user2,user1]
        return `fr-${user1}-${user2}`
      }
      return 'gr-' + this.currChat.name
    },
    setupChats(){
      this.sendChatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/message/${this.$store.state.auth.token}/`
      );
      this.sendChatSocket.onclose = onclose = function (e) {
        console.error("Chat socket closed unexpectedly", e);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>