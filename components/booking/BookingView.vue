<template>
  <div>
    <!-- {{ booking }} -->
    <v-container>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="bookings"
            :items-per-page="-1"
            class="elevation-1"
            hide-default-footer
          >
            <template v-slot:item.userBooking="{ item }">
              <span class="mr-2">{{ item.User.fname }}</span>
              <span>{{ item.User.fname }}</span>
            </template>
            <template v-slot:item.start="{ item }">
              {{ $moment(item.start).format("LLLL") }}
            </template>
            <template v-slot:item.end="{ item }">
              {{ $moment(item.end).format("LLLL") }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BookingListsDevice from "./BookingListsDevice.vue";
import BookingListsDrink from "./BookingListsDrink.vue";
import BookingListsFood from "./BookingListsFood.vue";
export default {
  components: { BookingListsDevice, BookingListsFood, BookingListsDrink },
  props: ["booking"],

  data() {
    return {
      headers: [
        { text: "หัวข้อ", value: "name", sortable: false },
        { text: "ประธาน", value: "chairman", sortable: false },
        { text: "ผู้จอง", value: "userBooking", sortable: false },
        { text: "ห้องประชุม", value: "Room.name", sortable: false },
        { text: "เริ่ม", value: "start", sortable: false },
        { text: "สิ้นสุด", value: "end", sortable: false },
        { text: "ประเภท", value: "MeetingType.name", sortable: false },
        { text: "สถานะ", value: "Status.name", sortable: false },
      ],

      bookings: [],
    };
  },

  watch: {
    booking(val) {
      // console.log("val", val);
      this.bookings = [];
      this.bookings.push(val);

      // console.log("bookings", this.bookings);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>