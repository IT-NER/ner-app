<template>
  <div>
    <v-card flat>
      <v-list>
        <v-list-item>
          <v-spacer></v-spacer>
          <v-list-item-avatar size="100">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
          <v-spacer></v-spacer>
        </v-list-item>
        <v-divider></v-divider>

        <v-banner class="success" dense dark>
          POINT : {{ user.point }}</v-banner
        >

        <v-divider></v-divider>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item link v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title class="sub-title">
                  {{ user.fname }} {{ user.lname }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ user.username }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ user.email }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
              <v-list-item-icon>
                <v-icon>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "โปรไฟล์",
          icon: "mdi-account",
          link: "/user/profile",
        },
        { text: "ออกจากระบบ", icon: "mdi-logout", link: "/logout" },
      ],

      user: null,
    };
  },

  methods: {
    async getUser() {
      this.user = this.$auth.$storage.getCookie("user");
    },
  },

  created() {
    this.getUser();
  },
};
</script>
