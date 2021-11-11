<template>
<div class="main">
    <nav id="navbar">
        <img src="../assets/Commutify-logos_white.png" alt="" class="logo" />
        <v-spacer></v-spacer>
         <v-btn icon x-large dark class="home" @click="home">
              <v-icon>mdi-home</v-icon>
            </v-btn>
    </nav>
    <v-container class="requests">

        <v-flex class="flex-s">

            <v-text-field v-model="search_username" outlined clearable label="Username" type="text" :error-messages="error_search" class="search_c" v-on:keyup.enter="viewProfile">
            </v-text-field>

            <v-btn class="center" color="#5a0dd7" dark @click="viewProfile"> Search User </v-btn>

        </v-flex>

        <v-card v-for="item in requests" :key="item.index" class="cards" @click="show(item)" dark>
            <div class="text-h5" v-if="item.type">
                <v-card-title> {{ item.name }} </v-card-title>
                <v-card-text class="text-h7">
                    Description : <i> {{ item.description }} </i>
                    <v-chip class="tags" color="red">Group Request</v-chip>
                </v-card-text>
            </div>
            <div class="text-h5" v-else>
                <v-card-title> {{ item.username }} </v-card-title>
                <v-card-text class="text-h7">
                    {{ item.first_name }} {{ item.last_name }}
                    <v-chip class="tags" color="green">Friend Request</v-chip>
                </v-card-text>
            </div>
        </v-card>
    </v-container>
</div>
</template>

<script>
import axios from "axios";
import {
    mapActions
} from "vuex";

export default {
    data() {
        return {
            requests: [],
            requestSocket: null,
            search_username: "",
            error_search: "",
        };
    },
    methods: {
        ...mapActions({
            setToken: "auth/setToken",
        }),

        home() {
            this.$router.push('../');
        },

        show(a) {
            var st = a.type === 1 ? a.name : a.username;
            this.$fire({
                title: "Accept request from " + st + " ?",
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "Accept",
                cancelButtonText: "Decline",
            }).then((result) => {
                if (result.value) {
                    a.type == 1 ?
                        this.grpResponse(a.id, 1) :
                        this.frResponse(a.username, 1);
                } else if (result.dismiss === "cancel") {
                    a.type == 1 ?
                        this.grpResponse(a.id, 0) :
                        this.frResponse(a.username, 0);
                }
            });
        },
        getRequests() {
            axios({
                headers: {
                    Authorization: "Token " + this.$store.state.auth.token
                },
                url: "api/requests/",
                method: "get",
            }).then((res) => {
                this.requests = res.data;
            });
        },
        grpResponse(id, bool) {
            axios({
                    headers: {
                        Authorization: "Token " + this.$store.state.auth.token
                    },
                    url: "api/grp_response/",
                    method: "post",
                    data: {
                        id: id,
                        bool: bool,
                    },
                })
                .then((res) => {
                    this.getRequests();
                    console.log(res);
                })
                .catch((e) => console.log(e));
        },

        frResponse(username, bool) {
            axios({
                    headers: {
                        Authorization: "Token " + this.$store.state.auth.token
                    },
                    url: "api/fr_response/",
                    method: "post",
                    data: {
                        username: username,
                        bool: bool,
                    },
                })
                .then((res) => {
                    this.getRequests();
                    console.log(res);
                })
                .catch((e) => console.log(e));
        },
        makeConnection() {
            var self = this;
            this.requestSocket = new WebSocket(
                `ws://127.0.0.1:8000/ws/requests/${this.$store.state.auth.token}/`
            );

            this.requestSocket.onmessage = function (e) {
                console.log(e.data);
                self.requests.push(JSON.parse(e.data));
            };

            this.requestSocket.onclose = function (e) {
                console.error("Chat socket closed unexpectedly", e);
            };
        },
        viewProfile() {
            this.axios
                .get(`api/profile/${this.search_username}/`)
                .then(() => (this.$router.push('../profile/' + String(this.search_username))))
                .catch(() => this.error_search = "User not found");
        }
    },
    created() {
        this.getRequests();
        this.makeConnection();
    },
};
</script>

<style lang="scss" scoped>
html,
body {
    background-color: black;
}

#navbar {
    background-color: black;
    display: flex;
    align-items: center;
    padding: 20px 8%;
    margin-bottom: 15px;
    height: 60px;
}

#navbar .logo {
    width: 150px;
    cursor: pointer;
}

#navbar ul {
    flex: 1;
    text-align: right;
}

#navbar ul li {
    display: inline-block;
    list-style: none;
}

#navbar ul li a {
    text-decoration: none;
    color: #fff;
}

.cards {
    margin-bottom: 30px;
    background-image: url('../assets/grpMemberList.webp');
}

.tags {
    float: right;
}

.requests {
    height: 100vh;
    overflow: scroll;
    padding-bottom: 100px;
}

.center {
    margin: 0;
    position: relative;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin-bottom: 40px;
}

.search_c {
    width: 50%;
    min-width: 300px;
    margin-top: 5%;
    position: relative;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: bisque;
    height: 55px;
}

.main {
    background-image: url('../assets/triangle.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

</style>
