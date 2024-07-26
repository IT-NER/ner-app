<template>
  <div>
    <card-booking-history
      :headers.sync="headers"
      :items.sync="items"
      :item.sync="item"
      @editItem="editItem"
      @viewItem="viewItem"
      @cancelItem="cancelItem"
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

    <!-- dialogView -->
    <v-dialog
      v-model="dialogView"
      scrollable
      persistent
      max-width="1250"
      transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-toolbar :color="item.color" dark elevation="0">
          {{ item.name }}
          <v-spacer></v-spacer>
          <v-icon @click="dialogView = false">mdi-close</v-icon>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <card-booking-view :item.sync="item" :dialogView.sync="dialogView" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CardBookingHistory from "~/components/card/CardBookingHistory.vue";
import FormBookingCrud from "~/components/form/FormBookingCrud.vue";
import CardBookingView from "~/components/card/CardBookingView.vue";
export default {
  components: { CardBookingHistory, FormBookingCrud, CardBookingView },
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
          align: "center",
          sortable: false,
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
        },
        {
          text: "แก่ไข",
          value: "edit",
          align: "center",
          sortable: false,
        },
        {
          text: "ยกเลิก",
          value: "cancel",
          align: "center",
          sortable: false,
        },
        {
          text: "รายละเอียด",
          value: "view",
          align: "center",
          sortable: false,
        },
      ],

      dialogView: false,
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

  async created() {
    await this.getItems();
    await this.getItemsMeetingType();
    await this.getItemsProgram();
    await this.getItemsDevice();
    await this.getItemsFood();
    await this.getItemsDrink();
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.getItems();
      }
    },
  },

  methods: {
    // view
    async viewItem(item) {
      console.log("item", this.item);
      this.item = await item;
      this.dialogView = true;
    },

    async cancelItem(e) {
      let item = Object.assign({}, e);
      let confirm = await this.alertConfirmCancelItem();
      console.log("confirm", confirm);

      if (!confirm) {
        return;
      }

      let booking = await this.$axios
        .post("/api/booking/cancel", {
          data: item,
        })
        .then((res) => {
          return true;
        })
        .catch((err) => {
          return false;
        });

      console.log("booking", booking);
      if (!booking) {
        return;
      }

      await this.alertSuccess();
      await this.getItems();
    },
    async alertConfirmCancelItem() {
      let item = await this.$swal
        .fire({
          title: "ยกเลิก",
          text: "ต้องการยกเลิก ใช่หรือไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ไม่ใช่",
          confirmButtonText: "ใช่",
        })
        .then((res) => {
          if (res.value) {
            // console.log("res", res.value);
            return true;
          } else {
            return false;
          }
        });
      return item;
    },

    // edit
    async editItem(item) {
      // console.log("item", item);
      this.item = await Object.assign({}, item);
      await this.getItemsRoom();
      await this.openDialog();
    },

    async getItemsRoom() {
      await this.getItemsRoomEnable();
      await this.getItemsRoomDisable();
      // console.log("itemsRoomEnable", this.itemsRoomEnable);
      // console.log("itemsRoomDisable", this.itemsRoomDisable);

      this.item.roomId = await this.item.Room.id;
    },
    async getItemsRoomEnable() {
      this.itemsRoomEnable = await this.$axios
        .post("/api/room/enable", {
          data: this.item,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
    async getItemsRoomDisable() {
      this.itemsRoomDisable = await this.$axios
        .post("/api/room/disable", {
          data: this.item,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
    // save
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

    // dialog
    async openDialog() {
      this.dialog = true;
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
    async setDateEnd() {
      this.item.dateEnd = this.item.dateStart;
      await this.getItemsRoom();
    },

    //get
    async getItems() {
      let user = this.$auth.$storage.getCookie("user");

      this.items = await this.$axios
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
    },
    async getItemsMeetingType() {
      this.itemsMeetingType = await this.$axios
        .get("/api/meetingType")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
    async getItemsProgram() {
      this.itemsProgram = await this.$axios
        .get("/api/program")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
    async getItemsDevice() {
      this.itemsDevice = await this.$axios
        .get("/api/device")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
    async getItemsFood() {
      this.itemsFood = await this.$axios
        .get("/api/food")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
    async getItemsDrink() {
      this.itemsDrink = await this.$axios
        .get("/api/drink")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
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
