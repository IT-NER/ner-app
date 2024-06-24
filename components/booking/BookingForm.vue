<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div class="display-1">กำหนดการ</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            type="datetime-local"
            label="เริ่ม"
            v-model="booking.start"
            required
            @change="booking.end = booking.start"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            type="datetime-local"
            label="สิ้นสุด"
            v-model="booking.end"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <hr />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="display-1">สถานที่</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3" sm="12" v-for="(item, i) in Room" :key="i">
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

      <v-row>
        <v-col>
          <hr />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="display-1">รายละเอียดการประชุม</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
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
        <v-col cols="12" md="6">
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
        <v-col cols="12" md="3">
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

        <v-col cols="12" md="3">
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
            @change="setOnlineDefault"
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
            :items="Program"
            item-text="name"
            item-value="id"
            hide-details
            outlined
            dense
            v-model="booking.ProgramId"
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
      <v-row>
        <v-col cols="12">
          <v-textarea
            label="ข้อมูลติดต่อ"
            prepend-inner-icon="mdi-phone"
            hide-details
            outlined
            dense
            required
            v-model="booking.authorContact"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <hr />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="display-1">อุปกรณ์ / อาหาร / เครื่องดื่ม</div>
        </v-col>
      </v-row>
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

      <v-row>
        <v-col>
          <hr />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="display-1">หมายเหตุ</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
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
  </div>
</template>

<script>
export default {
  props: [
    "booking",
    "Room",
    "Device",
    "Food",
    "Drink",
    "Program",
    "MeetingType",
  ],

  data() {
    return {};
  },

  methods: {
    async setOnlineDefault(e) {
      if (e == 1) {
        this.booking.ProgramId = null;
        this.booking.meetingId = null;
        this.booking.meetingPassword = null;
        this.booking.url = null;
      } else if (e == 2) {
        this.booking.ProgramId = 1;
        this.booking.meetingId = null;
        this.booking.meetingPassword = null;
        this.booking.url = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
