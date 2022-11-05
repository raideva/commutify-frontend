<template>
  <div class="chats">
    <Navbar
      :title="currChat.name || `${currChat.first_name} ${currChat.last_name}`"
      class="nav"
      :isfriend="currChat.username"
      :data="currChat"
    />
    <div class="renderedChats" ref="chatDiv" @scroll="scroll()">
      <div flat v-for="msg in msgs" :key="msg.id">
        <Message :isFriend="currChat.name!==undefined" :message="msg" id="indvMsg" :class="msg.sender === $store.state.auth.username?'sent':'rec'" />
      </div>
    </div>
    <v-form :class="compress?'sendMsg smaller':'sendMsg'">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              hide-details dark class="msgBox"
              mb-1
              v-model.trim="message"
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
              v-on:keyup.enter="sendMessage"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import axios from "axios";
import Message from "./Message.vue";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "Chat",
  components: {
    Navbar,
    Message,
  },
  props: ["currChat", "title", "newMsg", "compress"],
  data() {
    return {
      show: false,
      message: "",
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
      isConnected: 0
    };
  },
  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.resetIcon();
      this.send(this.message);
      var objDiv = document.getElementsByClassName("renderedChats")[0];
      objDiv.scrollTop = objDiv.scrollHeight;
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
        headers: { "token": this.$store.state.auth.token },
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
    send(ms) {
      if (this.stompClient && this.stompClient.connected) {
        const msg = { "data": ms , "room": this.title, "sender": this.$store.state.auth.username};
        this.stompClient.send("/app/hello/" + this.$store.state.auth.username, JSON.stringify(msg), {});
      }
    },
    makeConnection() {
      if(this.isConnected === 0){
      this.socket = new SockJS("http://localhost:8080/gs-guide-websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          console.log(frame);
          this.isConnected = 1;
          this.stompClient.subscribe("/topic/greetings/" + this.$store.state.auth.token, tick => {
            if(this.title === JSON.parse(tick.body).room){
            this.msgs.push(JSON.parse(tick.body));
            }
            console.log(this.msgs);
          });
        },
        error => {
          console.log(error);
        }
      );
      }
    },
    scroll() {
      const el = document.getElementsByClassName("renderedChats")[0];
      console.log(el.scrollTop);
      el.onscroll = () => {
        if (!el.scrollTop) {
          console.log("scrolled to top");
          this.getChats();
        }
      };
    },
    
  },

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  mounted() {
    this.scroll();
  },
  watch: {
    currChat: function () {
      this.index = 999;
      this.msgs = [];
      this.getChats();
    },
    newMsg: function () {
      this.addMsg();
    },
  },
};
</script>

<style scoped>
.renderedChats {
  /* height: auto; */
  background-image: url('../assets/chatBackground.png');
  background-size: cover;
  height: 100vh;
  overflow: scroll;
  margin-bottom: 2000px;
  display: flex;
  flex-direction: column;
  padding-bottom: 150px;
  padding-top: 10px
}

.v-input {
  width: 100%;
  padding: 0;
  margin: 0;
}

.sendMsg {
  background-color: #181d20;
  width: 75%;
  padding: 0;
  margin: 0;
}

@media (max-width: 900px) {
  .sendMsg {
    width: 58.3%;
  }
}
@media (max-width: 600px) {
  .sendMsg {
    width: 100%;
  }
}

.smaller{
  width: 42%;
}

.col {
  padding: 0;
}

.rec{
  max-width: 70%;
}
.sent{
  max-width: 70%;
}
.msgBox{
  padding: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>