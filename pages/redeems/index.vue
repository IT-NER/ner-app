<template>
  <div>
    <v-card>
      <v-card-title> แลกของรางวัล </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        ค้นหา
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="refresh"> รีเฟรซ </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        <card-filter-redeem
          :item.sync="filter"
          :itemsPointPayStatus.sync="itemsPointPayStatus"
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="getItems">
          <v-icon class="mr-2">mdi-magnify</v-icon>
          ค้นหา
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <v-text-field
          label="ค้นหา"
          hide-details
          v-model="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined :disabled="selected.length == 0">
          อนุมัติ
        </v-btn>
        <v-btn color="error" outlined :disabled="selected.length == 0">
          ไม่อนุมัติ
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        class="elevation-0"
        show-select
        v-model="selected"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.date="{ item }">
          {{ $moment(item.createdAt).format("ll") }} น.
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip label :color="getColorStatus(item.pointPayStatusId)">
            {{ item.PointPayStatus.name }}
          </v-chip>
        </template>
        <template v-slot:item.view="{ item }">
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
import CardFilterRedeem from "~/components/card/CardFilterRedeem.vue";
export default {
  components: { CardFilterRedeem },

  data() {
    return {
      filter: {
        start: null,
        end: null,
        pointPayStatusId: [1],
      },

      itemsPointPayStatus: [],
      items: [],
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "วันที่",
          value: "date",
          align: "start",
          sortable: false,
        },
        {
          text: "ชื่อ",
          value: "User.fname",
          align: "start",
          sortable: false,
        },
        {
          text: "นามสกุล",
          value: "User.lname",
          align: "start",
          sortable: false,
        },
        {
          text: "ฝ่าย",
          value: "User.Department.name",
          align: "start",
          sortable: false,
        },
        {
          text: "ของรางวัล",
          value: "Reward.name",
          align: "start",
          sortable: false,
        },
        { text: "สถานะ", value: "status", align: "center", sortable: false },
        { text: "รายละเอียด", value: "view", align: "center", sortable: false },
      ],
      search: null,
      selected: [],
    };
  },

  async created() {
    await this.getItemPointPayStatus();
    await this.getItems();
  },

  methods: {
    async viewItem(item) {
      this.$router.push("/redeems/" + item.id);
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
      console.log("filter", this.filter);

      this.items = await this.$axios
        .post("/api/point-pay/filter", {
          data: this.filter,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async refresh() {
      this.filter.start = null;
      this.filter.end = null;
      this.filter.userId = [];
      this.filter.rewardId = [];
      this.filter.pointPayStatusId = [1];
    },
    async getItemPointPayStatus() {
      this.itemsPointPayStatus = await this.$axios
        .get("/api/point-pay-status")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
