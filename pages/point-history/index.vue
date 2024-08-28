<template>
  <div>
    <v-card flat>
      <v-card-title> ประวัติการขอแลกของรางวัล </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table :headers="headers" :items="items" class="elevation-0">
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.date="{ item }">
            {{ $moment(item.createdAt).format("lll") }} น.
          </template>
          <template v-slot:item.received="{ item }">
            <v-chip label color="success" v-if="item.received">
              <v-icon class="mr-2">mdi-plus</v-icon>
              {{ item.received }}
            </v-chip>
          </template>
          <template v-slot:item.pay="{ item }">
            <v-chip label color="error" v-if="item.pay">
              <v-icon class="mr-2">mdi-minus</v-icon>
              {{ item.pay }}
            </v-chip>
          </template>
          <template v-slot:item.total="{ item }">
            <v-chip label color="primary" v-if="item.total">
              <v-icon class="mr-2">mdi-sigma</v-icon>
              {{ item.total }}
            </v-chip>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              v-if="item.PointPay"
              label
              :color="getColorStatus(item.PointPay.pointPayStatusId)"
            >
              {{ item.PointPay.PointPayStatus.name }}
            </v-chip>
          </template>
          <template v-slot:item.view="{ item }">
            <v-btn color="primary" outlined @click="viewItem(item)">
              <v-icon class="mr-2">mdi-eye</v-icon>
              รายละเอียด
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "วันที่",
          value: "date",
          align: "start",
          sortable: false,
        },
        { text: "รับ", value: "received", align: "end", sortable: false },
        { text: "จ่าย", value: "pay", align: "end", sortable: false },
        { text: "คงเหลือ", value: "total", align: "end", sortable: false },
        { text: "สถานะ", value: "status", align: "center", sortable: false },
        { text: "รายละเอียด", value: "view", align: "center", sortable: false },
      ],
      items: [],
      user: null,
    };
  },

  async created() {
    await this.getUser();
    await this.getItems();
  },
  methods: {
    async viewItem(item) {
      console.log("item", item);
    },
    getColorStatus(id) {
      let data = "warning";
      if (id == 2) {
        data = "success";
      } else if (id == 3) {
        data = "error";
      }
      if (id == 4) {
        data = "gray";
      }
      return data;
    },
    async getItems() {
      this.items = await this.$axios
        .get("/api/point-received-pay/userId/" + this.user.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },

    async getUser() {
      let user = await this.$auth.$storage.getCookie("user");
      this.user = await this.$axios
        .get("/api/user/" + Number(user.id))
        .then(async (res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
