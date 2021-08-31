<template>
  <div class="grey lighten-5">
    <v-layout>
      <v-flex sm3 xs12>
        <div class="sidebar">
          <Sidebar />
        </div>
      </v-flex>
      <v-flex sm9 xs0>
        <div class="chats">
          <Navbar />
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from '../components/Sidebar.vue';

export default {
  components: { Navbar, Sidebar },
  data(){ 
    return {
      tab: null,
      items: ["Friends", "Groups"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  }
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
  overflow: hidden;
  width: 100%;
  height: 100vh;
}
</style>