<template>
  <div>
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
          <v-divider></v-divider>
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
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="formColor" type="submit">
              <v-icon>mdi-content-save</v-icon>
              <span> บันทึกข้อมูล </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <v-card flat>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="bookings"
          :search="search"
          :items-per-page="-1"
          :sort-by="['id']"
          :sort-desc="[true]"
          class="elevation-1"
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
          <template v-slot:item.actions="{ item }">
            <v-row>
              <v-col cols="12" lg="4" md="6" sm="12">
                <v-btn
                  v-if="item.StatusId == 1"
                  color="warning"
                  small
                  @click="editItem(item)"
                >
                  <v-icon class="mr-auto"> mdi-database-edit </v-icon>
                  <small>แก้ไข</small>
                </v-btn></v-col
              >
              <v-col cols="12" lg="4" md="6" sm="12">
                <v-btn
                  v-if="item.StatusId == 1"
                  color="error"
                  small
                  @click="cancelBooking(item)"
                >
                  <v-icon class="mr-auto"> mdi-database-minus </v-icon>
                  <small>ยกเลิก</small>
                </v-btn></v-col
              >
            </v-row>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import BookingForm from "./BookingForm.vue";
export default {
  components: { BookingForm },
  data: () => ({
    search: "",
    Overlay: false,
    title: "โปรแกรม",
    dialog: false,

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
      { text: "Actions", value: "actions", sortable: false },
    ],

    bookings: [],
    editedIndex: -1,
    booking: {
      id: null,
      start: null,
      end: null,
      name: null,
      color: null,
      timed: false,
      url: null,
      description: null,
      chairman: null,
      quantity: null,
      meetingId: null,
      meetingPassword: null,
      UserId: null,
      ApproveBy: null,
      MeetingTypeId: null,
      RoomId: null,
      ProgramId: null,
      StatusId: null,
      Program: [],
      Status: [],
      MeetingType: [],
      Room: [],
      User: [],
      BookingDevice: [],
      BookingFood: [],
      BookingDrink: [],
    },

    User: null,
    Status: null,
    Program: null,
    MeetingType: null,
    Room: null,
    User: null,
    Device: null,
    Food: null,
    Drink: null,
  }),

  computed: {
    formColor() {
      return this.editedIndex === -1 ? "success" : "warning";
    },
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล";
    },
    iconTitle() {
      return this.editedIndex === -1
        ? "mdi-database-plus"
        : "mdi-database-edit";
    },
  },

  watch: {
    dialog(val) {
      val || this.closeDailog();
    },
  },

  async created() {
    await this.getUser();

    await this.getBooking();
    await this.getRoom();
    await this.getDevice();
    await this.getFood();
    await this.getDrink();
    await this.getMeetingType();
    await this.getProgram();
  },

  methods: {
    async getBooking() {
      this.bookings = await this.$axios
        .get("/api/booking/user/" + this.User.id)
        .then((res) => {
          // console.log("res", res.data);

          res.data.forEach((item) => {
            item["start"] = this.$moment(item.start).format("YYYY-MM-DDTHH:mm");
            item["end"] = this.$moment(item.end).format("YYYY-MM-DDTHH:mm");
          });
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });

      // const result = bookings.filter((item) => item.UserId == this.User.id);
      // // console.log("result", result);

      // this.bookings = result;
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

    async addItem() {
      // this.$nextTick(() => {
      this.setItemDefault();
      this.openDialog();
      // });
    },
    async getUser() {
      this.User = this.$auth.$storage.getCookie("user");
      this.booking.UserId = await this.User.id;
      // console.log(this.User);
    },
    async setItemDefault() {
      this.editedIndex = -1;

      this.booking.id = null;
      this.booking.start = null;
      this.booking.end = null;
      this.booking.color = null;
      this.booking.MeetingTypeId = 1;
      this.booking.ProgramId = null;
      this.booking.RoomId = null;
      this.booking.BookingDevice = null;
      this.booking.BookingFood = null;
      this.booking.BookingDrink = null;
      this.booking.url = null;
      this.booking.meetingId = null;
      this.booking.meetingPassword = null;
      this.booking.description = null;
      this.booking.timed = false;
      this.booking.allDay = false;
      this.booking.name = null;
      this.booking.quantity = null;
      this.booking.chairman = null;
      this.booking.StatusId = 1;
    },

    async editItem(item) {
      this.editedIndex = item.id;
      this.booking = await Object.assign({}, item);
      this.openDialog();
    },

    async cancelBooking(item) {
      this.editedIndex = item.id;
      this.booking = Object.assign({}, item);

      let delateConfirm = await this.deleteConfirm();

      if (delateConfirm) {
        let booking = await this.$axios.put(
          "/api/booking/cancel/" + this.booking.id
        );

        if (booking) {
          this.setItemDefault();
          this.alertSuccess();
          this.getBooking();
        } else {
          this.aleartError();
        }
      } else {
        this.setItemDefault();
      }
    },

    deleteConfirm() {
      let deleteConfirm = this.$swal
        .fire({
          title: "ลบข้อมูล ?",
          text: "กดปุ่ม 'ยืนยัน' เพื่อลบข้อมูล",
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

      return deleteConfirm;
    },

    async openDialog() {
      this.dialog = true;
    },

    async closeDailog() {
      this.setItemDefault();
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    async aleartError() {
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
        title: "บันทึกข้อมูล เรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async opensOverlay() {
      this.overlay = true;
    },
    async closeOverlay() {
      this.overlay = false;
    },

    async save(e) {
      let saveConfirm = await this.saveConfirm();
      let booking = false;

      if (saveConfirm) {
        this.opensOverlay();

        if (this.editedIndex > -1) {
          booking = await this.updateBooking();
        } else {
          booking = await this.createBooking();
        }

        if (booking) {
          await this.closeOverlay();
          await this.closeDailog();
          await this.getBooking();
          await this.alertSuccess();
        }
      }
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
          title: "บันทึกข้อมูล?",
          text: "กดปุ่ม 'ยืนยัน' เพื่อบันทึกข้อมูล",
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
  },
};
</script>

<style lang="scss" scoped></style>
