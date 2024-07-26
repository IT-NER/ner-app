<template>
  <div>
    <v-divider></v-divider>
    <v-card flat height="800">
      <v-card-title> รายการจองห้องประชุม (ประจำวัน) </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="items.length > 0">
        <v-data-table
          :items-per-page="-1"
          :headers="headers"
          :items="items"
          class="elevation-0"
          hide-default-footer
        >
          <template v-slot:item.no="{ item, index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.name="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:item.author="{ item }">
            {{ item.User.fname }} {{ item.User.lname }}
          </template>
          <template v-slot:item.room="{ item }">
            <v-chip label :color="item.Room.color" dark>
              {{ item.Room.name }}
            </v-chip>
          </template>
          <template v-slot:item.start="{ item }">
            {{ $moment(item.start).format("lll") }}
          </template>
          <template v-slot:item.end="{ item }">
            {{ $moment(item.end).format("lll") }}
          </template>
          <template v-slot:item.type="{ item }">
            <v-chip label color="success" dark v-if="item.meetingTypeId > 1">
              {{ item.MeetingType.name }}
            </v-chip>
            <v-chip label color="error" dark v-else>
              {{ item.MeetingType.name }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-text v-if="items.length == 0">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          ไม่มีรายการจอง
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["focus"],

  data() {
    return {
      items: [],
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
      ],
    };
  },

  watch: {
    focus(val) {
      // if (val) {
      this.main();
      // }
    },
  },
  created() {
    this.main();
  },

  methods: {
    async main() {
      this.items = await this.getItems();
    },

    async getItems() {
      let items = await this.$axios
        .post("/api/booking/date", {
          data: this.focus,
        })
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
