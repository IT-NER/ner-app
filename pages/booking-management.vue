<template>
  <div>
    <v-container>
      <form @submit.prevent="search">
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
            <v-container>
              <v-row>
                <v-col cols="12" md="3" sm="12">
                  <v-text-field
                    label="เริ่ม"
                    type="datetime-local"
                    v-model="itemSearch.start"
                    hide-details
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="12">
                  <v-text-field
                    label="สิ้นสุด"
                    type="datetime-local"
                    v-model="itemSearch.end"
                    hide-details
                    clearable
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
                    v-model="itemSearch.roomId"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="12">
                  <v-select
                    :items="MeetingType"
                    item-text="name"
                    item-value="id"
                    label="ประเภท"
                    v-model="itemSearch.meetingTypeId"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="12">
                  <v-select
                    :items="Status"
                    item-text="name"
                    item-value="id"
                    label="สถานะ"
                    v-model="itemSearch.statusId"
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
          <v-text-field label="ค้นหา" v-model="txtSearch"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="addItem">
            <v-icon class="mr-2"> mdi-plus </v-icon>
            เพิ่มข้อมูล
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
                  :MeetingType="MeetingType"
                />
              </v-card-text>
            </v-card>
          </form>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import BookingForm from "~/components/booking/BookingForm.vue";

export default {
  components: { BookingForm },
  data() {
    return {
      itemSearch: {
        start: moment().format("YYYY-MM-DD HH:mm"),
        end: moment().format("YYYY-MM-DD HH:mm"),
        roomId: null,
        meetingTypeId: null,
        statusId: null,
      },
      txtSearch: null,
      Booking: [],
      Room: [],
      MeetingType: [],
      Status: [],
      Program: [],
      Device: [],
      Food: [],
      Drink: [],

      headers: [
        { text: "ลำดับ", value: "no" },
        { text: "หัวข้อ", value: "name" },
        { text: "ประธาน", value: "chairman" },
        { text: "ผู้จอง", value: "author" },
        { text: "ห้องประชุม", value: "Room.name" },
        { text: "เริ่ม", value: "start" },
        { text: "สิ้นสุด", value: "end" },
        { text: "ประเภท", value: "MeetingType.name" },
        { text: "สถานะ", value: "Status.name" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],

      dialog: false,
      dialogConfirm: false,
      editedIndex: -1,

      booking: {
        id: null,
        start: moment().format("YYYY-MM-DDTHH:mm"),
        end: moment().format("YYYY-MM-DDTHH:mm"),
        name: null,
        authorContact: null,
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
      return this.editedIndex === -1 ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล";
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

  created() {
    this.getBooking();
    this.getStatus();
    this.getMeetingType();
    this.getRoom();
    this.getDevice();
    this.getFood();
    this.getDrink();
    this.getProgram();
    this.getUser();
  },
  methods: {
    async editItem(item) {
      console.log("item", item);
      this.editedIndex = item.id;
      this.booking = item;
      this.dialog = true;
    },

    async save() {
      console.log("booking", this.booking);
    },

    async addItem() {
      this.dialog = true;
    },

    async refresh() {},
    async search() {
      console.log("itemSearch", this.itemSearch);
    },

    async getUser() {
      this.User = this.$auth.$storage.getCookie("user");
      this.booking.UserId = this.User.id;
      // console.log(this.User);
    },

    async getBooking() {
      this.Booking = await this.$axios
        .get("/api/booking")
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
