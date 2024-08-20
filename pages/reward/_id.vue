<template>
  <div>
    <form @submit.prevent="save">
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
          <form-reward :item.sync="item" @updateActive="updateActive" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" outlined type="submit">
            <v-icon class="mr-2"> mdi-content-save </v-icon>
            บันทึก
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-title> อัพโหลดรูปภาพ </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <form-upload-reward-img
            :id.sync="$route.params.id"
            :item.sync="item"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title> รูปภาพ </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <card-view-reward-img :item.sync="item" />
        </v-card-text>
      </v-card>
    </form>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import FormUploadRewardImg from "~/components/form/FormUploadRewardImg.vue";
import CardViewRewardImg from "~/components/card/CardViewRewardImg.vue";
export default {
  components: { FormUploadRewardImg, CardViewRewardImg },
  data() {
    return {
      item: {
        id: null,
        ticket: null,
        code: null,
        name: null,
        description: null,
        point: 0,
        userId: null,
        active: true,
      },
    };
  },

  created() {
    this.getItem();
  },

  methods: {
    async save() {
      await this.$axios
        .put("/api/admin/reward/" + this.$route.params.id, {
          data: this.item,
        })
        .then(async (res) => {
          await this.getItem();
          await this.alertSuccess();
        })
        .catch((err) => {
          this.getItem();
          this.alertError();
        });
    },
    async goToIndex() {
      this.$router.push("/reward");
    },
    async updateActive() {
      await this.$axios
        .get("/api/admin/reward/update/active/" + this.$route.params.id)
        .then(async (res) => {
          await this.getItem();
          await this.alertSuccess();
        })
        .catch((err) => {
          this.getItem();
          this.alertError();
        });
    },
    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
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
    async removeItem(item) {
      console.log("item", item);
      await this.$axios
        .delete("/api/admin/reward/delete/rewardImg/" + Number(item.id))
        .then(async (res) => {
          await this.getItem();
          await this.alertSuccess();
        })
        .catch((err) => {
          this.alertError();
        });
    },
    async getItem() {
      this.item = await this.$axios
        .get("/api/admin/reward/" + this.$route.params.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          this.$router.push("/reward");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
