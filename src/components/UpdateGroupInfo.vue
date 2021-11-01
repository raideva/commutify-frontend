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
            <v-form>
                <v-text-field name="grp_name" v-model="cur_grp_name" :rules="rules" label="Group Name" type="text" :error-messages="error_grp_name" outlined :value="grp_name"></v-text-field>
                <v-textarea v-model="cur_grp_description" :rules="rules" auto-grow filled color="deep-purple" label="Group Description" type="text" :error-messages="error_grp_description" rows="2" :value="grp_description"></v-textarea>
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
        };
    },
    methods: {
        Close() {
            this.$emit("close");
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
                    this.$emit("update");
                    this.$emit("close");
                    console.log(res);
                })
                .catch((e) => console.log(e));
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
</style>
