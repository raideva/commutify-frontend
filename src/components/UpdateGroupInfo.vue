<template>
<div>
    <v-card class="elevation-25" fluid fill-width>
        <v-app-bar dark color="#141414">
            <v-app-bar-title>Update Group</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn dark color="#80002a" @click="Close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-app-bar>
        <v-card-text class="form">
            <v-form v-on:submit.prevent>
                <v-text-field name="grp_name" v-model="cur_grp_name" :rules="rules" label="Group Name" type="text" :error-messages="error_grp_name" outlined :value="grp_name" @keypress.enter="UpdateGroup"></v-text-field>
                <v-textarea v-model="cur_grp_description" :rules="rules" auto-grow filled color="deep-purple" label="Group Description" type="text" :error-messages="error_grp_description" rows="2" :value="grp_description"></v-textarea>
                <label for="pass" style="font-size: large;">Group Image : </label>
                <input type="file" ref="input1" @change="previewImage" accept="image/*">
                <label v-if="show_loading" class="load">Loading...</label>
            </v-form>
        </v-card-text>
        <v-card-actions class="form">
            <div class="center">
                <v-btn color="teal" @click="UpdateGroup()" elevation="8" class="btn">Update</v-btn>
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
    props: ["grp_name", "grp_description", "id"],
    data() {
        return {
            error_grp_name: "",
            error_grp_description: "",
            rules: [(value) => !!value || "Required."],
            cur_grp_name: this.grp_name,
            cur_grp_description: this.grp_description,
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
            const storageRef = firebase.storage().ref(`${this.id}` + `${this.imageData.name}`).put(this.imageData);
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

        UpdateGroup() {
            if (this.cur_grp_name === "") {
                this.error_grp_rname = "This field is required";
                return;
            } else this.error_grp_name = "";
            if (this.cur_grp_description === "") {
                this.error_grp_description = "This field is required";
                return;
            } else this.error_grp_description = "";

            axios({
                    headers: {
                        Authorization: "Token " + this.$store.state.auth.token
                    },
                    url: "api/groupUpdate/",
                    method: "post",
                    data: {
                        id: this.id,
                        name: this.cur_grp_name,
                        description: this.cur_grp_description,
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
                    url: "api/groupImageUpdate/",
                    method: "post",
                    data: {
                        'img_url' : this.img1,
                        'grp_id' : this.id,
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
