<template>
  <div>
    <v-dialog v-model="dialog" scrollable persistent over-flow="auto">
      <form @submit.prevent="save">
        <v-card>
          <v-toolbar elevation="0" :color="formColor" dark dense>
            <span>
              <v-icon x-large>{{ iconTitle }}</v-icon>
            </span>
            <span class="mr-3">{{ formTitle }}</span>
            <v-spacer></v-spacer>
            <v-icon @click="closeDailog">mdi-close</v-icon>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <booking-form
              :booking.sync="editedItem"
              :editedIndex="editedIndex"
            />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="formColor" type="submit">
              <v-icon>mdi-content-save</v-icon>
              <span> บันทึก </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <v-card flat>
      <v-card-title color="success" dark dense elevation="0">
        กรองข้อมูล
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              label="ค้นหา"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="เริ่ม"
              type="date"
              hide-details
              dense
              outlined
              clearable
              v-model="filter.start"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="สิ้นสุด"
              type="date"
              hide-details
              dense
              outlined
              clearable
              v-model="filter.end"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-select
              label="ห้องประชุม"
              prepend-icon="mdi-map-marker"
              :items="Room"
              item-text="name"
              item-value="id"
              hide-details
              outlined
              dense
              clearable
              required
              v-model="filter.RoomId"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-select
              label="ประเภท"
              prepend-icon="mdi-list-box"
              :items="MeetingType"
              item-text="name"
              item-value="id"
              hide-details
              outlined
              dense
              clearable
              required
              v-model="filter.MeetingTypeId"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-select
              label="สถานะ"
              prepend-icon="mdi-list-status"
              :items="Status"
              item-text="name"
              item-value="id"
              hide-details
              outlined
              dense
              clearable
              required
              v-model="filter.StatusId"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-btn color="primary" @click="setFilterDefualt">
              <v-icon class="mr-3">mdi-refresh</v-icon>
              Refresh
            </v-btn>
            <v-btn color="success" class="float-right" @click="multiSearch">
              <v-icon>mdi-magnify</v-icon>
              ค้นหา
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>

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
            <v-container fluid>
              <v-row>
                <v-col cols="12" lg="4" md="6" sm="12">
                  <v-btn color="warning" small @click="editItem(item)">
                    <v-icon class="mr-auto"> mdi-database-edit </v-icon>
                    <small>แก้ไข</small>
                  </v-btn>
                </v-col>
                <v-col cols="12" lg="4" md="6" sm="12">
                  <v-btn
                    :disabled="item.StatusId == 2"
                    color="success"
                    small
                    @click="approveBooking(item)"
                  >
                    <v-icon class="mr-auto"> mdi-database-check </v-icon>
                    <small>อนุมัติ</small>
                  </v-btn>
                </v-col>
                <v-col cols="12" lg="4" md="6" sm="12">
                  <v-btn
                    v-if="item.StatusId < 3"
                    color="error"
                    small
                    @click="cancelBooking(item)"
                  >
                    <v-icon class="mr-auto"> mdi-database-minus </v-icon>
                    <small>ยกเลิก</small>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
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
    headers: [],

    headersUser: [
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

    headersAdmin: [
      { text: "ลำดับ", value: "index" },
      { text: "หัวข้อ", value: "name" },
      { text: "ประธาน", value: "chairman" },
      { text: "ผู้จอง", value: "userBooking" },
      { text: "ห้องประชุม", value: "Room.name" },
      { text: "เริ่ม", value: "start" },
      { text: "สิ้นสุด", value: "end" },
      { text: "ประเภท", value: "MeetingType.name" },
      { text: "สถานะ", value: "Status.name" },
      { text: "ACTIONS", value: "actions", sortable: false },
    ],
    bookings: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      start: null,
      end: null,
      name: null,
      color: null,
      timed: false,
      allDay: false,
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

    filter: {
      start: null,
      end: null,
      RoomId: null,
      MeetingTypeId: null,
      StatusId: null,
    },

    User: null,
    MeetingType: null,
    Status: null,
    Room: null,
  }),

  computed: {
    formColor() {
      return this.editedIndex === -1 ? "success" : "warning";
    },
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่ม" : "แก้ไข";
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
    await this.setFilterDefualt();
    await this.getBooking();
    await this.getUser();
    await this.getMeetingType();
    await this.getStatus();
    await this.getRoom();
  },

  methods: {
    async multiSearch() {
      await this.getBooking();
      let bookings = this.bookings;

      console.log(this.filter);

      if (this.filter.start != null && this.filter.end != null) {
        bookings = this.bookings.filter((e) => {
          let dateStart = new Date(e.start).getDate();
          let dateEnd = new Date(e.end).getDate();
          let start = new Date(this.filter.start).getDate();
          let end = new Date(this.filter.end).getDate();

          return dateStart >= start && dateEnd <= end;
        });
      }

      if (this.filter.RoomId) {
        bookings = bookings.filter((item) => {
          return item.RoomId == this.filter.RoomId;
        });
      }

      if (this.filter.MeetingTypeId) {
        bookings = bookings.filter((item) => {
          return item.MeetingTypeId == this.filter.MeetingTypeId;
        });
      }

      if (this.filter.StatusId) {
        bookings = bookings.filter((item) => {
          return item.StatusId == this.filter.StatusId;
        });
      }

      // console.log("bookings", bookings);

      this.bookings = bookings;
    },

    async setFilterDefualt() {
      let filterDefualt = {
        start: null,
        end: null,
        RoomId: null,
        MeetingTypeId: null,
        StatusId: null,
      };

      this.filter = filterDefualt;

      this.getBooking();
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

    async getBooking() {
      this.bookings = await this.$axios
        .get("/api/booking")
        .then((res) => {
          // console.log("res", res.data);

          res.data.forEach((item) => {
            item["start"] = this.$moment(item.start).format("YYYY-MM-DDThh:mm");
            item["end"] = this.$moment(item.end).format("YYYY-MM-DDThh:mm");
          });
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },

    async addItem() {
      this.setItemDefault();
      this.openDialog();
    },

    async getUser() {
      this.User = this.$auth.$storage.getCookie("user");
      this.editedItem.UserId = await this.User.id;
      if (this.User.Role.id >= 2) {
        this.headers = this.headersAdmin;
      } else {
        this.headers = this.headersUser;
      }
    },

    async setItemDefault() {
      this.editedIndex = -1;
      this.editedItem.id = null;
      this.editedItem.start = null;
      this.editedItem.end = null;
      this.editedItem.color = null;
      this.editedItem.MeetingTypeId = 1;
      this.editedItem.ProgramId = null;
      this.editedItem.RoomId = null;
      this.editedItem.BookingDevice = null;
      this.editedItem.BookingFood = null;
      this.editedItem.BookingDrink = null;
      this.editedItem.url = null;
      this.editedItem.meetingId = null;
      this.editedItem.meetingPassword = null;
      this.editedItem.description = null;
      this.editedItem.timed = false;
      this.editedItem.allDay = false;
      this.editedItem.name = null;
      this.editedItem.quantity = null;
      this.editedItem.chairman = null;
      this.editedItem.StatusId = 1;
    },

    async editItem(item) {
      this.editedIndex = this.bookings.indexOf(item);
      this.editedItem = await Object.assign({}, item);
      this.openDialog();
    },

    async cancelBooking(item) {
      this.editedIndex = this.bookings.indexOf(item);
      this.editedItem = Object.assign({}, item);

      let delateConfirm = await this.cancelConfirm();

      if (delateConfirm) {
        let booking = await this.$axios.put(
          "/api/booking/cancel/" + this.editedItem.id
        );

        if (booking) {
          this.setItemDefault();
          this.alertSuccess();
          this.getBooking();
        } else {
          this.alertError();
        }
      } else {
        this.setItemDefault();
      }
    },

    async cancelConfirm() {
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
      this.editedIndex = this.bookings.indexOf(item);
      this.editedItem = Object.assign({}, item);

      let approveConfirm = await this.approveConfirm();

      if (approveConfirm) {
        let booking = await this.$axios.put(
          "/api/booking/approve/" + this.editedItem.id,
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
      } else {
        this.setItemDefault();
      }
    },

    async approveConfirm() {
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
          data: this.editedItem,
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
        .put("/api/booking/" + this.editedItem.id, {
          data: this.editedItem,
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
  },
};
</script>

<style lang="scss" scoped></style>
