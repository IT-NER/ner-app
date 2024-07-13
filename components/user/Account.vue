<template>
  <v-card class="mx-auto">
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="https://wen057.settrade.com/brokerpage/004/web/images/ner_logo.jpg"
            class="v-responsive"
          ></v-img>
        </v-list-item-avatar>
        <v-spacer></v-spacer>
        <h5>
          <span class="mr-2">{{ user.fname }}</span>
          <span>{{ user.lname }}</span>
        </h5>
      </v-list-item>

      <v-menu offset-x bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on">
            <v-list-item-content>
              <v-list-item-title>
                <span>{{ user.username }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span>
                  {{ user.email }}
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>

        <v-list nav flat dense>
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="handleClick(item.action)"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }} </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ item.text }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      items: [
        { text: "โปรไฟล์", icon: "mdi-account", action: "goToProfile" },
        { text: "ออกจากระบบ", icon: "mdi-logout", action: "logout" },
      ],
    };
  },

  created() {
    this.getUser();
  },

  methods: {
    async handleClick(val) {
      if (val == "goToProfile") {
        this.goToProfile();
      } else if (val == "logout") {
        this.logout();
      }
    },

    async goToProfile() {
      this.$router.push("/profile");
    },

    async getUser() {
      this.user = this.$auth.$storage.getCookie("user");
    },
    async logout() {
      await this.$auth
        .logout()
        .then(async (res) => {
          let user = await this.$auth.$storage.removeUniversal("user");
          if (!user) {
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
  },
};
</script>
