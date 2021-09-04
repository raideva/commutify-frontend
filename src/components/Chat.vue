<template>
  <div class="chats">
    <Navbar :title="currChat.name || currChat.username" class="nav" />
    <div class="rendered-chats">
      {{ currChat }}
    </div>
    <v-form class="sendMsg">
      <v-text-field
        hide-details
        mb-1
        v-model="message"
        :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
        :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
        :prepend-icon="icon"
        filled
        clear-icon="mdi-close-circle"
        clearable
        label="Message"
        type="text"
        @click:append="toggleMarker"
        @click:append-outer="sendMessage"
        @click:prepend="changeIcon"
        @click:clear="clearMessage"
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import axios from "axios";

export default {
  components: { Navbar },
  props: ["currChat", "title"],
  data() {
    return {
      show: false,
      message: "Hey!",
      marker: true,
      iconIndex: 0,
      index: 1,
      icons: [
        "mdi-emoticon",
        "mdi-emoticon-cool",
        "mdi-emoticon-dead",
        "mdi-emoticon-excited",
        "mdi-emoticon-happy",
        "mdi-emoticon-neutral",
        "mdi-emoticon-sad",
        "mdi-emoticon-tongue",
      ],
    };
  },
  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
    getChats() {
      console.log(this.title);
      axios({
        headers: { Authorization: "Token " + this.$store.state.auth.token },
        url: "api/retrieve_message/",
        method: "post",
        data: {
          title: "fr-tarun-test",
          index: 1,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    },
  },

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  watch: {
    currChat: function(){this.getChats()},
  },
};
</script>

<style>
.chats {
  overflow: scroll;
  width: 100%;
  height: 100vh;
}

.rendered-chats {
  overflow: scroll;
  width: 100%;
  height: auto;
}

.sendMsg {
  background-color: white;
}
</style>