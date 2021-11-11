<template>
<div class="main">
    <nav id="navbar">
        <img src="../assets/Commutify-logos_white.png" alt="" class="logo" />
        <v-spacer></v-spacer>
         <v-btn icon x-large dark class="home" @click="home">
              <v-icon dark>mdi-home</v-icon>
            </v-btn>
    </nav>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />

    <div class="profile">
        <div class="profile-pic">
            <div class="header-color"></div>
            <img :src="image_url" />
        </div>
        <div class="title">
            <h1>{{ `${userDetails.fname} ${userDetails.lname}` }}</h1>
            <h2>
                <span class="highlighted">{{ userDetails.username }}</span>
            </h2>
        </div>
        <div class="description"> <i><u>{{ userDetails.status }}</u></i></div>
        <v-dialog v-model="edit_profile_dialog" max-width="600px" transition="dialog-top-transition" v-if="isUser">
            <template v-slot:activator="{ on, attrs }">
                <button v-bind="attrs" v-on="on" class="follow">Edit Profile</button>
            </template>
            <edit-profile :userDetails="userDetails" @close='Close_dialog' @update="Update" />
        </v-dialog>

        <button v-show="isFriend === true" @click="removefriend()" class="follow">Remove Friend</button>
        <button v-show="isFriend === false && !isSent" @click="SendRequest(username)" class="follow">
            Add Friend
        </button>
        <h2 v-show="isSent">Request Pending</h2>
        <div class="friends">
            <i class="fas fa-heart"><span>{{ userDetails.frcount }} 
                <span v-if="userDetails.frcount > 1">Friends</span>
                <span v-else>Friend</span>
                </span></i>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import EditProfile from '../components/EditProfile.vue';

export default {
    name: "Profile",
    components: {EditProfile},
    data() {
        return {
            userDetails: {},
            username: "",
            requestSocket: null,
            isFriend: null,
            isUser: false,
            isSent: false,
            edit_profile_dialog: false,
            image_url: "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png",
        };
    },
    methods: {
        Update() {
            this.getProfileImage();
            this.getDetails();
        },
        Close_dialog() {
            this.edit_profile_dialog = false;
        },

        home() {
            this.$router.push('../');
        },

        getDetails() {
            this.username = this.$route.params.username;
            this.axios
                .get(`api/profile/${this.username}/`)
                .then((res) => (this.userDetails = res.data))
                .catch((e) => console.log(e));
        },
        getProfileImage() {
            axios({
                    url: `api/profileImage/0/${this.username}/`,
                    method: "get",
                })
                .then((res) => {
                    console.log(res.data);
                    this.image_url = res.data.img_url;
                })
                .catch((e) => console.log(e));
        },
        SendRequest(username) {
            axios({
                    headers: {
                        Authorization: "Token " + this.$store.state.auth.token
                    },
                    url: "api/fr_request/",
                    method: "post",
                    data: {
                        username: username,
                    },
                })
                .then((res) => {
                    console.log(res);
                    this.requestSocket.send(
                        JSON.stringify({
                            username: username,
                            type: 0,
                        })
                    );
                    this.isSent = true;
                })
                .catch(() => (this.isSent = true));
        },

        makeConnection() {
            this.requestSocket = new WebSocket(
                `ws://127.0.0.1:8000/ws/requests/${this.$store.state.auth.token}/`
            );
            this.requestSocket.onclose = function (e) {
                console.error("Chat socket closed unexpectedly", e);
            };
        },

        checkFriend() {
            if (this.$route.params.username === this.$store.state.auth.username) {
                this.isUser = true;
                return;
            }
            axios({
                headers: {
                    Authorization: "Token " + this.$store.state.auth.token
                },
                url: "api/friends/",
                method: "get",
            }).then((res) => {
                res.data.map((frnd) => {
                    if (frnd.username === this.$route.params.username)
                        this.isFriend = true;
                    return;
                });
                if (this.isFriend === null) this.isFriend = false;
            });
        },

        removefriend() {
            axios({
                    headers: {
                        Authorization: "Token " + this.$store.state.auth.token
                    },
                    url: "api/fr_remove/",
                    method: "post",
                    data: {
                        username: this.$route.params.username,
                    },
                })
                .then(() => {
                    this.isFriend = false;
                    // this.$router.go();
                })
                .catch(() => this.isFriend = false);
        },
    },
    created() {
        this.checkFriend();
        this.getDetails();
        this.makeConnection();
        this.getProfileImage();
    },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

html,
body {
    height: 100vh;
    display: grid;
    background: #ede1e7;
    font-family: "Open Sans", sans-serif;
}

.profile {
    margin: auto;
    max-width: 400px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    -ms-overflow-style: none;
    /* for Internet Explorer, Edge */
    scrollbar-width: none;
    /* for Firefox */
    overflow-y: scroll;
    background-image: url('../assets/dark-website-background.jpg');
}

.main {
    background-image: url('../assets/square.jpg');
    width: 100%;
    height: 100%;
}

::-webkit-scrollbar {
    display: none;
    /* for Chrome, Safari, and Opera */
}

.header-color {
    border-radius: 20px 20px 0 0;
    padding-bottom: 150px;
    width: 400px;
    background: #4f759b;
}

.profile-pic img {
    height: 250px;
    width: 250px;
    border-radius: 50%;
    border: 10px solid #ffffff;
    margin-top: -125px;
}

.title {
    margin-bottom: 25px;
}

h1 {
    font-size: 32px;
    font-weight: 700;
    color: #131b23;
    margin-bottom: 10px;
    letter-spacing: 0.025em;
    color: azure;
}

h2 {
    font-size: 18px;
    letter-spacing: 0.01em;
    color: #131b23;

    span {
        color: #6e9ece;
        font-weight: 700;
    }
}

.description {
    margin-bottom: 25px;
    color: #131b23;
    letter-spacing: 0.01em;
    color: aquamarine;

    p:not(:last-child) {
        margin-bottom: 5px;
    }
}

button {
    font-family: "Open Sans", sans-serif;
    color: #ffffff;
    background: #4f759b;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.025em;
    border: none;
    border-radius: 15px;
    min-height: 35px;
    width: 100px;
    margin-bottom: 25px;
    transition: all 0.2s ease;
    cursor: pointer;
}

button:hover {
    background: #114579e0;
}

.friends i {
    color: #e73033;
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 50px;

    span {
        margin-left: 5px;
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
    }
}

.home {
    margin-top: 20px;
    background: none;
}
</style>
