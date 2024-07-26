<template>
  <div>
    <card-booking-filter
      :filter.sync="filter"
      :item.sync="item"
      :items.sync="items"
      @refresh="refresh"
      @getItems="getItems"
      @setDateEnd="setDateEnd"
    />

    <card-booking-crud
      :items.sync="items"
      :item.sync="item"
      :headers.sync="headers"
      :search.sync="search"
      @addItem="addItem"
      @editItem="editItem"
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
import FormBookingCrud from "~/components/form/FormBookingCrud.vue";
import CardBookingCrud from "~/components/card/CardBookingCrud.vue";
import CardBookingFilter from "~/components/card/CardBookingFilter.vue";
import CardBookingView from "~/components/card/CardBookingView.vue";
export default {
  components: {
    CardBookingFilter,
    CardBookingCrud,
    FormBookingCrud,
    CardBookingView,
  },
  data() {
    return {
      filter: {
        dateStart: this.$moment().format("YYYY-MM-DD"),
        dateEnd: this.$moment().add(1, "days").format("YYYY-MM-DD"),
        dateStartModal: false,
        dateEndModal: false,

        timeStart: this.$moment().format("00:00"),
        timeEnd: this.$moment().format("00:00"),
        timeStartModal: false,
        timeEndModal: false,

        roomId: null,
        meetingTypeId: null,
        statusId: 1,
      },

      headers: [],
      headersUser: [
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
          text: "สถานะ",
          value: "status",
          align: "start",
          sortable: false,
        },
        {
          text: "VIEW",
          value: "view",
          align: "start",
          sortable: false,
        },
      ],
      headersAdmin: [
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
          text: "สถานะ",
          value: "status",
          align: "start",
          sortable: false,
        },
        {
          text: "ACTIONS",
          value: "actions",
          align: "center",
          sortable: false,
        },
        {
          text: "VIEW",
          value: "view",
          align: "center",
          sortable: false,
        },
      ],

      search: null,

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

      itemsMeetingType: [],
      itemsProgram: [],
      itemsBookingStatus: [],
      itemsDevice: [],
      itemsFood: [],
      itemsDrink: [],
      itemsRoomEnable: [],
      itemsRoomDisable: [],

      user: null,
    };
  },

  created() {
    // this.items = this.getItems();
    // this.user = this.getUser();
    this.itemsMeetingType = this.getItemsMeetingType();
    this.itemsProgram = this.getItemsProgram();
    this.itemsDevice = this.getItemsDevice();
    this.itemsFood = this.getItemsFood();
    this.itemsDrink = this.getItemsDrink();
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.main();
      }
    },
  },

  methods: {
    async main() {
      this.items = await this.getItems();
      this.user = await this.getUser();
    },

    async editItem(item) {
      console.log("item", item);
      this.item = Object.assign({}, item);

      await this.getItemsRoom();
      this.dialog = true;
    },
    async setDateTime() {
      this.item.start = new Date(
        this.item.dateStart + "T" + this.item.timeStart
      );
      this.item.end = new Date(this.item.dateEnd + "T" + this.item.timeEnd);
    },
    async getItemsRoom() {
      console.log("item", this.item);
      await this.setDateTime();
      this.itemsRoomEnable = await this.getItemsRoomEnable();
      this.itemsRoomDisable = await this.getItemsRoomDisable();
      // console.log("itemsRoomEnable", this.itemsRoomEnable);
      // console.log("itemsRoomDisable", this.itemsRoomDisable);

      if (!this.item.id) {
        return;
      }
      this.item.roomId = await this.item.Room.id;
      console.log("item", this.item);
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

    async setItemDateTime() {
      this.item.start = new Date(
        this.item.dateStart + "T" + this.item.timeStart
      );
      this.item.end = new Date(this.item.dateEnd + "T" + this.item.timeEnd);
    },

    async addItem() {
      this.dialog = true;
      this.itemsRoomEnable = [];
      this.itemsRoomDisable = [];

      this.item.id = null;
      this.item.start = null;
      this.item.end = null;
      this.item.name = null;
      this.item.color = null;
      this.item.timed = true;
      this.item.allDay = false;
      this.item.url = null;
      this.item.description = null;
      this.item.chairman = null;
      this.item.quantity = null;
      this.item.meetingId = null;
      this.item.meetingPassword = null;
      this.item.ApproveBy = null;
      this.item.tel = null;
      this.item.meetingTypeId = 1;
      this.item.programId = null;
      this.item.roomId = null;
      this.item.statusId = null;
      this.item.userId = null;
      this.item.bookingDevice = [];
      this.item.bookingDrink = [];
      this.item.bookingFood = [];

      this.item.dateStart = this.$moment().format("YYYY-MM-DD");
      this.item.dateEnd = this.$moment().format("YYYY-MM-DD");
      this.item.dateStartModal = false;
      this.item.dateEndModal = false;
      this.item.timeStart = this.$moment().format("08:00");
      this.item.timeEnd = this.$moment().format("17:00");
      this.item.timeStartModal = false;
      this.item.timeEndModal = false;
    },

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
          // console.log("createBooking", res.data);
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

    async setDateEnd() {
      this.filter.dateEnd = this.filter.dateStart;
      await this.getItemsRoom();
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
    async setItemMeetingType() {
      if (this.item.meetingTypeId == 1) {
        this.item.programId = null;
        this.item.meetingId = null;
        this.item.meetingPassword = null;
        this.item.url = null;
      }
    },
    async setItemMeetingType() {
      if (this.item.meetingTypeId == 1) {
        this.item.programId = null;
        this.item.meetingId = null;
        this.item.meetingPassword = null;
        this.item.url = null;
      }
    },

    async getUser() {
      let user = await this.$auth.$storage.getCookie("user");

      if (user.Role.id == 1) {
        this.headers = this.headersUser;
      } else if (user.Role.id > 1) {
        this.headers = this.headersAdmin;
      }
      return user;
    },
    async viewItem(item) {
      console.log("item", this.item);
      this.item = await item;
      this.dialogView = true;
    },

    async closeDialog() {
      this.dialog = false;
    },

    async refresh() {
      this.filter.dateStart = this.$moment().format("YYYY-MM-DD");
      this.filter.dateEnd = this.$moment().add(1, "days").format("YYYY-MM-DD");
      this.filter.timeStart = this.$moment().format("00:00");
      this.filter.timeEnd = this.$moment().format("00:00");
      this.filter.statusId = 1;

      await this.getItems();
    },
    async getItems() {
      // console.log("item", this.filter);

      this.filter.start = await this.$moment(
        this.filter.dateStart + "T" + this.filter.timeStart
      ).format("YYYY-MM-DDTHH:mm");
      this.filter.end = await this.$moment(
        this.filter.dateEnd + "T" + this.filter.timeEnd
      ).format("YYYY-MM-DDTHH:mm");

      let items = await this.$axios
        .post("/api/booking/search", {
          data: this.filter,
        })
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

      this.items = items;
      return items;
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
  },
};
</script>

<style lang="scss" scoped></style>
