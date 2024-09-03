<template>
  <div>
    <!-- <card-received-point /> -->

    <v-card flat>
      <v-card-title> รับพอยท์ </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <card-filter-received-point
          :item.sync="filter"
          :itemsContentStatus.sync="itemsContentStatus"
          :itemsContentType.sync="itemsContentType"
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="getItems">
          <v-icon>mdi-magnify</v-icon>
          ค้นหา
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-data-table :headers="headers" :items="items" elevation-0>
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.count="{ item }">
          {{ item.PointReceived.length }} คน
        </template>
        <template v-slot:item.timed="{ item }">
          <v-chip color="primary" label v-if="item.timed">
            <v-icon>mdi-refresh-auto</v-icon>
            กำหนดช่วงเวลา
          </v-chip>
          <v-chip color="error" label v-else>
            <v-icon>mdi-gesture-double-tap</v-icon>
            ไม่กำหนดช่วงเวลา
          </v-chip>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip label :color="getColorStatus(item)">
            {{ item.ContentStatus.name }}
          </v-chip>
        </template>
        <template v-slot:item.detail="{ item }">
          <v-btn outlined color="primary" @click="viewItem(item)">
            <v-icon> mdi-eye </v-icon>
            รายละเอียด
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CardFilterReceivedPoint from "~/components/card/CardFilterReceivedPoint.vue";
export default {
  components: { CardFilterReceivedPoint },
  data() {
    return {
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "หัวข้อ / เรื่อง",
          value: "title",
          align: "start",
          sortable: false,
        },
        {
          text: "รับพอยท์แล้ว",
          value: "count",
          align: "center",
          sortable: false,
        },
        {
          text: "ประเภท",
          value: "ContentType.name",
          align: "center",
          sortable: false,
        },
        {
          text: "การเผยแพร่",
          value: "timed",
          align: "center",
          sortable: false,
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
        },
        {
          text: "รายละเอียด",
          value: "detail",
          align: "center",
          sortable: false,
        },
      ],
      items: [],
      itemsContentType: [],
      itemsContentStatus: [],

      filter: {
        contentTypeId: [1, 2, 3, 4],
        contentStatusId: [2],
      },
    };
  },

  created() {
    this.getItems();
    this.getItemsContentType();
    this.getItemsContentStatus();
  },

  methods: {
    getColorStatus(item) {
      // console.log("item", item);
      let data = "grey";
      if (item.contentStatusId == 2) {
        data = "success";
      }
      if (item.contentStatusId == 3) {
        data = "error";
      }
      return data;
    },
    async getItems() {
      // console.log("filter", this.filter);

      this.items = await this.$axios
        .post("/api/admin/content/filter", {
          data: this.filter,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },

    async getItemsContentType() {
      this.itemsContentType = await this.$axios
        .get("/api/contentType")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async getItemsContentStatus() {
      this.itemsContentStatus = await this.$axios
        .get("/api/contentStatus")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async viewItem(item) {
      this.$router.push("/point/" + item.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
