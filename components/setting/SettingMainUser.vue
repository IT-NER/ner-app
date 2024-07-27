<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="success"
      dark
      center-active
      slider-color="warning"
    >
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <v-card-text>
            {{ item.content }}
          </v-card-text>
          <v-card-text>
            <!-- components -->
            <setting-department
              v-if="item.component == 'setting-department'"
            ></setting-department>
            <setting-position
              v-if="item.component == 'setting-position'"
            ></setting-position>
            <setting-role
              v-if="item.component == 'setting-role'"
            ></setting-role>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import SettingRole from "~/components/setting/SettingRole.vue";
import SettingDepartment from "~/components/setting/SettingDepartment.vue";
import SettingPosition from "~/components/setting/SettingPosition.vue";
export default {
  components: {
    SettingDepartment,
    SettingPosition,
    SettingRole,
  },

  data() {
    return {
      tab: null,

      items: [],
      itemsAdmin: [
        {
          tab: "แผนก",
          component: "setting-department",
        },
        {
          tab: "ตำแหน่ง",
          component: "setting-position",
        },
      ],

      itemsSuperAdmin: [
        {
          tab: "แผนก",
          component: "setting-department",
        },
        {
          tab: "ตำแหน่ง",
          component: "setting-position",
        },
        {
          tab: "สิทธิ์การใช้งาน",
          component: "setting-role",
        },
      ],

      User: null,
    };
  },
  async created() {
    await this.getUser();
  },

  methods: {
    async getUser() {
      this.User = this.$auth.$storage.getCookie("user");
      let role = this.User.Role.name;
      if (role == "admin") {
        this.items = this.itemsAdmin;
      } else if (role == "super-admin") {
        this.items = this.itemsSuperAdmin;
      }
    },
  },
};
</script>
