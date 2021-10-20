<template>
  <div class="chats">
    <Navbar :title="currChat.name || currChat.username" class="nav" :isfriend="currChat.username" />
    <div class="rendered-chats">
      <div flat v-for="msg in msgs" :key="msg.id">
        <Message :message="msg" />
      </div>
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
import Message from "./Message.vue";

export default {
  components: {
    Navbar,
    Message,
  },
  props: ["currChat", "title"],
  data() {
    return {
      show: false,
      message: "Hey!",
      marker: true,
      iconIndex: 0,
      index: 1,
      msgs: [],
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
      chatSocket: null,
      sendChatSocket: null,
    };
  },
  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.resetIcon();
      this.chatSocket.send(
        JSON.stringify({
          message: this.message,
        })
      );
      this.sendChatSocket.send(
        JSON.stringify({
          message: this.message,
          room: this.title,
        })
      );
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
      axios({
        headers: { Authorization: "Token " + this.$store.state.auth.token },
        url: "api/retrieve_message/",
        method: "post",
        data: {
          title: this.title,
          index: 0,
        },
      })
        .then((res) => {
          this.msgs = res.data;
          this.makeConnection();
        })
        .catch((e) => console.log(e));
    },
    makeConnection() {
      var self = this;
      this.chatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${this.title}/${this.$store.state.auth.token}/`
      );
      this.chatSocket.onmessage = function (e) {
        self.msgs.push(JSON.parse(e.data));
        console.log(self.msgs.length);
      };
      this.chatSocket.onclose = function (e) {
        console.error("Chat socket closed unexpectedly", e);
      };


      this.sendChatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/message/${this.$store.state.auth.token}/`
      );
      this.chatSocket.onclose = function (e) {
        console.error("SendChat socket closed unexpectedly", e);
      };

    },
  },

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  watch: {
    currChat: function () {
      this.getChats();
    },
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

  margin: 110px 0;
  display: flex;
  flex-direction: column;
}

.sendMsg {
  background-color: white;
}
</style>