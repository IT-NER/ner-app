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
          <crud-content-type v-if="item.index == 1" />
          <crud-content-status v-if="item.index == 2" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script>
import CrudContentType from "~/components/crud/CrudContentType.vue";
import CrudContentStatus from "~/components/crud/CrudContentStatus.vue";

export default {
  components: { CrudContentType, CrudContentStatus },
  data() {
    return {
      tab: {
        index: 1,
        text: "ประเภทคอนเทนต์",
        icon: "mdi-cog",
      },

      items: [
        {
          index: 1,
          text: "ประเภทคอนเทนต์",
          icon: "mdi-cog",
        },
        {
          index: 2,
          text: "สถานะคอนเทนต์",
          icon: "mdi-cog",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
