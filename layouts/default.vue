<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <!-- account -->
      <Account />
      <v-divider />
      <!-- menu -->
      <v-card class="mx-auto" max-width="300" tile flat>
        <v-list nav dense>
          <v-list-item-group v-model="selectedItem" color="success">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.to"
              @click="setTitle(item)"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      flat
      color="success"
      dark
      dense
    >
      <v-app-bar-nav-icon class="mr-5" @click.stop="drawer = !drawer" />
      <h5 class="title">
        {{ title }}
      </h5>
    </v-app-bar>
    <v-divider inset></v-divider>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Account from "~/components/Account.vue";

export default {
  components: { Account },

  data() {
    return {
      selectedItem: null,
      clipped: false,
      drawer: true,
      fixed: true,
      user: null,
      role: null,

      title: null,

      items: [],

      itemsSuperAdmin: [
        {
          icon: "mdi-home",
          title: "หน้าหลัก",
          to: "/",
        },
        {
          icon: "mdi-clipboard-text-clock",
          title: "ประวัติ",
          to: "/booking-lists",
        },
        {
          icon: "mdi-home",
          title: "รายการ (ทั้งหมด)",
          to: "/booking-lists-all",
        },
        {
          icon: "mdi-home",
          title: "จัดการ ผู้ใช้งาน",
          to: "/user-management",
        },
        {
          icon: "mdi-home",
          title: "จัดการ รายการจอง (ทั้งหมด)",
          to: "/booking-management",
        },
        {
          icon: "mdi-cog",
          title: "ตั้งค่าระบบ",
          to: "/setting",
        },
      ],

      itemsAdmin: [
        {
          icon: "mdi-home",
          title: "หน้าหลัก",
          to: "/",
        },
        {
          icon: "mdi-clipboard-text-clock",
          title: "ประวัติ",
          to: "/booking-lists",
        },
        {
          icon: "mdi-list-box",
          title: "รายการ (ทั้งหมด)",
          to: "/booking-lists-all",
        },
      ],

      itemsUser: [
        {
          icon: "mdi-home",
          title: "หน้าหลัก",
          to: "/",
        },
        {
          icon: "mdi-clipboard-text-clock",
          title: "ประวัติ",
          to: "/booking-lists",
        },
        {
          icon: "mdi-list-box",
          title: "รายการ (ทั้งหมด)",
          to: "/booking-lists-all",
        },
      ],

      miniVariant: false,
    };
  },

  created() {
    this.getUser();
  },

  methods: {
    async setTitle(item) {
      // console.log("item", item);
      this.title = item.title;
    },

    async getUser() {
      this.user = await this.$auth.$storage.getCookie("user");
      // this.role = user.Role.name;
      // console.log("user", this.user);

      if (this.user.roleId == 3) {
        this.items = this.itemsSuperAdmin;
      } else if (this.user.roleId == 2) {
        this.items = this.itemsAdmin;
      } else if (this.user.roleId == 1) {
        this.items = this.itemsUser;
      }
    },
  },
};
</script>

