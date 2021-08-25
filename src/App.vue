<template>
  <v-app>
    <Navbar />
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: { Navbar },
  data: () => ({
    //
  }),
};
</script>
