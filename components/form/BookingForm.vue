<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" lg="6">
          <v-card hover>
            <v-toolbar dense :color="formColor" dark>
              <v-icon class="mr-3">mdi-calendar-clock</v-icon>
              กำหนดการประชุม
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="เริ่ม"
                      type="datetime-local"
                      v-model="booking.start"
                      outlined
                      dense
                      hide-details
                      required
                      :disabled="allDay"
                      @change="booking.end = booking.start"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="ถึง"
                      type="datetime-local"
                      v-model="booking.end"
                      outlined
                      dense
                      hide-details
                      required
                      :disabled="allDay"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card hover>
            <v-toolbar dense :color="formColor" dark>
              <v-icon class="mr-3">mdi-map-marker</v-icon>
              ห้องประชุม
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    lg="6"
                    md="4"
                    sm="6"
                    xs="6"
                    v-for="(item, i) in Room"
                    :key="i"
                  >
                    <v-checkbox
                      v-model="booking.RoomId"
                      :label="item.name + `  (${item.quantity}  ที่นั่ง)`"
                      :color="item.color"
                      :value="item.id"
                      hide-details
                      dense
                      :disabled="!booking.start"
                      :required="!booking.RoomId"
                      @change="booking.color = item.color"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card hover>
            <v-toolbar dense :color="formColor" dark>
              <v-icon class="mr-3">mdi-image-text</v-icon>
              รายละเอียดการประชุม
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="12" sm="12" xs="12">
                    <v-text-field
                      label="หัวข้อ"
                      prepend-inner-icon="mdi-star"
                      hide-details
                      outlined
                      dense
                      required
                      v-model="booking.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="9" sm="8" xs="12">
                    <v-text-field
                      label="ประธาน"
                      prepend-inner-icon="mdi-account-star"
                      hide-details
                      outlined
                      dense
                      required
                      v-model="booking.chairman"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4" xs="12">
                    <v-text-field
                      label="จำนวนผู้เข้าร่วม"
                      prepend-inner-icon="mdi-account-group"
                      type="number"
                      hide-details
                      outlined
                      dense
                      required
                      v-model="booking.quantity"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6" xs="12">
                    <v-select
                      label="ประเภท"
                      prepend-inner-icon="mdi-list-box"
                      :items="MeetingType"
                      item-text="name"
                      item-value="id"
                      hide-details
                      outlined
                      dense
                      required
                      v-model="booking.MeetingTypeId"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    sm="6"
                    xs="12"
                    v-if="booking.MeetingTypeId == 2"
                  >
                    <v-select
                      label="โปรแกรม"
                      prepend-inner-icon="mdi-devices"
                      v-model="booking.ProgramId"
                      :items="Program"
                      item-text="name"
                      value="id"
                      hide-details
                      outlined
                      dense
                      chips
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row v-if="booking.MeetingTypeId == 2">
                  <v-col cols="12">
                    <v-text-field
                      label="ID"
                      prepend-inner-icon="mdi-identifier"
                      hide-details
                      outlined
                      dense
                      :required="booking.MeetingTypeId == 2"
                      v-model="booking.meetingId"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="PASSWORD"
                      prepend-inner-icon="mdi-lock"
                      hide-details
                      outlined
                      dense
                      :required="booking.MeetingTypeId == 2"
                      v-model="booking.meetingPassword"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12" xs="12">
                    <v-text-field
                      label="URL"
                      prepend-inner-icon="mdi-link"
                      hide-details
                      outlined
                      dense
                      :required="booking.MeetingTypeId == 2"
                      v-model="booking.url"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card hover>
            <v-toolbar dense :color="formColor" dark>
              <v-icon class="mr-1">mdi-devices</v-icon>
              <v-icon class="mr-1">mdi-silverware-clean</v-icon>
              <v-icon class="mr-1">mdi-coffee-outline</v-icon>
              | อุปกรณ์ / อาหาร / เครื่องดื่ม
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      label="อุปกรณ์"
                      prepend-inner-icon="mdi-devices"
                      v-model="booking.BookingDevice"
                      :items="Device"
                      item-text="name"
                      item-value="id"
                      hide-details
                      outlined
                      dense
                      chips
                      multiple
                      clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="อาหาร"
                      prepend-inner-icon="mdi-silverware-clean"
                      v-model="booking.BookingFood"
                      :items="Food"
                      item-text="name"
                      item-value="id"
                      hide-details
                      outlined
                      dense
                      chips
                      multiple
                      clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="เครื่องดื่ม"
                      prepend-inner-icon="mdi-coffee-outline"
                      v-model="booking.BookingDrink"
                      :items="Drink"
                      item-text="name"
                      item-value="id"
                      hide-details
                      outlined
                      dense
                      chips
                      multiple
                      clearable
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
         <v-col cols="12">
          <v-card hover>
            <v-toolbar dense :color="formColor" dark>
              <v-icon class="mr-3">mdi-note-alert</v-icon>
              หมายเหตุ
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" >
                    <v-textarea
                      label="หมายเหตุ"
                      prepend-inner-icon="mdi-notebook-edit"
                      hide-details
                      outlined
                      dense
                      v-model="booking.description"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
export default {
  props: ["booking", "editedIndex"],

  data() {
    return {
      allDay: false,
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
      },

      events: [],
      eventsDay: [],

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

      bookings: [],
    };
  },

  created() {
    this.getUser();
    this.getRoom();
    this.getProgram();
    this.getDevice();
    this.getFood();
    this.getDrink();
    this.getStatus();
    this.getMeetingType();
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

  methods: {
    async setOnlineDefault() {
      if (this.booking.MeetingTypeId == 1) {
        this.booking.meetingId = null;
        this.booking.meetingPassword = null;
        this.booking.url = null;
      }

      if (this.booking.MeetingTypeId == 2) {
        this.$nextTick(() => {
          this.$refs.meetingId.focus();
        });
      }
    },

    async getUser() {
      this.User = this.$auth.$storage.getCookie("user");
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

<style lang="scss" scoped></style>
