<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="success"
      dark
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
            <setting-booking
              v-if="item.component == 'setting-booking'"
            ></setting-booking>
            <setting-room
              v-if="item.component == 'setting-room'"
            ></setting-room>
            <setting-program
              v-if="item.component == 'setting-program'"
            ></setting-program>
            <setting-meeting-type
              v-if="item.component == 'setting-meeting-type'"
            ></setting-meeting-type>
            <setting-food
              v-if="item.component == 'setting-food'"
            ></setting-food>
            <setting-device
              v-if="item.component == 'setting-device'"
            ></setting-device>
            <setting-drink
              v-if="item.component == 'setting-drink'"
            ></setting-drink>
            <setting-status
              v-if="item.component == 'setting-status'"
            ></setting-status>

            <!-- user -->
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
  </div>
</template>

<script>
import SettingDevice from "~/components/setting/SettingDevice.vue";
import SettingDrink from "~/components/setting/SettingDrink.vue";
import SettingFood from "~/components/setting/SettingFood.vue";
import SettingMeetingType from "~/components/setting/SettingMeetingType.vue";
import SettingProgram from "~/components/setting/SettingProgram.vue";
import SettingRoom from "~/components/setting/SettingRoom.vue";
import SettingStatus from "~/components/setting/SettingStatus.vue";
export default {
  components: {
    SettingDevice,
    SettingDrink,
    SettingFood,
    SettingMeetingType,
    SettingRoom,
    SettingStatus,
    SettingProgram,
  },

  data() {
    return {
      tab: null,

      items: [
        {
          tab: "ประเภทการประชุม",
          component: "setting-meeting-type",
        },
        {
          tab: "ห้องประชุม",
          component: "setting-room",
        },
        {
          tab: "อุปกรณ์",
          component: "setting-device",
        },
        {
          tab: "อาหาร",
          component: "setting-food",
        },
        {
          tab: "เครื่องดื่ม",
          component: "setting-drink",
        },
        {
          tab: "สถานะ",
          component: "setting-status",
        },
        {
          tab: "แผนก",
          component: "setting-department",
        },
        {
          tab: "ตำแหน่ง",
          component: "setting-position",
        },
        {
          tab: "สิทธิ์การใช้งานระบบ",
          component: "setting-role",
        },
      ],
    };
  },
};
</script>