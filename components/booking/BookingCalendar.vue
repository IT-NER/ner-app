<template>
  <div>
    <v-dialog v-model="dialog" persistent scrollable>
      <form @submit.prevent="saveConfirm">
        <v-card>
          <v-toolbar dense :color="formColor" dark elevation="0">
            <v-icon>
              {{ formIcon }}
            </v-icon>

            <span class="ml-2">
              <h3 class="title">
                {{ formTitle }}
              </h3>
            </span>
            <v-spacer></v-spacer>
            <v-icon @click="closeDialog">mdi-close</v-icon>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <booking-form :booking.sync="booking" :editedIndex="editedIndex" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="formColor" dark type="submit">
              <v-icon>mdi-content-save</v-icon>
              <span class="ml-2"> บันทึก </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" max-width="290" persistent>
      <v-card>
        <v-card-title class="text-h5">
          บันทึกข้อมูล ?
          <v-spacer></v-spacer>
          <v-icon @click="closeDialogConfirm">mdi-close</v-icon>
        </v-card-title>

        <v-card-text> กดปุ่ม 'ยืนยัน' เพื่อบันทึกข้อมูล </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn ref="btnConfirm" color="success" @click="save"> ยืนยัน </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogView"
      width="auto"
      scrollable
      transition="dialog-transition"
    >
      <v-card flat>
        <v-toolbar elevation="0" :color="booking.color" dark>
          <v-icon x-large dark> mdi-eye </v-icon>
          <span class="ml-2">
            <h3 class="title">
              {{ booking.name }}
            </h3>
          </span>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-actions>
          <booking-view class="mx-auto" :booking.sync="booking" />
        </v-card-actions>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <v-card>
                <v-toolbar dense dark :color="booking.color">
                  อุปกรณ์
                </v-toolbar>
                <v-card-actions>
                  <booking-lists-device
                    :BookingDevice.sync="booking.BookingDevice"
                  />
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-card>
                <v-toolbar dense dark :color="booking.color"> อาหาร </v-toolbar>
                <v-card-actions>
                  <booking-lists-food :BookingFood.sync="booking.BookingFood" />
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-card>
                <v-toolbar dense dark :color="booking.color">
                  เครื่องดื่ม
                </v-toolbar>
                <v-card-actions>
                  <booking-lists-drink
                    :BookingDrink.sync="booking.BookingDrink"
                  />
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-sheet height="64">
      <v-toolbar elevation="0" flat>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="primary" v-bind="attrs" v-on="on">
              <small>{{ typeToLabel[type] }}</small>
              <v-icon right> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>
                <small> Day </small>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>
                <small> Week </small>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>
                <small> Month </small>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>
                <small> 4 days </small>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn outlined color="primary" @click="setToday">
          <small> Today </small>
        </v-btn>
        <v-btn class="ml-3" outlined color="success" @click="addItem">
          <v-icon small> mdi-calendar-plus </v-icon>
          <small> NEW </small>
        </v-btn>
      </v-toolbar>
    </v-sheet>

    <v-sheet height="64">
      <v-toolbar elevation="0" flat>
        <v-spacer></v-spacer>
        <v-toolbar-title v-if="$refs.calendar">
          <h3 class="title">{{ $refs.calendar.title }}</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn fab outlined small color="success" @click="prev">
          <v-icon small> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn class="ml-3" fab outlined small color="success" @click="next">
          <v-icon small> mdi-chevron-right </v-icon>
        </v-btn>
      </v-toolbar>
    </v-sheet>

    <!-- calendar -->
    <v-sheet class="ma-3">
      <v-calendar
        locale="th"
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="events"
        :event-color="getEventColor"
        :type="type"
        event-overlap-mode="column"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>

    <!-- listDay -->
    <booking-list-day class="my-5" :events="eventsDay" />
  </div>
</template>

<script>
import BookingForm from "~/components/form/BookingForm.vue";
import BookingListDay from "./BookingListDay.vue";
import BookingListsDevice from "./BookingListsDevice.vue";
import BookingListsDrink from "./BookingListsDrink.vue";
import BookingListsFood from "./BookingListsFood.vue";
import BookingView from "./BookingView.vue";

export default {
  components: {
    BookingView,
    BookingListDay,
    BookingForm,
    BookingListsDevice,
    BookingListsFood,
    BookingListsDrink,
  },
  data() {
    return {
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
      },

      events: [],
      eventsDay: [],

      booking: {
        id: null,
        start: null,
        end: null,
        name: null,
        color: null,
        timed: true,
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
      editedIndex: -1,

      overlay: false,
      dialog: false,
      dialogConfirm: false,
      dialogView: false,

      Program: null,
      Status: null,
      MeetingType: null,
      Room: null,
      User: null,
      Device: null,
      Food: null,
      Drink: null,
      User: null,
    };
  },

  async mounted() {
    this.$refs.calendar.checkChange();
  },

  async created() {
    await this.getEvents();
    await this.getUser();
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

  watch: {
    focus(val) {
      if (!val) {
        this.getEvents();
      }
    },
  },

  methods: {
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

    async getEvents() {
      let events = await this.$axios
        .get("/api/booking")
        .then(async (res) => {
          // console.log("res", res.data);

          const result = await res.data.filter((e) => e.StatusId == 2);

          await result.forEach((item) => {
            item["start"] = this.$moment(item.start).format("YYYY-MM-DDThh:mm");
            item["end"] = this.$moment(item.end).format("YYYY-MM-DDThh:mm");
          });

          return result;
        })
        .catch((err) => {
          // console.log("err", err);
        });

      this.events = await events;
      await this.getEventsDay();
      await this.setItemDefault();
    },

    async getEventsDay() {
      let focus = this.focus;
      if (focus == "") {
        focus = new Date(Date.now()).getDate();
      } else {
        focus = new Date(this.focus).getDate();
      }
      let result = this.events.filter(
        (item) => new Date(item.start).getDate() == focus
      );

      this.eventsDay = result;
    },

    async showEvent({ event }) {
      // console.log("event", event);

      this.editedIndex = event.id;
      this.booking = await event;
      // console.log(this.editedIndex);
      this.getBookingById();
      await this.openDialogView();
    },

    async editItem() {
      // console.log("booking", this.booking);
      await this.closeDialogView();
      await this.openDialog();
    },

    async saveConfirm() {
      // console.log("booking", this.booking);
      this.openDialogConfirm();
    },

    async save() {
      await this.closeDialogConfirm();
      await this.closeDialog();
      await this.openOverlay();

      let booking = null;
      if (this.editedIndex == -1) {
        booking = await this.create();
      } else {
        booking = await this.update();
      }
      if (booking) {
        await this.closeOverlay();
        await this.alertSuccess();
        await this.getEvents();
      } else {
        await this.closeOverlay();
        await this.aleartError();
        await this.getEvents();
      }
    },

    async create() {
      let booking = await this.$axios
        .post("/api/booking", {
          data: this.booking,
        })
        .then((res) => {
          // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // console.log("err", err);
          this.aleartError();
          return;
        });

      return booking;
    },

    async update() {
      let booking = await this.$axios
        .put("/api/booking/" + this.booking.id, {
          data: this.booking,
        })
        .then((res) => {
          // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // console.log("err", err);
        });

      return booking;
    },

    async addItem() {
      await this.setItemDefault();
      await this.openDialog();
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
      this.booking.timed = true;
      this.booking.name = null;
      this.booking.quantity = null;
      this.booking.chairman = null;
      this.booking.StatusId = 1;
    },

    async openOverlay() {
      this.overlay = true;
    },
    async closeOverlay() {
      this.overlay = false;
    },

    async openDialog() {
      this.dialog = true;
    },
    async closeDialog() {
      this.dialog = false;
    },
    async openDialogView() {
      this.dialogView = true;
    },
    async closeDialogView() {
      this.dialogView = false;
    },
    async openDialogConfirm() {
      this.dialogConfirm = true;
    },
    async closeDialogConfirm() {
      this.dialogConfirm = false;
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
      this.getEvents();
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },

    async getBookingById() {
      this.booking = await this.$axios
        .get("/api/booking/" + this.editedIndex)
        .then(async (res) => {
          // res.data.start = this.$moment(item.start).format("YYYY-MM-DDThh:mm");
          // res.data.end = this.$moment(item.end).format("YYYY-MM-DDThh:mm");

          // console.log(this.$moment(res.data.start).format("YYYY-MM-DDTHH:MM"));
          res.data.start = await this.$moment(res.data.start).format(
            "YYYY-MM-DDTHH:MM"
          );
          res.data.end = await this.$moment(res.data.end).format(
            "YYYY-MM-DDTHH:MM"
          );
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },

    async getUser() {
      this.User = this.$auth.$storage.getCookie("user");
      this.booking.UserId = this.User.id;
      // console.log(this.User);
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