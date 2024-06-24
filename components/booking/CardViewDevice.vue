<template>
  <div>
    <v-card>
      <v-toolbar dense :color="booking.color" dark elevation="0">
        อุปกรณ์
      </v-toolbar>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr v-if="items.length > 0">
              <th class="text-left">ลำดับ</th>
              <th class="text-left">รายการ</th>
            </tr>
          </thead>
          <tbody v-if="items.length > 0">
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="2" class="text-center">ไม่มีรายการ</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["booking"],

  data() {
    return {
      headers: [
        { text: "ลำดับ", value: "no", sortable: false },
        { text: "รายงาน", value: "name", sortable: false },
      ],

      devices: [],
      items: [],
    };
  },

  watch: {
    async booking(val) {
      await this.getDevice();
      await this.mapDeveice();
    },
  },

  methods: {
    async getDevice() {
      this.devices = await this.$axios
        .get("/api/device")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },

    async mapDeveice() {
      this.items = [];

      console.log("this.booking.BookingDevice", this.booking.BookingDevice);
      this.booking.BookingDevice.forEach((e) => {
        console.log("e", e);
        const result = this.devices.filter((item) => item.id == e);
        this.items.push(result[0]);
      });

      console.log("items", this.items);
    },
  },
};
</script>

<style lang="scss" scoped></style>
