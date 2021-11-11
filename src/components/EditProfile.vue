<template>
<div>
    <v-card class="elevation-25" fluid fill-width>
        <v-app-bar dark color="#141414">
            <v-app-bar-title>Edit Profile</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn dark color="#80002a" @click="Close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-app-bar>
        <v-card-text class="form">
            <v-form v-on:submit.prevent>
                <v-text-field name="first_name" v-model="first_name" :rules="rules" label="First Name" type="text" :error-messages="error_first_name" outlined :value="first_name" v-on:keyup.enter="UpdateProfile"></v-text-field>
                <v-text-field name="last_name" v-model="last_name" :rules="rules" label="Last Name" type="text" :error-messages="error_last_name" outlined :value="last_name" v-on:keyup.enter="UpdateProfile" ></v-text-field>
                <v-text-field name="status" v-model="status" :rules="rules" label="Status" type="text" :error-messages="error_status" outlined :value="status" v-on:keyup.enter="UpdateProfile" ></v-text-field>
                <label for="pass" style="font-size: large;">Profile Image : </label>
                <input type="file" ref="input1" @change="previewImage" accept="image/*">
                <label v-if="show_loading" class="load">Loading...</label>
            </v-form>
        </v-card-text>
        <v-card-actions class="form">
            <div class="center">
                <v-btn color="teal" @click="UpdateProfile()" elevation="8" class="btn">Update</v-btn>
            </div>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import axios from "axios";
import firebase from 'firebase';

export default {
    name: "Dialog_for_grp_update",
    props: ["userDetails"],
    data() {
        return {
            error_username: "",
            error_first_name: "",
            error_last_name: "",
            error_status: "",
            rules: [(value) => !!value || "Required."],
            first_name: this.userDetails.fname,
            last_name: this.userDetails.lname,   
            status: this.userDetails.status,
            img1: '',
            imageData: null,
            show_loading: false,
        };
    },
    methods: {
        Close() {
            this.$emit("close");
        },

        previewImage(event) {
            this.uploadValue = 0;
            this.img1 = null;
            this.imageData = event.target.files[0];
            console.log(this.imageData);
            this.onUpload();
        },

        onUpload() {
            this.img1 = null;
            const storageRef = firebase.storage().ref(`${this.userDetails.username}` + `${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`, snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.show_loading = true;
                }, error => {
                    console.log(error.message)
                },
                () => {
                    this.uploadValue = 100;
                    this.show_loading = false;
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        this.img1 = url;
                        console.log(this.img1)
                    });
                }
            );
        },

        UpdateProfile() {
            if (this.first_name === "") {
                this.error_first_rname = "This field is required";
                return;
            } else this.error_first_name = "";
            if (this.last_name === "") {
                this.error_last_name = "This field is required";
                return;
            } else this.error_last_name = "";
            if (this.status === "") {
                this.error_status = "This field is required";
                return;
            } else this.error_status = "";


            axios({
                    headers: {
                        Authorization: "Token " + this.$store.state.auth.token
                    },
                    url: "api/profileUpdate/",
                    method: "post",
                    data: {
                        status: this.status,
                        fname: this.first_name,
                        lname: this.last_name,
                    },
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((e) => console.log(e));

            if(this.img1 === ''){
                this.$emit("update");
                    this.$emit("close");
            }
            else {
            
            axios({
                    headers: {
                        Authorization: "Token " + this.$store.state.auth.token
                    },
                    url: "api/profileImageUpdate/",
                    method: "post",
                    data: {
                        'img_url' : this.img1,
                    },
                })
                .then((res) => {
                    this.$emit("update");
                    this.$emit("close");
                    console.log(res);
                })
                .catch((e) => console.log(e));}
        },

    },
};
</script>

<style lang="scss" scoped>
.form {
    background-color: rgb(210, 214, 221);
}

.btn {
    margin-top: 60px;
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
.load {
    color: blue;
}
</style>
