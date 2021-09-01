<template>
  <v-main>
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3" size="20" tile>
        <v-icon> mdi-account-circle </v-icon>
      </v-avatar>
      <div>
        <v-card-text
          v-text="user.name==undefined?(user.first_name + ' ' + user.last_name):user.name"
        ></v-card-text>
      </div>
    </div>
  </v-main>
</template>

<script>
export default {
  name: "Chat",
  props: ["user"],
};
</script>

<style>
</style>