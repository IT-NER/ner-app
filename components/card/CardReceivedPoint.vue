<template>
  <div>
    <v-card>
      <v-card-title>
        รับพอยท์
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="getItems"> รีเฟรซ </v-btn>
      </v-card-title>
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
            <v-icon class="mr-2">mdi-refresh-auto</v-icon>
            กำหนดช่วงเวลา
          </v-chip>
          <v-chip color="error" label v-else>
            <v-icon class="mr-2">mdi-gesture-double-tap</v-icon>
            ไม่กำหนดช่วงเวลา
          </v-chip>
        </template>
        <template v-slot:item.detail="{ item }">
          <v-btn outlined color="primary" @click="viewItem(item)">
            <v-icon class="mr-2"> mdi-eye </v-icon>
            รายละเอียด
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
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
          text: "รายละเอียด",
          value: "detail",
          align: "center",
          sortable: false,
        },
      ],
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      this.items = await this.$axios
        .get("/api/admin/content/publish")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },

    async viewItem(item) {
      console.log("item", item);
      this.$router.push("/point/" + item.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
