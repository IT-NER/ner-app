<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-sheet>
            <v-toolbar
              elevation="0"
              dense
              dark
              color="success"
              icon="mdi-calendar"
            >
              <v-icon class="mr-3">mdi-calendar</v-icon>
              <h5>รายการจองห้องประชุม (ประจำวัน)</h5>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="events"
              :items-per-page="-1"
              :sort-by="['id']"
              :sort-desc="[true]"
              class="elevation-1"
              hide-default-footer
              fixed-header
            >
              <template v-slot:item.index="{ item, index }">
                {{ index + 1 }}
              </template>
              <template v-slot:item.userBooking="{ item }">
                <span class="mr-2">{{ item.User.fname }}</span>
                <span>{{ item.User.lname }}</span>
              </template>
              <template v-slot:item.start="{ item }">
                {{ $moment(item.start).format("LLLL") }}
              </template>
              <template v-slot:item.end="{ item }">
                {{ $moment(item.end).format("LLLL") }}
              </template>
            </v-data-table>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BookingListsDevice from "./BookingListsDevice.vue";
import BookingListsFood from "./BookingListsFood.vue";
import BookingListsDrink from "./BookingListsDrink.vue";

export default {
  components: {
    BookingListsDevice,
    BookingListsFood,
    BookingListsDrink,
  },
  props: ["events", "focus"],

  data() {
    return {
      headers: [
        { text: "ลำดับ", value: "index" },
        { text: "หัวข้อ", value: "name" },
        { text: "ประธาน", value: "chairman" },
        { text: "ผู้จอง", value: "userBooking" },
        { text: "ห้องประชุม", value: "Room.name" },
        { text: "เริ่ม", value: "start" },
        { text: "สิ้นสุด", value: "end" },
        { text: "ประเภท", value: "MeetingType.name" },
        { text: "สถานะ", value: "Status.name" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>