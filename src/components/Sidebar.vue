<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      color="#232627"
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
        <v-icon v-show="!search" @click="clearMessage">mdi-magnify</v-icon>
        <v-icon v-show="search" @click="clearMessage">mdi-magnify-close</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list class="options">
          <v-list-item>
            <v-btn dark @click="logout()" class="logout_btn">Logout</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn dark @click="viewProfile()" class="logout_btn"
              >My Profile</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn dark @click="requests()" class="logout_btn">Requests</v-btn>
          </v-list-item>
          <v-list-item>
            <v-dialog
              v-model="create_dialog"
              max-width="800px"
              transition="dialog-top-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark v-bind="attrs" v-on="on"> New Group </v-btn>
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
                      <label for="pass" style="font-size: large"
                        >Profile Image :
                      </label>
                      <input
                        type="file"
                        ref="input1"
                        @change="previewImage"
                        accept="image/*"
                      />
                      <label v-if="show_loading" class="load">Loading...</label>
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
      <div v-show="search">
        <v-text-field
          hide-details
          dark
          class="InputBox"
          type="text"
          v-model.trim="filter"
          label="Search"
          @click:append="clearMessage"
          append-icon="mdi-close-circle"
        ></v-text-field>
      </div>
    </template>
    <div class="List">
      <v-tabs-items v-model="tab">
        <v-tab-item key="Friends">
          <div
            flat
            v-for="friend in friends"
            :key="friend.id"
            @click="displayChats(friend, 1)"
          >
            <v-card
              dark
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
              dark
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
      <!-- <v-container style="height: 1000px"></v-container> -->
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import firebase from "firebase";

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
      img1: "",
      imageData: null,
      show_loading: false,
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
      const storageRef = firebase
        .storage()
        .ref("new_grp_" + `${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.show_loading = true;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          this.show_loading = false;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            console.log(this.img1);
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
        headers: { "token": this.$store.state.auth.token },
        url: "api/friends/",
        method: "get",
      }).then((res) => {
        this.friends = res.data;
        console.log(this.friends);
      });
    },
    getGroups() {
      axios({
        headers: { "token": this.$store.state.auth.token },
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
    viewProfile() {
      this.$router.push(
        "../profile/" + String(this.$store.state.auth.username)
      );
    },
    requests() {
      this.$router.push("../requests/");
    },
  },
  created() {
    this.getFriends();
    this.getGroups();
    // this.makeConnection();
  },
};
</script>

<style scoped>
* {
  border-radius: 0;
}
.listItem {
  border-bottom: 1px solid #7a7164;
  border-radius: 0;
  /* background-color: white;  */
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
.load {
  color: blue;
}
.List {
  overflow: scroll;
  height: 100vh;
  max-height: 100vh;
  background-color: black;
  padding-bottom: 100px;
  background-image: url("../assets/sidebarBackground.jpg");
  background-size: cover;
}
.InputBox {
  padding: 12px;
  padding-bottom: 10px;
  padding-top: 15px;
  background-color: black;
  margin-top: 0;
}
.options {
  padding: 2px;
}

.options > .v-list-item {
  padding: 0;
  padding-left: 5px;
  padding-right: 5px;
  margin: 0;
}
.options > .v-list-item {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>