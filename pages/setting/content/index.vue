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
          <crud-reward v-if="item.index == 0" />
          <crud-content-type v-if="item.index == 1" />
          <crud-content-status v-if="item.index == 2" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script>
import CrudContentType from "~/components/setting/ContentType/CrudContentType.vue";
import CrudContentStatus from "~/components/setting/ContentStatus/CrudContentStatus.vue";
import CrudReward from "~/components/setting/Reward/CrudReward.vue";

export default {
  layout: "settingLayout",
  components: { CrudContentType, CrudContentStatus, CrudReward },
  data() {
    return {
      tab: {
        index: 0,
        text: "ของรางวัล",
        icon: "mdi-content-save-all",
      },

      items: [
        {
          index: 0,
          text: "ของรางวัล",
          icon: "mdi-content-save-all",
        },
        {
          index: 1,
          text: "ประเภทคอนเทนต์",
          icon: "mdi-content-save-all",
        },
        {
          index: 2,
          text: "สถานะคอนเทนต์",
          icon: "mdi-content-save-all",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
