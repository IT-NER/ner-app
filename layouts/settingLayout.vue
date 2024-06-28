<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawerLeft" app>
      <!-- CardProfile -->
      <card-profile />

      <v-divider></v-divider>
      <!-- CardMenu -->
      <card-menu-setting />
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
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import CardProfile from "~/components/profile/CardProfile.vue";
import CardMenuSetting from "~/components/setting/CardMenuSetting.vue";
export default {
  components: { CardProfile, CardMenuSetting },
  data() {
    return {
      drawerLeft: null,
      title: null,
    };
  },
};
</script>
