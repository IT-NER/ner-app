<template>
  <div>
    <v-card flat>
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
          :itemsReward.sync="itemsReward"
          :itemsUser.sync="itemsUser"
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
        <v-btn
          color="success"
          outlined
          :disabled="selected.length == 0"
          @click="approve"
        >
          อนุมัติ
        </v-btn>
        <v-btn
          color="error"
          outlined
          :disabled="selected.length == 0"
          @click="notApprove"
        >
          ไม่อนุมัติ
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="addItem">
          <v-icon class="mr-2">mdi-plus</v-icon>
          เพิ่มรายการ
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <v-text-field
          label="ค้นหา"
          hide-details
          v-model="search"
          clearable
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-data-table
        :items-per-page="-1"
        :headers="headers"
        :items="items"
        :search="search"
        class="elevation-0"
        v-model="selected"
        hide-default-footer
        show-select
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.date="{ item }">
          {{ $moment(item.createdAt).format("lll") }} น.
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip label :color="getColorStatus(item.pointPayStatusId)">
            {{ item.PointPayStatus.name }}
          </v-chip>
        </template>
        <template v-slot:item.reward="{ item }">
          <card-view-reward-by-id :id="item.rewardId" />
        </template>
        <template v-slot:item.approveDate="{ item }">
          <span v-if="item.approveDate">
            {{ $moment(item.approveDate).format("lll") }} น.
          </span>
        </template>
        <!-- <template v-slot:item.view="{ item }">
          <v-btn outlined color="primary" @click="viewItem(item)">
            <v-icon class="mr-2"> mdi-eye </v-icon>
            รายละเอียด
          </v-btn>
        </template> -->
      </v-data-table>
    </v-card>

    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import CardFilterRedeem from "~/components/card/CardFilterRedeem.vue";
import CardViewRewardById from "~/components/card/CardViewRewardById.vue";
export default {
  components: { CardFilterRedeem, CardViewRewardById },

  data() {
    return {
      filter: {
        start: null,
        end: null,
        pointPayStatusId: [1],
        rewardId: [],
        userId: [],
      },

      itemsPointPayStatus: [],
      itemsReward: [],
      itemsUser: [],
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
          value: "reward",
          align: "center",
          sortable: false,
        },
        { text: "สถานะ", value: "status", align: "center", sortable: false },
        {
          text: "วันที่ อนุมัติ/ไม่อนุมัติ",
          value: "approveDate",
          align: "start",
          sortable: false,
        },
        // { text: "รายละเอียด", value: "view", align: "center", sortable: false },
      ],
      search: null,
      selected: [],
    };
  },

  computed: {
    showSelect(e) {},
  },
  async created() {
    await this.getItemsPointPayStatus();
    await this.getItemsReward();
    await this.getItemsUser();
    await this.getItems();
  },

  methods: {
    async approve() {
      let confirm = await this.alertConfirm();
      if (!confirm) {
        return;
      }
      let user = this.$auth.$storage.getCookie("user");

      let items = [];
      this.selected.forEach((e) => {
        if (e.pointPayStatusId == 1) {
          items.push(e);
        }
      });

      await this.$axios
        .post("/api/admin/point-pay/approve", {
          data: {
            approveBy: user.id,
            items: items,
          },
        })
        .then(async (res) => {
          await this.getItems();
          await this.alertSuccess();
        })
        .catch((err) => {
          this.alertError();
        });
    },
    async notApprove() {
      let confirm = await this.alertConfirmNotApprove();
      if (!confirm) {
        return;
      }
      let user = this.$auth.$storage.getCookie("user");

      let items = [];
      this.selected.forEach((e) => {
        if (e.pointPayStatusId == 1) {
          items.push(e);
        }
      });

      await this.$axios
        .post("/api/admin/point-pay/notApprove", {
          data: {
            approveBy: user.id,
            items: items,
          },
        })
        .then(async (res) => {
          await this.getItems();
          await this.alertSuccess();
        })
        .catch((err) => {
          this.alertError();
        });
    },

    async addItem() {},
    async viewItem(item) {
      this.$router.push("/redeems/" + item.id);
    },

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertSuccess() {
      this.$swal.fire({
        position: "top-end",
        type: "success",
        title: "บันทึก เรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    getColorStatus(id) {
      let data = "warning";
      if (id == 2) {
        data = "success";
      } else if (id == 3) {
        data = "error";
      }
      return data;
    },
    async getItems() {
      this.selected = [];
      // console.log("filter", this.filter);

      this.items = await this.$axios
        .post("/api/admin/point-pay/filter", {
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
    async getItemsPointPayStatus() {
      this.itemsPointPayStatus = await this.$axios
        .get("/api/point-pay-status")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async getItemsReward() {
      this.itemsReward = await this.$axios
        .get("/api/rewards")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async getItemsUser() {
      this.itemsUser = await this.$axios
        .get("/api/user")
        .then((res) => {
          res.data.forEach((e) => {
            e["name"] = e.fname + "  " + e.lname + " / " + e.Department.name;
          });
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async alertConfirm() {
      let result = await this.$swal
        .fire({
          title: "ยีนยัน",
          text: "ต้องการอนุมัติ ใช่หรือไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ไม่ใช่",
          confirmButtonText: "ใช่",
        })
        .then((res) => {
          if (res.value) {
            return true;
          } else {
            return false;
          }
        });
      return result;
    },
    async alertConfirmNotApprove() {
      let result = await this.$swal
        .fire({
          title: "ยีนยัน",
          text: "ต้องการไม่อนุมัติ ใช่หรือไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ไม่ใช่",
          confirmButtonText: "ใช่",
        })
        .then((res) => {
          if (res.value) {
            return true;
          } else {
            return false;
          }
        });
      return result;
    },
  },
};
</script>

<style lang="scss" scoped></style>
