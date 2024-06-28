<template>
  <div>
    <v-container fluid>
      <form @submit.prevent="getBooking">
        <v-card flat>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="refresh">
              <v-icon class="mr-2">mdi-refresh</v-icon>
              รีเฟรช
            </v-btn>
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="3" sm="12">
                  <v-text-field
                    label="เริ่ม"
                    type="datetime-local"
                    v-model="itemSearch.start"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12">
                  <v-text-field
                    label="สิ้นสุด"
                    type="datetime-local"
                    v-model="itemSearch.end"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3" sm="12">
                  <v-select
                    :items="Room"
                    item-text="name"
                    item-value="id"
                    label="ห้องประชุม"
                    v-model="itemSearch.RoomId"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="12">
                  <v-select
                    :items="MeetingType"
                    item-text="name"
                    item-value="id"
                    label="ประเภท"
                    v-model="itemSearch.MeetingTypeId"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="12">
                  <v-select
                    :items="Status"
                    item-text="name"
                    item-value="id"
                    label="สถานะ"
                    v-model="itemSearch.StatusId"
                    clearable
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit">
              <v-icon class="mr-2"> mdi-magnify </v-icon>
              ค้นหา
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </form>

      <v-divider></v-divider>
      <v-card flat>
        <v-card-title>
          <v-text-field
            label="ค้นหา"
            v-model="txtSearch"
            clearable
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click.prevent="addItem"
            v-if="User.Role.id > 1"
          >
            <v-icon class="mr-2"> mdi-plus </v-icon>
            เพิ่ม
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="headers" :items="Booking" :search="txtSearch">
            <template v-slot:item.no="{ index }">
              {{ index + 1 }}
            </template>
            <template v-slot:item.author="{ item }">
              {{ item.User.fname }} {{ item.User.lname }}
            </template>
            <template v-slot:item.start="{ item }">
              {{ $moment(item.start).format("LL") }}
              <br />
              เวลา {{ $moment(item.start).format("HH:mm") }} น.
            </template>
            <template v-slot:item.end="{ item }">
              {{ $moment(item.end).format("LL") }}
              <br />
              เวลา {{ $moment(item.start).format("HH:mm") }} น.
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon color="warning" @click="editItem(item)">
                mdi-database-edit
              </v-icon>
              <v-icon
                :disabled="item.StatusId == 2"
                color="success"
                @click="approveBooking(item)"
              >
                mdi-database-check
              </v-icon>
              <v-icon color="error" @click="cancelBooking(item)">
                mdi-database-minus
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          scrollable
          persistent
          transition="dialog-bottom-transition"
        >
          <form @submit.prevent="save">
            <v-card>
              <v-toolbar dark :color="formColor">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title :color="formColor">
                  {{ formTitle }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text type="submit">
                    <v-icon class="mr-2"></v-icon>
                    บันทึก
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <booking-form
                  :booking.sync="booking"
                  :Room.sync="Room"
                  :Device.sync="Device"
                  :Food.sync="Food"
                  :Drink.sync="Drink"
                  :Program.sync="Program"
                  :MeetingType.sync="MeetingType"
                />
              </v-card-text>
            </v-card>
          </form>
        </v-dialog>
      </v-row>
    </v-container>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import moment from "moment";
import BookingForm from "./BookingForm.vue";

export default {
  components: { BookingForm },
  data() {
    return {
      itemSearch: {
        start: moment().format("YYYY-MM-DDT08:00"),
        end: moment().format("YYYY-MM-DDT17:00"),
        RoomId: null,
        MeetingTypeId: null,
        StatusId: 1,
      },

      txtSearch: null,
      Booking: [],
      MeetingType: [],
      Program: [],
      Device: [],
      Food: [],
      Drink: [],
      Room: [],
      Status: [],

      headers: [],

      headersAdmin: [
        { text: "ลำดับ", value: "no" },
        { text: "หัวข้อ", value: "name" },
        { text: "ประธาน", value: "chairman" },
        { text: "ผู้จอง", value: "author" },
        { text: "ห้องประชุม", value: "Room.name" },
        { text: "เริ่ม", value: "start" },
        { text: "สิ้นสุด", value: "end" },
        { text: "ประเภท", value: "MeetingType.name" },
        { text: "สถานะ", value: "Status.name" },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],

      headersUser: [
        { text: "ลำดับ", value: "no" },
        { text: "หัวข้อ", value: "name" },
        { text: "ประธาน", value: "chairman" },
        { text: "ผู้จอง", value: "author" },
        { text: "ห้องประชุม", value: "Room.name" },
        { text: "เริ่ม", value: "start" },
        { text: "สิ้นสุด", value: "end" },
        { text: "ประเภท", value: "MeetingType.name" },
        { text: "สถานะ", value: "Status.name" },
      ],

      dialog: false,
      overlay: false,
      dialogConfirm: false,
      editedIndex: -1,

      booking: {
        id: null,
        start: moment().format("YYYY-MM-DDTHH:mm"),
        end: moment().format("YYYY-MM-DDTHH:mm"),
        name: null,
        authorPhoneNumber: null,
        color: null,
        timed: null,
        url: null,
        description: null,
        chairman: null,
        quantity: null,
        meetingId: null,
        meetingPassword: null,
        UserId: null,
        ApproveBy: null,
        MeetingTypeId: 1,
        RoomId: null,
        ProgramId: null,
        StatusId: null,
        Program: null,
        Status: null,
        MeetingType: null,
        Room: null,
        User: null,
        BookingDevice: null,
        BookingFood: null,
        BookingDrink: null,
      },
    };
  },

  computed: {
    formColor() {
      return this.editedIndex === -1 ? "success" : "warning";
    },
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่ม" : "แก้ไข";
    },
    formIcon() {
      return this.editedIndex === -1
        ? "mdi-database-plus"
        : "mdi-database-edit";
    },
    formIconColor() {
      return this.editedIndex === -1 ? "warning" : "success";
    },
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.getBooking();
      }
    },
  },

  created() {
    this.getBooking();

    this.getUser();
    this.getRoom();
    this.getDevice();
    this.getFood();
    this.getDrink();
    this.getMeetingType();
    this.getProgram();
    this.getStatus();
  },
  methods: {
    async editItem(item) {
      console.log("item", item);
      this.editedIndex = item.id;
      this.booking = item;
      this.dialog = true;
    },

    async save() {
      let saveConfirm = await this.saveConfirm();
      let booking = false;

      if (saveConfirm) {
        this.overlay = true;

        if (this.editedIndex > -1) {
          booking = await this.updateBooking();
        } else {
          booking = await this.createBooking();
        }

        if (booking) {
          this.dialog = false;
          await this.getBooking();
          this.overlay = false;
          await this.alertSuccess();
        }
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

    async createBooking() {
      let createBooking = await this.$axios
        .post("/api/booking", {
          data: this.booking,
        })
        .then((res) => {
          // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // console.log("err", err);
          return false;
        });
      return createBooking;
    },

    async updateBooking() {
      let updateBooking = await this.$axios
        .put("/api/booking/" + this.booking.id, {
          data: this.booking,
        })
        .then((res) => {
          // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // console.log("err", err);
          return false;
        });

      return updateBooking;
    },

    async saveConfirm() {
      let saveConfirm = this.$swal
        .fire({
          title: "บันทึก?",
          text: "กดปุ่ม 'ยืนยัน' เพื่อบันทึก",
          type: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        })
        .then(async (res) => {
          return res.value;
        });

      return saveConfirm;
    },

    async addItem() {
      await this.openDialog();
      await this.setItemDefault();
      console.log("editedIndex", this.editedIndex);
    },
    async openDialog() {
      this.dialog = true;
    },
    async closeDailog() {
      this.dialog = false;
    },

    async setItemDefault() {
      this.editedIndex = -1;

      this.booking.id = null;
      this.booking.start = null;
      this.booking.end = null;
      this.booking.name = null;
      this.booking.authorPhoneNumber = null;
      this.booking.color = null;
      this.booking.timed = true;
      this.booking.url = null;
      this.booking.description = null;
      this.booking.chairman = null;
      this.booking.quantity = null;
      this.booking.meetingId = null;
      this.booking.meetingPassword = null;
      this.booking.ApproveBy = null;
      this.booking.MeetingTypeId = 1;
      this.booking.RoomId = null;
      this.booking.ProgramId = null;
      this.booking.StatusId = 1;
      this.booking.BookingDevice = [];
      this.booking.BookingFood = [];
      this.booking.BookingDrink = [];
    },

    async refresh() {
      await this.setItemSearchDefault();
      await this.getBooking();
    },

    async setItemSearchDefault() {
      this.itemSearch.start = moment().format("YYYY-MM-DDT08:00");
      this.itemSearch.end = moment().format("YYYY-MM-DDT17:00");
      this.itemSearch.RoomId = null;
      this.itemSearch.MeetingTypeId = null;
      this.itemSearch.StatusId = 1;
    },

    async getUser() {
      this.User = this.$auth.$storage.getCookie("user");

      if (this.User.Role.id > 1) {
        this.headers = this.headersAdmin;
      } else {
        this.headers = this.headersUser;
      }

      this.booking.UserId = this.User.id;
      // console.log(this.User);
    },

    async getBooking() {
      this.Booking = await this.$axios
        .post("/api/booking/search", {
          data: this.itemSearch,
        })
        .then((res) => {
          res.data.forEach((e) => {
            e["start"] = this.$moment(e.start).format("YYYY-MM-DDTHH:mm");
            e["end"] = this.$moment(e.end).format("YYYY-MM-DDTHH:mm");
          });
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },

    async cancelBooking(item) {
      this.editedIndex = item.id;
      this.booking = item;

      let delateConfirm = await this.cancelConfirm();

      if (delateConfirm) {
        let booking = await this.$axios.put(
          "/api/booking/cancel/" + this.booking.id
        );

        if (booking) {
          this.setItemDefault();
          this.alertSuccess();
          this.getBooking();
        } else {
          this.alertError();
        }
      }
    },
    cancelConfirm() {
      let cancelConfirm = this.$swal
        .fire({
          title: "ยกเลิกข้อมูล ?",
          text: "กดปุ่ม 'ยืนยัน' เพื่อยกเลิกข้อมูล",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        })
        .then(async (res) => {
          return res.value;
        });

      return cancelConfirm;
    },
    async approveBooking(item) {
      this.editedIndex = item.id;
      this.booking = item;

      let approveConfirm = await this.approveConfirm();

      if (approveConfirm) {
        let booking = await this.$axios.put(
          "/api/booking/approve/" + this.booking.id,
          {
            data: {
              ApproveBy: this.User.id,
            },
          }
        );

        if (booking) {
          this.setItemDefault();
          this.alertSuccess();
          this.getBooking();
        } else {
          this.alertError();
        }
      }
    },
    approveConfirm() {
      let approveConfirm = this.$swal
        .fire({
          title: "อนุมัติ ?",
          text: "กดปุ่ม 'ยืนยัน' เพื่ออนุมัติ",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        })
        .then(async (res) => {
          return res.value;
        });

      return approveConfirm;
    },

    async getMeetingType() {
      this.MeetingType = await this.$axios
        .get("/api/meetingType")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
    async getStatus() {
      this.Status = await this.$axios
        .get("/api/status")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
    async getDrink() {
      this.Drink = await this.$axios
        .get("/api/drink")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
    async getFood() {
      this.Food = await this.$axios
        .get("/api/food")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
    async getDevice() {
      this.Device = await this.$axios
        .get("/api/device")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
    async getRoom() {
      this.Room = await this.$axios
        .get("/api/room")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
    async getProgram() {
      this.Program = await this.$axios
        .get("/api/program")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
  },
};
</script>
