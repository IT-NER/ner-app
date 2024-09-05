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
          <v-icon>mdi-magnify</v-icon>
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
        <v-btn
          color="info"
          outlined
          :disabled="selected.length == 0"
          @click="generatePDF"
        >
          <v-icon>mdi-download</v-icon>
          ดาวน์โหลดไฟล์ PDF
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="addItem">
          <v-icon>mdi-plus</v-icon>
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
          <card-view-slide-reward-by-id :id="item.rewardId" />
          <!-- {{ item.Reward.RewardImg[0] }} -->
          <!-- <v-avatar size="50">
            <img :src="item.Reward.RewardImg[0].url" />
          </v-avatar> -->
        </template>
        <template v-slot:item.approveDate="{ item }">
          <span v-if="item.approveDate">
            {{ $moment(item.approveDate).format("lll") }} น.
          </span>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      width="800"
      transition="dialog-transition"
    >
      <form @submit.prevent="save">
        <v-card>
          <v-card-title>
            เพิ่มรายการ
            <small class="ml-2" color="success"> (ผู้ขอแลกของรางวัล) </small>
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title>
            <v-autocomplete
              label="เลือกของรางวัล"
              prepend-icon="mdi-ribbon"
              v-model="selectedReward2"
              :items="itemsReward"
              item-text="name"
              item-value="id"
              clearable
              hide-details
              :required="selectedReward2.length == 0"
              @change="getItemsUserByReward"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                >
                  <v-avatar left>
                    <v-img :src="data.item.RewardImg[0].url" />
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar>
                    <img :src="data.item.RewardImg[0].url" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ data.item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ data.item.point }} พอยท์
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-card-title>
          <v-divider></v-divider>
          <v-toolbar>
            <v-text-field
              label="ค้นหา"
              prepend-icon="mdi-magnify"
              v-model="searchUser2"
              clearable
              hide-details
              @change="getItemsUserByReward"
            ></v-text-field>
          </v-toolbar>
          <v-divider></v-divider>
          <v-data-table
            :items-per-page="-1"
            :headers="headersUser2"
            :items="itemsUser2"
            :search="searchUser2"
            class="elevation-0"
            v-model="selectedUser2"
            hide-default-footer
            show-select
            fixed-header
            height="400"
          >
            <template v-slot:item.no="{ index }">
              {{ index + 1 }}
            </template>
          </v-data-table>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" outlined type="submit"> บันทึก </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import CardFilterRedeem from "~/components/card/CardFilterRedeem.vue";
import CardViewSlideRewardById from "~/components/card/CardViewSlideRewardById.vue";
export default {
  components: { CardFilterRedeem, CardViewSlideRewardById },

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
      ],
      search: null,
      selected: [],

      dialog: false,

      headersUser2: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },

        {
          text: "ชื่อ",
          value: "fname",
          align: "start",
          sortable: true,
        },
        {
          text: "นามสกุล",
          value: "lname",
          align: "start",
          sortable: true,
        },
        {
          text: "ฝ่าย",
          value: "Department.name",
          align: "start",
          sortable: true,
        },
        {
          text: "พอยท์",
          value: "point",
          align: "end",
          sortable: true,
        },
      ],
      itemsUser2: [],
      searchUser2: null,
      selectedUser2: [],
      selectedReward2: [],
    };
  },

  async created() {
    await this.getItemsPointPayStatus();
    await this.getItemsReward();
    await this.getItemsUser();
    await this.getItems();
  },

  methods: {
    generatePDF() {
      const docDefinition = {
        content: [
          { text: "รายงานการแลกของรางวัล", style: "header" },
          "This is normal text",
          { text: "Another paragraph", style: "subheader" },
        ],
        styles: {
          header: { fontSize: 22, bold: true },
          subheader: { fontSize: 16, bold: true },
        },
      };

      var fonts = {
        yourFontName: {
          normal: "https://example.com/fonts/fontFile.ttf",
          bold: "https://example.com/fonts/fontFile2.ttf",
          italics: "https://example.com/fonts/fontFile3.ttf",
          bolditalics: "https://example.com/fonts/fontFile4.ttf",
        },
      };

      pdfMake.addFonts(fonts);

      // Access pdfMake via this.$pdfMake
      this.$pdfMake.createPdf(docDefinition).download("example.pdf");
    },

    async getItemsUserByReward() {
      if (!this.selectedReward2) {
        this.itemsUser2 = [];
        this.searchUser2 = null;
        this.selectedUser2 = [];
        this.selectedReward2 = [];
        return;
      }

      this.itemsUser2 = await this.$axios
        .get("/api/user/rewardId/" + this.selectedReward2)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },

    async save() {
      // console.log("selectedReward2", this.selectedReward2);
      // console.log("selectedUser2", this.selectedUser2);

      if (!this.selectedUser2.length) {
        this.alertSelectUser();
        return;
      }

      let rewardId = this.selectedReward2;
      let userIds = [];
      this.selectedUser2.forEach((e) => {
        userIds.push(e.id);
      });
      // // console.log("rewardId", rewardId);
      // // console.log("userIds", userIds);

      await this.$axios
        .post("/api/admin/point-pay", {
          data: {
            rewardId: rewardId,
            userIds: userIds,
          },
        })
        .then(async (res) => {
          this.dialog = false;
          await this.getItems();
          await this.alertSuccess();
        })
        .catch((err) => {
          return false;
        });
    },
    async addItem() {
      this.dialog = true;

      this.itemsUser2 = [];
      this.searchUser2 = null;
      this.selectedUser2 = [];
      this.selectedReward2 = [];
    },

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

    async viewItem(item) {
      this.$router.push("/redeems/" + item.id);
    },

    async alertSelectUser() {
      this.$swal.fire({
        type: "warning",
        title: "กรุณาเลือกรายชื่อผู้ขอแลกรางวัล",
      });
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
      // return;

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
      await this.getItems();
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
