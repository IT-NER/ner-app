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
          <crud-room v-if="item.index == 0" />
          <crud-meeting-type v-if="item.index == 1" />
          <crud-status v-if="item.index == 2" />
          <crud-program v-if="item.index == 3" />
          <crud-device v-if="item.index == 4" />
          <crud-food v-if="item.index == 5" />
          <crud-drink v-if="item.index == 6" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </div>
</template>

<script>
import CrudRoom from "~/components/crud/CrudRoom.vue";
import CrudProgram from "~/components/crud/CrudProgram.vue";
import CrudMeetingType from "~/components/crud/CrudMeetingType.vue";
import CrudStatus from "~/components/crud/CrudStatus.vue";
import CrudDevice from "~/components/crud/CrudDevice.vue";
import CrudFood from "~/components/crud/CrudFood.vue";
import CrudDrink from "~/components/crud/CrudDrink.vue";

export default {
  components: {
    CrudRoom,
    CrudProgram,
    CrudMeetingType,
    CrudStatus,
    CrudDevice,
    CrudFood,
    CrudDrink,
  },

  data() {
    return {
      tab: {
        index: 0,
        text: "ห้องประชุม",
        icon: "mdi-map-marker",
      },

      items: [
        {
          index: 0,
          text: "ห้องประชุม",
          icon: "mdi-map-marker",
        },
        {
          index: 1,
          text: "ประเภทการประชุม",
          icon: "mdi-map-marker",
        },
        {
          index: 2,
          text: "สถานะการจอง",
          icon: "mdi-map-marker",
        },
        {
          index: 3,
          text: "โปรแกรม",
          icon: "mdi-map-marker",
        },
        {
          index: 4,
          text: "อุปกรณ์",
          icon: "mdi-map-marker",
        },
        {
          index: 5,
          text: "อาหาร",
          icon: "mdi-map-marker",
        },
        {
          index: 6,
          text: "เครื่องดื่ม",
          icon: "mdi-map-marker",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
