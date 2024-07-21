<template>
  <div>
    <!-- CardBookingCalendar -->
    <card-booking-calendar
      :items.sync="items"
      :item.sync="item"
      @getItems="getItems"
      @addItem="addItem"
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
              :itemsBookingStatus.sync="itemsBookingStatus"
              :itemsDevice.sync="itemsDevice"
              :itemsFood.sync="itemsFood"
              :itemsDrink.sync="itemsDrink"
              :itemsRoomNotReserved.sync="itemsRoomNotReserved"
              @getItemsRoom="getItemsRoom"
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
import CardBookingCalendar from "~/components/card/CardBookingCalendar.vue";
import FormBookingCrud from "~/components/form/FormBookingCrud.vue";
export default {
  components: { CardBookingCalendar, FormBookingCrud },
  data() {
    return {
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

      itemsRoom: [],
      itemsMeetingType: [],
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
      await this.setDateTime();
      console.log("item", this.item);
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
        meetingTypeId: null,
        programId: null,
        roomId: null,
        statusId: null,
        userId: null,

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
    async main() {
      this.items = await this.getItems();
    },
    async getItems() {
      let items = await this.$axios
        .get("/api/booking")
        .then((res) => {
          res.data.forEach((item) => {
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
            data: item,
          })
          .then((res) => {
            console.log("itemsRoomNotReserved", res.data);
            return res.data;
          })
          .catch((err) => {
            return [];
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
