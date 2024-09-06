<template>
  <v-app id="inspire">
    <!-- nevbarLeft -->
    <v-navigation-drawer v-model="drawerLeft" app width="300">
      <!-- CardAccount -->
      <card-account />

      <v-divider></v-divider>
      <!-- Menu -->
      <menu-default :item.sync="title" />

      <template v-slot:append>
        <v-btn block tile color="primary" dark @click="$router.push('/logout')">
          ออกจากระบบ
        </v-btn>
        <v-divider></v-divider>
        <card-view-point />
      </template>
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
      <!-- {{ $nuxt.$route.name }} -->
    </v-navigation-drawer>

    <v-app-bar app color="success" dark elevation="0">
      <v-app-bar-nav-icon @click="drawerLeft = !drawerLeft">
        <!-- <v-icon v-if="drawerLeft"> mdi-chevron-left </v-icon>
        <v-icon v-else> mdi-chevron-right </v-icon> -->
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-spacer></v-spacer>
        <v-list-item two-line>
          <img src="/logo/NER_Logo_Final2.jpg" width="70" class="mr-2" />
          <v-list-item-content>
            <v-list-item-title>
              บริษัท นอร์ทอีส รับเบอร์ จำกัด (มหาชน)
            </v-list-item-title>
            <v-list-item-subtitle>
              North East Rubber (NER)
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon
        @click="drawerRigth = !drawerRigth"
        v-if="$nuxt.$route.name == 'index'"
      >
        <!-- <v-icon v-if="drawerRigth"> mdi-list-box-outline </v-icon>
        <v-icon v-else> mdi-list-box-outline </v-icon> -->
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <Nuxt />
      <btn-scroll-to-top />
    </v-main>
  </v-app>
</template>

<script>
import CardAccount from "~/components/card/CardAccount.vue";
import MenuDefault from "~/components/menu/MenuDefault.vue";
import CardButtonLink from "~/components/card/CardButtonLink.vue";
import BtnScrollToTop from "~/components/button/BtnScrollToTop.vue";
import CardViewPoint from "~/components/card/CardViewPoint.vue";
export default {
  components: {
    CardAccount,
    MenuDefault,
    CardButtonLink,
    BtnScrollToTop,
    CardViewPoint,
  },
  data() {
    return {
      drawerLeft: null,
      drawerRigth: null,
      title: null,
      user: null,
    };
  },

  created() {
    this.main();
  },
  methods: {
    async main() {
      await this.getUser();
    },

    async getUser() {
      let user = this.$auth.$storage.getCookie("user");
      this.user = await this.$axios.get("/api/user/" + user.id);
    },
  },
};
</script>
