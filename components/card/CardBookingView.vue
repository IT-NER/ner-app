<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-divider></v-divider>
        <v-card flat>
          <v-toolbar dense flat> ผู้จอง </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <p>{{ item.User.fname }} {{ item.User.lname }}</p>
            <p>{{ item.User.Department.name }}</p>
            <p>เวลาที่จอง : {{ $moment(item.createdAt).format("lll") }}</p>
            <p v-if="user.Role.id > 1">เบอร์โทร : {{ item.tel }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-divider></v-divider>
        <v-card flat>
          <v-toolbar dense flat> หัวข้อ / ประธาน / รูปแบบ </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <p>
              {{ item.name }}
            </p>
            <p>{{ item.chairman }}</p>
            <p>{{ item.MeetingType.name }}</p>
            <div v-if="item.MeetingType.id == 2">
              <p>{{ item.meetingId }}</p>
              <p>{{ item.meetingPassword }}</p>
              <a :href="item.url" target="_blank">{{ item.Program.name }}</a>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-divider></v-divider>
        <v-card flat>
          <v-toolbar dense flat> กำหนดการ / สถานที่ </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <p>เริ่ม : {{ $moment(item.start).format("lll") }} น.</p>
            <p>สิ้นสุด : {{ $moment(item.end).format("lll") }} น.</p>
            <p>
              {{ item.Room.name }}
            </p>
            <p>ผู้เข้าร่วมประชุม : {{ item.quantity }} คน</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-divider></v-divider>
        <v-card flat>
          <v-toolbar dense flat> อุปกรณ์ </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <card-booking-list-device
              :ids.sync="item.BookingDevice"
              :dialogView.sync="dialogView"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-divider></v-divider>
        <v-card flat>
          <v-toolbar dense flat> อาหาร </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <card-booking-list-food
              :ids.sync="item.BookingFood"
              :dialogView.sync="dialogView"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-divider></v-divider>
        <v-card flat>
          <v-toolbar dense flat> เครื่องดื่ม </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <card-booking-list-drink
              :ids.sync="item.BookingDrink"
              :dialogView.sync="dialogView"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-divider></v-divider>
        <v-card flat>
          <v-toolbar dense flat> หมายเหตุ </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <p v-if="item.description">
              {{ item.description }}
            </p>
            <v-alert v-else text prominent type="error" icon="mdi-cloud-alert">
              ไม่มีหมายเหตุ
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardBookingListDevice from "./CardBookingListDevice.vue";
import CardBookingListFood from "./CardBookingListFood.vue";
import CardBookingListDrink from "./CardBookingListDrink.vue";
export default {
  components: {
    CardBookingListDevice,
    CardBookingListFood,
    CardBookingListDrink,
  },
  props: ["item", "dialogView"],
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.getUser();
  },

  watch: {
    dialogView(val) {
      if (val) {
        this.getUser;
      }
    },
  },
  methods: {
    async getUser() {
      this.user = this.$auth.$storage.getCookie("user");
    },
  },
};
</script>

<style lang="scss" scoped></style>
