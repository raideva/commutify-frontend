<template>
<v-card class="main" fluid>
    <v-app-bar dark color="#141414">
        <v-app-bar-title>Group Information</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn dark color="#80002a" @click="Close">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-app-bar>
    <v-card class="details" dark>
        <div class="profile-pic">
            <div class="header-color"></div>
            <img :src="image_url" />
        </div>
        <v-card-title>
            <v-icon left> mdi-account-multiple </v-icon>
            <span class="text-h6 font-weight-light"><b>{{ groupDetails.name }}</b></span>
        </v-card-title>

        <v-card-text>
            <p><u><i>Description</i></u></p>
            <v-flex dark>
                {{ groupDetails.description }}
            </v-flex>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-dialog v-model="update_dialog" max-width="800px" transition="dialog-bottom-transition" v-if="isAdmin">
            <template v-slot:activator="{ on, attrs }">
                <v-row justify="end">
                    <v-btn v-bind="attrs" v-on="on" text color="blue" v-if="isAdmin">Edit</v-btn>
                </v-row>
            </template>
            <update-group-info :grp_name="groupDetails.name" :grp_description="groupDetails.description" :id="id" @close="Close_update_dialog" @update="getDetails" />
        </v-dialog>
    </v-card>
    <v-flex class="list">
        <group-member-list :id="id" @update_isAdmin="Admin" />
    </v-flex>
</v-card>
</template>

<script>
import UpdateGroupInfo from "./UpdateGroupInfo.vue";
import GroupMemberList from "./GroupMemberList.vue";
import axios from "axios";

export default {
    components: {
        UpdateGroupInfo,
        GroupMemberList,
    },
    name: "GroupInformation",
    props: ["id"],
    data() {
        return {
            groupDetails: {},
            members: [],
            admins: [],
            update_dialog: false,
            isAdmin: 0,
            image_url: "https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png",
        };
    },
    methods: {
        Close_update_dialog() {
            this.update_dialog = false;
        },
        Close() {
            this.$parent.infoPane = false;
        },

        getDetails() {
            var id = this.id;
            console.log(id);
            if (id) {
                this.axios
                    .get(`api/group/${id}/`)
                    .then((res) => (this.groupDetails = res.data))
                    .catch((e) => console.log(e));
            }
        },
        getImage() {
            axios({
                    url: `api/profileImage/1/${this.id}/`,
                    method: "get",
                })
                .then((res) => {
                    console.log(res.data);
                    this.image_url = res.data.img_url;
                })
                .catch((e) => {
                  console.log(e);
                  this.image_url = "https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png";
                });
        },

        Admin() {
            this.isAdmin = 1;
        },
    },
    watch: {
        id: function () {
            this.getDetails();
            this.getImage();
        },
    },
};
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100%;
    background-color: rgb(188, 197, 206);
}

.details {
    margin-top: 5%;
    width: 80%;
    margin-left: 10%;
    background-color: rgb(104, 77, 77);
    margin-bottom: 5%;
}

.profile-pic img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 10px solid #ffffff;
    margin: 0;
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 105px;
    margin-bottom: -100px;
    background-color: black;
}
</style>
