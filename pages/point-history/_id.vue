<template>
  <div>
    <v-card flat>
      <v-card-title>
        ของรางวัล
        <v-spacer></v-spacer>
        <v-btn color="warning" outlined @click="goToIndex">
          <v-icon class="mr-2"> mdi-reply </v-icon>
          กลับหน้าหลัก
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <card-slide-reward-img :item.sync="item" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title>
        {{ item.name }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        {{ item.description }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <button-redeem
          :item.sync="item"
          :show.sync="show"
          @redeemItem="redeemItem"
        />
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-title> ประวัติการแลกของรางวัล </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="itemsPointPay.length > 0">
        <card-point-pay-by-user-id
          :items.sync="itemsPointPay"
          @cancel="cancel"
        />
      </v-card-text>
      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          ไม่มีรายการ
        </v-alert>
      </v-card-text>
    </v-card>

    <br />
    <br />
    <br />
    <br />
    <br />

    <btn-scroll-to-top />
  </div>
</template>

<script>
import BtnScrollToTop from "~/components/button/BtnScrollToTop.vue";
import ButtonRedeem from "~/components/button/ButtonRedeem.vue";
import CardPointPayByUserId from "~/components/card/CardPointPayByUserId.vue";
import CardSlideRewardImg from "~/components/card/CardSlideRewardImg.vue";
export default {
  components: {
    CardSlideRewardImg,
    BtnScrollToTop,
    ButtonRedeem,
    CardPointPayByUserId,
  },
  data() {
    return {
      item: {
        RewardImg: [],
      },

      show: false,
      user: {
        id: null,
        PointPay: [],
      },

      pointPay: {
        id: null,
        point: null,
        userId: null,
        rewardId: null,
        status: null,
        approveDate: null,
        approveBy: null,
        pointPayStatusId: null,
        User: [],
        Reward: [],
        PointPayStatus: [],
        PointReceivedPay: [],
      },

      itemsPointPay: [],
    };
  },
  async created() {
    await this.getItem();
  },
  methods: {
    async cancel(item) {
      // console.log("item", item);

      let confirm = await this.alertConfirmCancel();
      if (!confirm) {
        return;
      }

      await this.$axios
        .get("/api/point-pay/cancel/" + item.id)
        .then((res) => {
          this.getItem();
          this.alertSuccess();
        })
        .catch((err) => {
          this.alertError();
        });
    },
    async redeemItem(item) {
      console.log("item", item);
      let confirm = await this.alertConfirm();
      if (!confirm) {
        return;
      }

      let pointPay = await this.createPointPay();
      if (!pointPay) {
        this.alertError();
        return;
      }

      await this.getItem();
      await this.alertSuccess();
    },

    async createPointPay() {
      let user = await this.$auth.$storage.getCookie("user");

      this.pointPay.point = this.item.point;
      this.pointPay.userId = user.id;
      this.pointPay.rewardId = this.item.id;
      this.pointPay.pointPayStatusId = 1;

      let item = await this.$axios
        .post("/api/point-pay/", {
          data: this.pointPay,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return item;
    },
    async alertConfirm() {
      let result = await this.$swal
        .fire({
          title: "ยีนยัน",
          text: "ต้องการใช้พอยท์ ใช่หรือไม่?",
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
    async alertConfirmCancel() {
      let result = await this.$swal
        .fire({
          title: "ยีนยัน",
          text: "ต้องการยกเลิก ใช่หรือไม่?",
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

    async getItem() {
      this.item = await this.$axios
        .get("/api/reward/" + this.$route.params.id)
        .then(async (res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });
      await this.getUser();
      await this.checkBtnPointPay();
      await this.getItemsPointPay();
    },

    async getItemsPointPay() {
      // console.log("itemsPointPay", this.item.User.PointPay);
      this.itemsPointPay = this.item.User.PointPay.filter(
        (e) => e.rewardId == this.item.id
      );
    },
    async checkBtnPointPay() {
      this.show = false;
      if (this.user.point >= this.item.point) {
        this.show = true;
      }
    },

    async goToIndex() {
      this.$router.push("/redeem");
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
  },
};
</script>

<style lang="scss" scoped></style>
