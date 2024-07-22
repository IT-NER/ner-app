<template>
  <div>
    <!-- CardBookingRoom -->
    <card-booking-room />

    <!-- CardBookingCalendar -->
    <card-booking-calendar
      :items.sync="items"
      :item.sync="item"
      @getItems="getItems"
      @addItem="addItem"
      @viewItem="viewItem"
    />

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      transition="slide-y-reverse-transition"
      max-width="1250"
    >
      <form @submit.prevent="save">
        <v-card>
          <v-card-title>
            จองห้องประชุม
            <v-spacer></v-spacer>
            <v-icon @click="closeDialog"> mdi-close </v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <!-- FormBookingCrud  -->
            <form-booking-crud
              :item.sync="item"
              :itemsRoom.sync="itemsRoom"
              :itemsMeetingType.sync="itemsMeetingType"
              :itemsProgram.sync="itemsProgram"
              :itemsBookingStatus.sync="itemsBookingStatus"
              :itemsDevice.sync="itemsDevice"
              :itemsFood.sync="itemsFood"
              :itemsDrink.sync="itemsDrink"
              :itemsRoomNotReserved.sync="itemsRoomNotReserved"
              @getItemsRoom="getItemsRoom"
              @setItemMeetingType="setItemMeetingType"
            />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" type="submit">บันทึก</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <v-dialog
      v-model="dialogView"
      scrollable
      persistent
      max-width="1250"
      transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-card-title>
          {{ item.name }}
          <v-spacer></v-spacer>
          <v-icon @click="dialogView = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <card-booking-view :item.sync="item" :dialogView.sync="dialogView" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CardBookingCalendar from "~/components/card/CardBookingCalendar.vue";
import CardBookingRoom from "~/components/card/CardBookingRoom.vue";
import CardBookingView from "~/components/card/CardBookingView.vue";
import FormBookingCrud from "~/components/form/FormBookingCrud.vue";
export default {
  components: {
    CardBookingCalendar,
    FormBookingCrud,
    CardBookingRoom,
    CardBookingView,
  },
  data() {
    return {
      focus: "",

      items: [],
      item: {
        id: null,
        start: null,
        end: null,
        name: null,
        color: null,
        timed: true,
        allDay: false,
        url: null,
        description: null,
        chairman: null,
        quantity: null,
        meetingId: null,
        meetingPassword: null,
        ApproveBy: null,
        tel: null,
        meetingTypeId: null,
        programId: null,
        roomId: null,
        statusId: null,
        userId: null,

        bookingDevice: [],
        bookingDrink: [],
        bookingFood: [],

        dateStart: this.$moment(new Date()).format("YYYY-MM-DD"),
        dateEnd: this.$moment(new Date()).format("YYYY-MM-DD"),
        dateStartModal: false,
        dateEndModal: false,

        timeStart: this.$moment(new Date()).format("HH:mm"),
        timeEnd: this.$moment(new Date()).format("HH:mm"),
        timeStartModal: false,
        timeEndModal: false,
      },

      dialog: false,
      dialogView: false,

      itemsRoom: [],
      itemsMeetingType: [],
      itemsProgram: [],
      itemsBookingStatus: [],
      itemsDevice: [],
      itemsFood: [],
      itemsDrink: [],
      itemsRoomNotReserved: [],
    };
  },

  created() {
    this.main();
  },

  methods: {
    async save() {
      let user = this.$auth.$storage.getCookie("user");
      this.item.userId = await user.id;

      await this.setDateTime();

      if (!this.item.roomId) {
        this.alertSelectRoom();
        return;
      }
      if (this.item.meetingTypeId == 2) {
        if (!this.item.programId) {
          this.alertSelectProgram();
          return;
        }
      }

      console.log("item", this.item);
      let item = null;
      if (this.item.id) {
        item = await this.update();
      } else {
        item = await this.create();
      }

      if (!item) {
        this.alertError();
        return;
      }

      this.dialog = false;
      await this.alertSuccess();
      await this.main();
    },
    async create() {
      let item = await this.$axios
        .post("/api/booking", {
          data: this.item,
        })
        .then((res) => {
          console.log("createBooking", res.data);
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return item;
    },

    async update() {
      let item = await this.$axios
        .put("/api/booking/" + this.item.id, {
          data: this.item,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return item;
    },

    async setItemMeetingType() {
      if (this.item.meetingTypeId == 1) {
        this.item.programId = null;
        this.item.meetingId = null;
        this.item.meetingPassword = null;
        this.item.url = null;
      }
    },

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertSuccess() {
      this.$swal.fire({
        position: "top-end",
        type: "success",
        title: "บันทึก เรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertSelectRoom() {
      this.$swal.fire({
        position: "center",
        type: "warning",
        title: "กรุณาเลือกห้องประชุม",
      });
    },

    async alertSelectProgram() {
      this.$swal.fire({
        position: "center",
        type: "warning",
        title: "กรุณาเลือกโปรแกรม",
      });
    },
    async setDateTime() {
      this.item.start = new Date(
        this.item.dateStart + "T" + this.item.timeStart
      );
      this.item.end = new Date(this.item.dateEnd + "T" + this.item.timeEnd);
    },
    async addItem() {
      await this.setItemDefault();
      this.itemsRoom = [];
      this.itemsRoomNotReserved = [];
      this.dialog = true;
    },

    async viewItem() {
      this.dialogView = true;
      console.log("item", this.item);
    },
    async setItemDefault() {
      this.item = {
        id: null,
        start: null,
        end: null,
        name: null,
        color: null,
        timed: true,
        allDay: false,
        url: null,
        description: null,
        chairman: null,
        quantity: null,
        meetingId: null,
        meetingPassword: null,
        ApproveBy: null,
        tel: null,
        meetingTypeId: 1,
        programId: null,
        roomId: null,
        statusId: null,
        userId: null,
        bookingDevice: [],
        bookingDrink: [],
        bookingFood: [],

        dateStart: this.$moment(new Date()).format("YYYY-MM-DD"),
        dateEnd: this.$moment(new Date()).format("YYYY-MM-DD"),

        dateStartModal: false,
        dateEndModal: false,

        timeStart: this.$moment(new Date()).format("HH:mm"),
        timeEnd: this.$moment(new Date()).format("HH:mm"),
        timeStartModal: false,
        timeEndModal: false,
      };
    },
    async closeDialog() {
      this.dialog = false;
    },

    async getItems() {
      let items = await this.$axios
        .get("/api/booking")
        .then((res) => {
          res.data.forEach(async (item) => {
            item["color"] = item.Room.color;
            item["bookingDevice"] = item.BookingDevice;
            item["bookingFood"] = item.BookingFood;
            item["bookingDrink"] = item.BookingDrink;

            item["start"] = this.$moment(item.start).format(
              "YYYY-MM-DDTHH:mm:ss"
            );
            item["end"] = this.$moment(item.end).format("YYYY-MM-DDTHH:mm:ss");
          });

          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return items;
    },
    async getItemsRoom() {
      await this.setDateTime();
      // console.log("item", this.item);

      let data = {
        start: new Date(this.item.start),
        end: new Date(this.item.end),
      };
      // console.log("data", data);

      this.itemsRoom = await this.$axios
        .post("/api/room/date-between", {
          data: data,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      if (this.itemsRoom.length > 0) {
        let item = [];
        this.itemsRoom.forEach((e) => {
          item.push(e.id);
        });
        this.itemsRoomNotReserved = await this.$axios
          .post("/api/room/notReserved", {
            data: {
              data,
              item,
            },
          })
          .then((res) => {
            console.log("itemsRoomNotReserved", res.data);
            return res.data;
          })
          .catch((err) => {
            return false;
          });
      }
    },

    async getItemsMeetingType() {
      let items = await this.$axios
        .get("/api/meetingType")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return items;
    },
    async getItemsProgram() {
      let items = await this.$axios
        .get("/api/program")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return items;
    },
    async getItemsDevice() {
      let items = await this.$axios
        .get("/api/device")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return items;
    },
    async getItemsFood() {
      let items = await this.$axios
        .get("/api/food")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return items;
    },
    async getItemsDrink() {
      let items = await this.$axios
        .get("/api/drink")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return items;
    },

    async main() {
      this.items = await this.getItems();
      this.itemsMeetingType = await this.getItemsMeetingType();
      this.itemsProgram = await this.getItemsProgram();
      this.itemsDevice = await this.getItemsDevice();
      this.itemsFood = await this.getItemsFood();
      this.itemsDrink = await this.getItemsDrink();
    },
  },
};
</script>

<style lang="scss" scoped></style>
