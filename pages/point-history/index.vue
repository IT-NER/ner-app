<template>
  <div>
    <v-card flat>
      <v-card-title> ประวัติการ รับ-จ่าย พอยท์ </v-card-title>
      <v-divider></v-divider>

      <v-data-table :headers="headers" :items="items" class="elevation-0">
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.date="{ item }">
          {{ $moment(item.createdAt).format("lll") }} น.
        </template>
        <template v-slot:item.content="{ item }">
          <span v-if="item.PointReceived">
            {{ item.PointReceived.Content.title }}
          </span>
          <br />
          <v-btn
            v-if="item.PointReceived"
            x-small
            text
            color="primary"
            @click="viewItemContent(item)"
          >
            <v-icon class="mr-2" small>mdi-eye</v-icon>
            เปิดดู
          </v-btn>
        </template>
        <template v-slot:item.reward="{ item }">
          <span v-if="item.PointPay">
            {{ item.PointPay.Reward.name }}
          </span>
          <br />
          <v-btn
            v-if="item.PointPay"
            x-small
            text
            color="primary"
            @click="viewItemReward(item)"
          >
            <v-icon class="mr-2" small>mdi-eye</v-icon>
            เปิดดู
          </v-btn>
        </template>
        <template v-slot:item.received="{ item }">
          <v-chip label color="success" v-if="item.received">
            <v-icon>mdi-plus</v-icon>
            {{ item.received }}
          </v-chip>
        </template>
        <template v-slot:item.pay="{ item }">
          <v-chip label color="error" v-if="item.pay">
            <v-icon>mdi-minus</v-icon>
            {{ item.pay }}
          </v-chip>
        </template>
        <template v-slot:item.total="{ item }">
          <v-chip label color="primary" v-if="item.total">
            <v-icon>mdi-sigma</v-icon>
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
      </v-data-table>
    </v-card>

    <!-- dialogContent -->
    <v-dialog
      v-model="dialogContent"
      scrollable
      transition="dialog-transition"
      width="500"
    >
      <card-view-content-by-id :id.sync="contentId" />
    </v-dialog>

    <!-- dialogReward -->
    <v-dialog
      v-model="dialogReward"
      scrollable
      transition="dialog-transition"
      width="500"
    >
      <card-view-reward-by-id :id.sync="rewardId" />
    </v-dialog>
  </div>
</template>

<script>
import CardViewContentById from "~/components/card/CardViewContentById.vue";
import CardViewRewardById from "~/components/card/CardViewRewardById.vue";
export default {
  components: { CardViewContentById, CardViewRewardById },
  data() {
    return {
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "วันที่",
          value: "date",
          align: "start",
          sortable: false,
          width: 120,
        },
        {
          text: "หัวข้อ/เรื่อง",
          value: "content",
          align: "start",
          sortable: false,
          width: 300,
        },
        {
          text: "ของรางวัล",
          value: "reward",
          align: "start",
          sortable: false,
          width: 300,
        },
        { text: "รับ", value: "received", align: "end", sortable: false },
        { text: "จ่าย", value: "pay", align: "end", sortable: false },
        { text: "คงเหลือ", value: "total", align: "end", sortable: false },
        { text: "สถานะ", value: "status", align: "center", sortable: false },
      ],
      items: [],
      user: null,

      dialogContent: false,
      dialogReward: false,
      contentId: null,
      rewardId: null,
    };
  },

  async created() {
    await this.getUser();
    await this.getItems();
  },
  methods: {
    async viewItemContent(item) {
      this.contentId = await item.PointReceived.contentId;
      this.dialogContent = true;
    },

    async viewItemReward(item) {
      this.rewardId = await item.PointPay.rewardId;
      this.dialogReward = true;
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
