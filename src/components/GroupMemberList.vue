<template>
  <v-card class="mx-auto" outlined color="brown">
    <v-app-bar dark height="40px">
      <v-toolbar-title>Group Users</v-toolbar-title>
      <v-dialog
        v-model="addMemberDialog"
        max-width="800px"
        transition="dialog-bottom-transition"
        v-if="you.isAdmin"
        persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-row justify="end">
            <v-btn v-bind="attrs" v-on="on" text color="blue"
              >Invite user +</v-btn
            >
          </v-row>
        </template>
        <v-card class="elevation-25" fluid fill-width>
          <v-app-bar dark color="#141414">
            <v-app-bar-title>Invite User</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn dark color="#80002a" @click="Close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-app-bar>
          <v-card-text class="form">
            <v-form v-on:submit.prevent>
              <v-container style="height: 30px"></v-container>
              <v-text-field
                v-model="new_username"
                :rules="rules"
                label="Username"
                type="text"
                :error-messages="error_message"
                outlined
                @keypress.enter="InviteUser()"
                clearable
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="form">
            <div class="center">
              <v-btn
                color="teal"
                @click="InviteUser()"
                elevation="8"
                class="btn"
                >Invite</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-flex>
      <v-sheet
        id="scrolling-techniques-6"
        class="listMem overflow-y-auto"
        max-height="450"
        color="brown"
      >
        <v-container>
          <v-card color="#385F73" dark class="users">
            <v-card-title class="d-inline-flex">{{
              you.username
            }}</v-card-title>
            <v-card-text class="d-inline-flex">
              {{ you.first_name }} {{ you.last_name }}
              <v-row align="center" justify="end">
                <v-chip color="blue">You</v-chip>
                <v-chip color="red" v-if="you.isAdmin">Admin</v-chip>
                <v-chip color="green" v-else>Member</v-chip>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card
            color="#385F73"
            dark
            class="users"
            v-for="user in admins"
            :key="user.username"
          >
            <v-card-title class="d-inline-flex">{{
              user.username
            }}</v-card-title>
            <v-menu left bottom class="options">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" class="options">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item dark v-if="you.isAdmin">
                  <v-btn dark @click="Remove(user.username)">Remove</v-btn>
                </v-list-item>
                <v-list-item v-if="you.isAdmin">
                  <v-btn dark @click="dismissAdmin(user.username)"
                    >Dismiss Admin</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn dark @click="viewProfile(user.username)"
                    >View Profile</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
            <v-card-text class="d-inline-flex">
              {{ user.first_name }} {{ user.last_name }}
              <v-row align="center" justify="end">
                <v-chip color="red">Admin</v-chip>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card
            color="#385F73"
            dark
            class="users"
            v-for="user in members"
            :key="user.username"
          >
            <v-card-title class="d-inline-flex">{{
              user.username
            }}</v-card-title>
            <v-menu left bottom class="options">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" class="options">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-if="you.isAdmin">
                  <v-btn dark @click="Remove(user.username)">Remove</v-btn>
                </v-list-item>
                <v-list-item v-if="you.isAdmin">
                  <v-btn dark @click="makeAdmin(user.username)"
                    >Make Group Admin</v-btn
                  >
                </v-list-item>
                <v-list-item>
                  <v-btn dark @click="viewProfile(user.username)"
                    >View Profile</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
            <v-card-text class="d-inline-flex">
              {{ user.first_name }} {{ user.last_name }}
              <v-row align="center" justify="end">
                <v-chip color="green">Member</v-chip>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
        <v-container style="height: 300px"></v-container>
      </v-sheet>
    </v-flex>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Group_participant_list",
  props: ["id"],
  data() {
    return {
      members: [],
      admins: [],
      you: [],
      addMemberDialog: false,
      new_username: "",
      error_message: "",
      rules: [(value) => !!value || "Required."],
      requestSocket: null,
    };
  },
  methods: {
    viewProfile(username) {
      this.$router.push("../profile/" + String(username));
    },

    Close() {
      this.addMemberDialog = false;
      this.new_username = "";
      this.error_message = "";
    },

    getList() {
      axios({
        headers: {
          Authorization: "Token " + this.$store.state.auth.token,
        },
        url: "api/groupMemberList/",
        method: "post",
        data: {
          id: this.id,
        },
      })
        .then((res) => {
          this.members = res.data["members"];
          this.admins = res.data["admins"];
          this.you = res.data["user"][0];
          if (this.you.isAdmin) {
            this.$emit("update_isAdmin");
          }
        })
        .catch((e) => console.log(e));
    },
    Remove(username) {
      axios({
        headers: {
          Authorization: "Token " + this.$store.state.auth.token,
        },
        url: "api/grp_member_remove/",
        method: "post",
        data: {
          id: this.id,
          username: username,
        },
      })
        .then((res) => {
          console.log(res);
          this.getList();
        })
        .catch((e) => console.log(e));
    },
    makeAdmin(username) {
      axios({
        headers: {
          Authorization: "Token " + this.$store.state.auth.token,
        },
        url: "api/grp_admin_create/",
        method: "post",
        data: {
          id: this.id,
          username: username,
        },
      })
        .then((res) => {
          console.log(res);
          this.getList();
        })
        .catch((e) => console.log(e));
    },
    dismissAdmin(username) {
      axios({
        headers: {
          Authorization: "Token " + this.$store.state.auth.token,
        },
        url: "api/grp_admin_remove/",
        method: "post",
        data: {
          id: this.id,
          username: username,
        },
      })
        .then((res) => {
          console.log(res);
          this.getList();
        })
        .catch((e) => console.log(e));
    },
    InviteUser() {
      if (this.new_username === "") {
        this.error_message = "This field is required";
        return;
      }
      axios({
        headers: {
          Authorization: "Token " + this.$store.state.auth.token,
        },
        url: "api/grp_request/",
        method: "post",
        data: {
          id: this.id,
          username: this.new_username,
        },
      })
        .then((res) => {
          console.log(res);
          this.requestSocket.send(
            JSON.stringify({
              username: this.new_username,
              id: this.id,
              type: 1,
            })
          );
          this.Close();
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response.data);
          this.error_message = e.response.data["error"];
        });
    },
    makeConnection() {
      this.requestSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/requests/${this.$store.state.auth.token}/`
      );
      this.requestSocket.onclose = function (e) {
        console.error("Chat socket closed unexpectedly", e);
      };
    },
  },
  watch: {
    id: function () {
      this.getList();
      this.makeConnection();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}

.users {
  margin-bottom: 2%;
  background-image: url('../assets/userCard.jpg');
}

.options {
  float: right;
  margin-top: 1%;
}

.form {
  background-color: rgb(210, 214, 221);
}

.listMem {
  background-image: url("../assets/grpMemberList.webp");
}
.v-list-item > .v-btn {
  width: 100%;
}
.v-list-item {
  padding-left: 5px;
  padding-right: 5px;
}
.d-inline-flex {
    padding-bottom: 8px;
    padding-top: 8px;
}
</style>
