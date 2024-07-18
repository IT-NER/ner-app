<template>
  <div>
    <v-simple-table width="100%">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ลำดับ</th>
            <th class="text-left">รายการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in devices" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: ["BookingDevice"],
  data() {
    return {
      devices: [],
    };
  },

  watch: {
    BookingDevice(val) {
      if (val) {
        this.getBookingDeviceById();
      }
    },
  },

  async created() {
    console.log("BookingDevice", this.BookingDevice);
    await this.getBookingDeviceById();
  },

  methods: {
    async getBookingDeviceById() {
      let devices = [];
      this.BookingDevice.forEach(async (e) => {
        let device = await this.$axios
          .get("/api/device/" + Number(e))
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log("err", err);
          });

        devices.push(device);
      });

      this.devices = devices;

      console.log("devices", this.devices);
    },
  },
};
</script>

<style lang="scss" scoped></style>
