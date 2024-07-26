<template>
  <div>
    <card-booking-history
      :headers.sync="headers"
      :items.sync="items"
      :item.sync="item"
      @editItem="editItem"
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
              :itemsMeetingType.sync="itemsMeetingType"
              :itemsProgram.sync="itemsProgram"
              :itemsBookingStatus.sync="itemsBookingStatus"
              :itemsDevice.sync="itemsDevice"
              :itemsFood.sync="itemsFood"
              :itemsDrink.sync="itemsDrink"
              :itemsRoomEnable.sync="itemsRoomEnable"
              :itemsRoomDisable.sync="itemsRoomDisable"
              @getItemsRoom="getItemsRoom"
              @setItemMeetingType="setItemMeetingType"
              @setDateEnd="setDateEnd"
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
  </div>
</template>

<script>
import CardBookingHistory from "~/components/card/CardBookingHistory.vue";
import FormBookingCrud from "~/components/form/FormBookingCrud.vue";
export default {
  components: { CardBookingHistory, FormBookingCrud },
  data() {
    return {
      userId: null,

      headers: [
        {
          text: "ลำดับ",
          value: "no",
          align: "start",
          sortable: false,
        },
        {
          text: "หัวข้อ",
          value: "name",
          align: "start",
          sortable: false,
        },
        {
          text: "ประธาน",
          value: "chairman",
          align: "start",
          sortable: false,
        },
        {
          text: "ผู้จอง",
          value: "author",
          align: "start",
          sortable: false,
        },
        {
          text: "ห้องประชุม",
          value: "room",
          align: "center",
          sortable: false,
        },
        {
          text: "เริ่ม",
          value: "start",
          align: "start",
          sortable: false,
        },
        {
          text: "สิ้นสุด",
          value: "end",
          align: "start",
          sortable: false,
        },
        {
          text: "ประเภท",
          value: "type",
          align: "start",
          sortable: false,
        },
        {
          text: "ACTIONS",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],

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

      itemsMeetingType: [],
      itemsProgram: [],
      itemsBookingStatus: [],
      itemsDevice: [],
      itemsFood: [],
      itemsDrink: [],

      itemsRoomEnable: [],
      itemsRoomDisable: [],
    };
  },

  created() {
    this.main();
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.main();
      }
    },
  },

  methods: {
    async editItem(item) {
      // console.log("item", item);
      this.item = await Object.assign({}, item);
      await this.getItemsRoom();
      this.dialog = true;
    },

    async getItemsRoom() {
      this.itemsRoomEnable = await this.getItemsRoomEnable();
      // console.log("itemsRoomEnable", this.itemsRoomEnable);
      this.itemsRoomDisable = await this.getItemsRoomDisable();
      // console.log("itemsRoomDisable", this.itemsRoomDisable);

      this.item.roomId = await this.item.Room.id;
    },

    async getItemsRoomEnable() {
      let items = await this.$axios
        .post("/api/room/enable", {
          data: this.item,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return items;
    },

    async getItemsRoomDisable() {
      let items = await this.$axios
        .post("/api/room/disable", {
          data: this.item,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return items;
    },
    async getItems() {
      let user = this.$auth.$storage.getCookie("user");

      let items = await this.$axios
        .get("/api/booking/user/" + user.id)
        .then((res) => {
          res.data.forEach((item) => {
            item["color"] = item.Room.color;
            item["bookingDevice"] = item.BookingDevice;
            item["bookingFood"] = item.BookingFood;
            item["bookingDrink"] = item.BookingDrink;

            item["start"] = this.$moment(new Date(item.start)).format(
              "YYYY-MM-DDTHH:mm"
            );
            item["end"] = this.$moment(new Date(item.end)).format(
              "YYYY-MM-DDTHH:mm"
            );

            item["dateStart"] = this.$moment(new Date(item.start)).format(
              "YYYY-MM-DD"
            );
            item["timeStart"] = this.$moment(new Date(item.start)).format(
              "HH:mm"
            );
            item["dateEnd"] = this.$moment(new Date(item.end)).format(
              "YYYY-MM-DD"
            );
            item["timeEnd"] = this.$moment(new Date(item.end)).format("HH:mm");
          });

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

    async setItemMeetingType() {
      if (this.item.meetingTypeId == 1) {
        this.item.programId = null;
        this.item.meetingId = null;
        this.item.meetingPassword = null;
        this.item.url = null;
      }
    },

    async save() {
      let user = this.$auth.$storage.getCookie("user");
      this.item.userId = await user.id;

      this.item.start = new Date(
        this.item.dateStart + "T" + this.item.timeStart
      );
      this.item.end = new Date(this.item.dateEnd + "T" + this.item.timeEnd);

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

      // console.log("item", this.item);
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
      await this.getItems();
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

    async closeDialog() {
      this.dialog = false;
    },

    // set
    async setItemMeetingType() {
      if (this.item.meetingTypeId == 1) {
        this.item.programId = null;
        this.item.meetingId = null;
        this.item.meetingPassword = null;
        this.item.url = null;
      }
    },

    //get
    async setDateEnd() {
      this.item.dateEnd = this.item.dateStart;
      await this.getItemsRoom();
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

    // alert
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
  },
};
</script>

<style lang="scss" scoped></style>
