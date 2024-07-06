<template>
  <v-app id="inspire">
    <!-- nevbarLeft -->
    <v-navigation-drawer v-model="drawerLeft" app width="300">
      <!-- CardProfile -->
      <card-profile />

      <v-divider></v-divider>
      <!-- Menu -->
      <menu-default />
    </v-navigation-drawer>

    <!-- nevbarRight -->
    <v-navigation-drawer
      v-model="drawerRigth"
      app
      right
      v-if="$nuxt.$route.name == 'index'"
      width="300"
    >
      <card-button-link />
      {{ $nuxt.$route.name }}
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

      <v-app-bar-nav-icon
        @click="drawerRigth = !drawerRigth"
        v-if="$nuxt.$route.name == 'index'"
      >
        <v-icon v-if="drawerRigth"> mdi-chevron-right </v-icon>
        <v-icon v-else> mdi-chevron-left </v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <Nuxt />
      <btn-scroll-to-top />
    </v-main>
  </v-app>
</template>

<script>
import CardProfile from "~/components/profile/CardProfile.vue";
import MenuDefault from "~/components/menu/MenuDefault.vue";
import CardButtonLink from "~/components/intranet/CardButtonLink.vue";
import BtnScrollToTop from "~/components/btn/BtnScrollToTop.vue";
export default {
  components: { CardProfile, MenuDefault, CardButtonLink, BtnScrollToTop },
  data() {
    return {
      drawerLeft: null,
      drawerRigth: null,
      title: null,
    };
  },
};
</script>
