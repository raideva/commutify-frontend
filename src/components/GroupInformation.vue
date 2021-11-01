<template>
  <div class="main">
    <v-card class="elevation-15" fluid fill-width color="red">
      <v-app-bar dark color="#141414">
        <v-app-bar-title>Group Information</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn dark color="#80002a" @click="Close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <h1>{{ groupDetails.name }}</h1>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "GroupInformation",
  props: ["id"],
  data() {
    return {
      groupDetails: {},
      members: [],
      admins: [],
    };
  },
  methods: {
    Close() {
      this.$parent.infoPane = false;
      this.$parent.curGroupId = null;
      this.getDetails = {};
      this.members = [];
      this.admins = [];
    },
    getDetails: function (id) {
      console.log("hi");
      this.axios
        .get(`api/group/${id}/`)
        .then((res) => (this.groupDetails = res.data))
        .catch((e) => console.log(e));
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
</style>