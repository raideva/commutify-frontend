<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      color="#6A76AB"
      dark
      class="hide-overflow"
      style="position: relative"
      scroll-target="#scrolling-techniques-3"
    >
      <v-toolbar-title
        ><img width="150px" src="@/assets/Commutify-logos_transparent.png"
      /></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="clearMessage">mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-btn color="primary" @click="logout()" class="logout_btn"
              >Logout</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn color="primary" @click="viewProfile()" class="logout_btn"
              >My Profile</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn color="primary" @click="requests()" class="logout_btn"
              >Requests</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-dialog
              v-model="create_dialog"
              max-width="800px"
              transition="dialog-top-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">
                  New Group
                </v-btn>
              </template>
              <div>
                <v-card class="elevation-25" fluid fill-width>
                  <v-app-bar dark color="#141414">
                    <v-app-bar-title>Create Group</v-app-bar-title>
                    <v-spacer></v-spacer>
                    <v-btn dark color="#80002a" @click="Close">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-app-bar>
                  <v-card-text class="form">
                    <v-form v-on:submit.prevent>
                      <v-text-field
                        v-model="grp_name"
                        :rules="rules"
                        label="Group Name"
                        type="text"
                        :error-messages="error_grp_name"
                        outlined
                        v-on:keyup.enter="CreateGroup"
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
                      <label for="pass" style="font-size: large;">Profile Image : </label>
                      <input type="file" ref="input1" @change="previewImage" accept="image/*">
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="form">
                    <div class="center">
                      <v-btn
                        color="teal"
                        @click="CreateGroup()"
                        elevation="8"
                        class="btn"
                        >Create Group</v-btn
                      >
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
    <template>
      <v-container v-show="search">
        <v-text-field
          type="text"
          v-model.trim="filter"
          @click:append="clearMessage"
          append-icon="mdi-close-circle"
        ></v-text-field>
      </v-container>
    </template>
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
            <v-card
              class="listItem"
              v-show="
                `${friend.first_name} ${friend.last_name}`
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              "
            >
              <v-list-item class="listItem grow">
                <v-list-item-avatar>
                  <img :src="friend.img_url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{
                    `${friend.first_name} ${friend.last_name}` ||
                    `${friend.name}`
                  }}</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-chip
                    color="green"
                    v-text="friend.unseen"
                    v-show="friend.unseen > 0"
                  ></v-chip>
                </v-row>
              </v-list-item>
            </v-card>
          </div>
        </v-tab-item>
        <v-tab-item key="Groups">
          <div
            flat
            v-for="group in groups"
            :key="`gr-${group.id}`"
            @click="displayChats(group, 0)"
          >
            <v-card
              v-show="group.name.toLowerCase().includes(filter.toLowerCase())"
            >
              <v-list-item class="listItem grow">
                <v-list-item-avatar>
                  <img :src="group.img_url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ group.name }}</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-chip
                    v-text="group.unseen"
                    v-show="group.unseen > 0"
                  ></v-chip>
                </v-row> </v-list-item
            ></v-card>
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
import firebase from 'firebase'

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
      search: false,
      grp_name: "",
      filter: "",
      grp_description: "",
      error_grp_name: "",
      error_grp_description: "",
      rules: [(value) => !!value || "Required."],
      img1: '',
      imageData: null
    };
  },
  methods: {
    ...mapActions({
      setToken: "auth/setToken",
    }),

    previewImage(event) {
            this.uploadValue = 0;
            this.img1 = null;
            this.imageData = event.target.files[0];
            console.log(this.imageData);
            this.onUpload();
        },

        onUpload() {
            this.img1 = null;
            const storageRef = firebase.storage().ref("new_grp_" + `${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`, snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                }, error => {
                    console.log(error.message)
                },
                () => {
                    this.uploadValue = 100;
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        this.img1 = url;
                        console.log(this.img1)
                    });
                }
            );
        },

    clearMessage() {
      this.filter = "";
      this.search = !this.search;
    },
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
        var d = JSON.parse(e.data);
        self.$emit("msg", d);
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
          console.log(res.data.id);
          if(this.img1 === ''){
            this.$router.go();
          }
          else {
            axios({
                    headers: {
                        Authorization: "Token " + this.$store.state.auth.token
                    },
                    url: "api/groupImageUpdate/",
                    method: "post",
                    data: {
                        'img_url' : this.img1,
                        'grp_id' : res.data.id,
                    },
                })
                .then((res) => {
                    console.log(res);
                    this.$router.go();
                })
                .catch((e) => console.log(e));}
          }   
        )
        .catch((e) => console.log(e));
    },
    viewProfile() {
      this.$router.push(
        "../profile/" + String(this.$store.state.auth.username)
      );
    },
    requests() {
      this.$router.push(
        "../requests/" 
      );
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
.listItem {
  border-bottom: 1px solid #7a7164;
}
.logout_btn {
  width: 100%;
}
.nobr {
  white-space: nowrap;
}
.form {
  background-color: rgb(233, 237, 243);
}
.btn {
  align-self: center;
  color: white;
  margin-top: 20px;
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