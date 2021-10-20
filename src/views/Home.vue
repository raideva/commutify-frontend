<template>
  <div class="grey lighten-5">
    <v-layout>
      <v-flex md3 sm5 v-show="!isMobile || !chatopen" class="sidebar">
        <Sidebar />
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
      return 'grp-' + this.currChat.id
    },
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
  },
    mounted () {
      this.onResize()
      window.addEventListener('resize', this.onResize, { passive: true })
    
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