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
      currChat: null,
      isFriend: null,
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
        // console.log(this.);
        return 'fr-'
      }
      return 'gr-' + this.currChat.name
    }
  }
};
</script>

<style>
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