<template>
  <nav>
    <v-app-bar dark color="blue-grey darken-1" class="hidden-xs-and-down">
      <v-btn @click="closeChat()"><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-checkbox
      class="theme"
        v-model="$vuetify.theme.dark"
        inset
        off-icon="mdi-theme-light-dark"
        on-icon="mdi-theme-light-dark"
      ></v-checkbox>
      
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      dialog:false,
      nav: []
    };
  },
  methods: {
    closeChat(){
      this.$parent.$parent.chatopen = false;
    },
  }
};
</script>

<style scoped>
  .theme{
    margin-top: 20px;
    margin-right: 20px;
  }
</style>