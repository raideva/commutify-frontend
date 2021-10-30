<template>
  <div class="chats">
    <Navbar
      :title="currChat.name || currChat.username"
      class="nav"
      :isfriend="currChat.username"
      :data="currChat"
    />
    <div class="renderedChats" ref="chatDiv" @scroll="scroll()">
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
  name: "Chat",
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
      index: 999,
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
          index: this.index,
        },
      })
        .then((res) => {
          this.msgs = res.data.concat(this.msgs);
          if (res.data.length > 0) this.index = res.data[0].id;
          else this.index = 0;
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
      };
      this.chatSocket.onclose = function (e) {
        console.error("Chat socket closed unexpectedly", e);
      };

      this.sendChatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/message/${this.$store.state.auth.token}/`
      );
      this.sendChatSocket.onclose = function (e) {
        console.error("SendChat socket closed unexpectedly", e);
      };
    },
    scroll () {
      const el = document.getElementsByClassName('renderedChats')[0];
      el.onscroll = () => {
        if (!el.scrollTop) {
          console.log('scrolled to top')
          this.getChats()
        }
      }
    },
  },

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  mounted() {
    this.scroll()
  },
  watch: {
    currChat: function () {
      this.index = 999;
      this.msgs = [];
      this.getChats();
      this.index = 999;
    },
  },
};
</script>

<style>
.renderedChats {
  /* height: auto; */
  height: 100vh;
  overflow: scroll;
  margin: 20px 0;
  margin-bottom: 2000px;
  display: flex;
  flex-direction: column;
  padding-bottom: 150px;
}

.sendMsg {
  background-color: white;
}
</style>