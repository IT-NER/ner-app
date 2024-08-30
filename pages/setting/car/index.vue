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
          <crud-car v-if="item.index == 1" />
          <crud-car-type v-if="item.index == 2" />
          <crud-car-brand v-if="item.index == 3" />
          <crud-car-model v-if="item.index == 4" />
          <crud-car-color v-if="item.index == 5" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script>
import CrudCar from "~/components/crud/CrudCar.vue";
import CrudCarType from "~/components/crud/CrudCarType.vue";
import CrudCarBrand from "~/components/crud/CrudCarBrand.vue";
import CrudCarModel from "~/components/crud/CrudCarModel.vue";
import CrudCarColor from "~/components/crud/CrudCarColor.vue";

export default {
  components: {
    CrudCar,
    CrudCarType,
    CrudCarBrand,
    CrudCarModel,
    CrudCarColor,
  },
  data() {
    return {
      tab: {
        index: 1,
        text: "รถ",
        icon: "mdi-cog",
      },

      items: [
        {
          index: 1,
          text: "รถ",
          icon: "mdi-cog",
        },
        {
          index: 2,
          text: "ประเภทรถ",
          icon: "mdi-cog",
        },
        {
          index: 3,
          text: "ยี่ห้อรถ",
          icon: "mdi-cog",
        },
        {
          index: 4,
          text: "รุ่นรถ",
          icon: "mdi-cog",
        },
        {
          index: 5,
          text: "สีรถ",
          icon: "mdi-cog",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
