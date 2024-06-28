<template>
  <div>
    <template>
      <v-tabs align-with-title background-color="success" dark v-model="tab">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="(item, i) in items" :key="i">
          <v-icon class="mr-2">
            {{ item.icon }}
          </v-icon>
          <span>
            {{ item.text }}
          </span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, i) in items" :key="i">
          <crud-user v-if="item.index == 0" />
          <crud-department v-if="item.index == 1" />
          <crud-position v-if="item.index == 2" />
          <crud-role v-if="item.index == 3" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script>
import CrudUser from "~/components/setting/User/CrudUser.vue";
import CrudDepartment from "~/components/setting/Department/CrudDepartment.vue";
import CrudPosition from "~/components/setting/Position/CrudPosition.vue";
import CrudRole from "~/components/setting/Role/CrudRole.vue";
export default {
  components: { CrudUser, CrudDepartment, CrudPosition, CrudRole },
  layout: "settingLayout",
  data() {
    return {
      tab: {
        index: 0,
        text: "ผู้ใช้งาน",
        icon: "mdi-account-cog",
      },

      items: [
        {
          index: 0,
          text: "ผู้ใช้งาน",
          icon: "mdi-account-cog",
        },
        {
          index: 1,
          text: "ฝ่าย",
          icon: "mdi-account-cog",
        },
        {
          index: 2,
          text: "ตำแหน่ง",
          icon: "mdi-account-cog",
        },
        {
          index: 3,
          text: "สิทธิ์การใช้งาน",
          icon: "mdi-account-cog",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
