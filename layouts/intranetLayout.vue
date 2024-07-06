<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawerLeft" app>
      <!-- CardProfile -->
      <card-profile />

      <v-divider></v-divider>
      <!-- Menu -->
      <menu-default />
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawerRigth" app right>
      <card-button-link />
    </v-navigation-drawer>

    <v-app-bar app color="success" dark elevation="0">
      <v-app-bar-nav-icon @click="drawerLeft = !drawerLeft">
        <v-icon v-if="drawerLeft"> mdi-chevron-left </v-icon>
        <v-icon v-else> mdi-chevron-right </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click="drawerRigth = !drawerRigth">
        <v-icon v-if="drawerRigth"> mdi-chevron-right </v-icon>
        <v-icon v-else> mdi-chevron-left </v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import CardButtonLink from "~/components/intranet/CardButtonLink.vue";
import MenuDefault from "~/components/menu/MenuDefault.vue";
import CardProfile from "~/components/profile/CardProfile.vue";
export default {
  components: { CardProfile, MenuDefault, CardButtonLink },
  data() {
    return {
      drawerLeft: null,
      drawerRigth: null,
      title: null,
    };
  },
};
</script>
