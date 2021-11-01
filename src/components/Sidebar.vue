<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      color="#6A76AB"
      dark
      class="hide-overflow"
      style="position: relative"
      scroll-target="#scrolling-techniques-3"
    >
      <v-toolbar-title>Commutify</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item >
            <v-btn color="primary" @click="logout()" class="logout_btn">Logout</v-btn>
          </v-list-item>
          <v-list-item>
            <v-dialog v-model="create_dialog" max-width="800px" transition="dialog-top-transition">
            <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              New Group
            </v-btn>
            </template>
            <div>
            <v-card class="elevation-25" fluid fill-width >
              <v-app-bar dark color="#141414">
                <v-app-bar-title>Create Group</v-app-bar-title>
                <v-spacer></v-spacer>
                <v-btn
              dark
              color="#80002a"
              @click="Close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
              </v-app-bar>
              <v-card-text class="form">
                <v-form>
                  <v-text-field
                    name="login"
                    v-model="grp_name"
                    :rules="rules"
                    label="Group Name"
                    type="text"
                    :error-messages="error_grp_name"
                    outlined
                ></v-text-field>
                <v-textarea
                   v-model="grp_description"
                :rules="rules"
                   auto-grow
                   filled
                   color="deep-purple"
                   label="Group Description"
                   type="text"
                   :error-messages="error_grp_description"
                   rows="2"
                ></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-actions class="form">
                <div class="center">
                <v-btn color="teal" @click="CreateGroup()" elevation="8" class="btn">Create Group</v-btn>
                </div>
              </v-card-actions>
            </v-card>
  </div>
            </v-dialog>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs v-model="tab" fixed-tabs>
          <v-tab>Friends </v-tab>
          <v-tab>Groups</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-tabs-items v-model="tab">
        <v-tab-item key="Friends">
          <div
            flat
            v-for="friend in friends"
            :key="friend.id"
            @click="displayChats(friend, 1)"
          >
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="20" tile>
                <v-icon> mdi-account-circle </v-icon>
              </v-avatar>
              <div>
                <v-card-text
                  v-text="
                    friend.name == undefined
                      ? friend.first_name + ' ' + friend.last_name
                      : friend.name
                  "
                ></v-card-text>
                <v-chip
                  v-text="friend.unseen"
                  v-show="friend.unseen > 0"
                ></v-chip>
              </div>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item key="Groups">
          <div
            flat
            v-for="group in groups"
            :key="group.id"
            @click="displayChats(group, 0)"
          >
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="20" tile>
                <v-icon> mdi-account-circle </v-icon>
              </v-avatar>
              <div>
                <v-card-text v-text="group.name"></v-card-text>
                <v-chip
                  v-text="group.unseen"
                  v-show="group.unseen > 0"
                ></v-chip>
              </div>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
      <v-container style="height: 1000px"></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      tab: null,
      items: ["Friends", "Groups"],
      friends: [],
      groups: [],
      chatSocket: null,
      create_dialog: false,
      grp_name: "",
      grp_description: "",
      error_grp_name: "",
      error_grp_description: "",
      rules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    ...mapActions({
      setToken: "auth/setToken",
    }),

    Close() { 
      this.create_dialog = false;
    },
    getFriends() {
      console.log(this.$store.state.auth.token);
      axios({
        headers: { Authorization: "Token " + this.$store.state.auth.token },
        url: "api/friends/",
        method: "get",
      }).then((res) => {
        this.friends = res.data;
        console.log(this.friends);
      });
    },
    getGroups() {
      axios({
        headers: { Authorization: "Token " + this.$store.state.auth.token },
        url: "api/groups/",
        method: "get",
      }).then((res) => {
        this.groups = res.data;
        console.log(this.groups);
      });
    },
    displayChats(user, isFriend) {
      this.$parent.renderChat(user, isFriend);
      this.$parent.infoPane = false;
      this.$parent.curGroupId = null;
      for (var i = 0; i < this.friends.length; i++) {
        if (this.friends[i].room == user["room"]) {
          this.friends[i].unseen = 0;
        }
      }
      for (var j = 0; j < this.groups.length; j++) {
        if (this.groups[j].room == user["room"]) {
          this.groups[j].unseen = 0;
        }
      }
    },
    logout() {
      this.setToken({ token: null, username: null });
      this.$router.push("main/");
    },
    makeConnection() {
      var self = this;
      this.chatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/message/${this.$store.state.auth.token}/`
      );
      this.chatSocket.onmessage = function (e) {
        console.log(e.data);
        var d = JSON.parse(e.data);
        if (self.$store.state.auth.username != d["sender"]) {
          for (var i = 0; i < self.friends.length; i++) {
            if (self.friends[i].room == d["room"]) {
              self.friends[i].unseen++;
              let frd = self.friends[i];
              self.friends.splice(i, 1);
              self.friends.unshift(frd);
            }
          }
          console.log(d["room"]);
          for (var j = 0; j < self.groups.length; j++) {
            if (self.groups[j].room == d["room"]) {
              self.groups[j].unseen++;
              let grp = self.groups[j];
              self.groups.splice(j, 1);
              self.groups.unshift(grp);
            }
          }
        }
      };
      this.chatSocket.onclose = function (e) {
        console.error("Chat socket closed unexpectedly", e);
      };
    },

    CreateGroup() {
      if (this.grrp_name === "") {
        this.error_grp_rname = "This field is required";
        return;
      } else this.error_grp_name = "";
      if (this.grp_description === "") {
        this.error_grp_description = "This field is required";
        return;
      } else this.error_grp_description = "";

      axios({
        headers: { Authorization: "Token " + this.$store.state.auth.token },
        url: "api/grp_create/",
        method: "post",
        data: {
          name: this.grp_name,
          description: this.grp_description,
        },
      })
        .then((res) => {
          this.create_dialog = false;
          console.log(res);
          this.$router.go();
        })
        .catch((e) => console.log(e));
    },
  },
  created() {
    this.getFriends();
    this.getGroups();
    this.makeConnection();
  },
};
</script>

<style>
.sidebar {
  /* overflow-y: scroll; */
  width: 100%;
  height: 100vh;
}
.logout_btn{
  width: 100%;
}
.form{
  background-color: rgb(233, 237, 243);
}
.btn{
  align-self: center;
  color: white;
}
.center {
  margin: 0;
  position: relative;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>