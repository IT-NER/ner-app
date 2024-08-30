<template>
  <div>
    <template>
      <v-tabs align-with-title background-color="success" dark v-model="tab">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="(item, i) in items" :key="i">
          <v-icon>
            {{ item.icon }}
          </v-icon>
          <span>
            {{ item.text }}
          </span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, i) in items" :key="i">
          <crud-department v-if="item.index == 1" />
          <crud-position v-if="item.index == 2" />
          <crud-role v-if="item.index == 3" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script>
import CrudDepartment from "~/components/crud/CrudDepartment.vue";
import CrudPosition from "~/components/crud/CrudPosition.vue";
import CrudRole from "~/components/crud/CrudRole.vue";
export default {
  components: { CrudDepartment, CrudPosition, CrudRole },

  data() {
    return {
      tab: {
        index: 1,
        text: "ฝ่าย",
        icon: "mdi-cog",
      },

      items: [
        {
          index: 1,
          text: "ฝ่าย",
          icon: "mdi-cog",
        },
        {
          index: 2,
          text: "ตำแหน่ง",
          icon: "mdi-cog",
        },
        {
          index: 3,
          text: "สิทธิ์การใช้งาน",
          icon: "mdi-cog",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
