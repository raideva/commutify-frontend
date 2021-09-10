<template>
  <nav>
    <v-app-bar dark color="blue-grey darken-1" class="hidden-xs-and-down">
      <v-btn @click="closeChat()"><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
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

    <v-app-bar dark color="blue-grey darken-3" class="hidden-sm-and-up">
      <v-app-bar-title>Mobile Menu</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <!-- <v-app-bar-side-icon dark slot="activator"></v-app-bar-side-icon> -->
        <v-card>
          <v-app-bar flat color="blue-grey darken-2">
            <v-app-bar-title>Mobile Menu</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-app-bar>

          <v-list>
            <v-list-tile v-for="(item, index) in nav" :key="index" to="#">
              <v-list-tile-action>
                <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title :title="item.title">{{
                  item.text
                }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-dialog>
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

</style>