<template>
  <div>
    <form @submit.prevent="save">
      <card-reward
        :title.sync="title"
        :path.sync="path"
        :reward.sync="reward"
        :files.sync="files"
      />
    </form>

    <v-divider></v-divider>
    <card-item-reward-img :rewardImgIds.sync="rewardImgIds" @main="main" />
  </div>
</template>

<script>
import CardReward from "~/components/card/CardReward.vue";
import CardItemRewardImg from "~/components/card/CardItemRewardImg.vue";
export default {
  components: { CardReward, CardItemRewardImg },
  data() {
    return {
      title: "Reward",
      path: "/reward",

      reward: {
        id: null,
        ticket: null,
        code: null,
        title: null,
        description: null,
        detail: null,
        point: 0,
        active: true,
        RewardImg: [],
        RewardContent: [],
        rewardStatusId: null,
        rewardTypeId: null,
        userId: null,
        RewardStatus: [],
        RewardType: [],
        User: [],
      },

      files: [],
      rewardImgIds: [],
    };
  },

  created() {
    this.main();
  },

  methods: {
    async main() {
      this.reward = await this.getRewardByTicket();
      // let rewardImg = this.reward.RewardImg
      let rewardImgIds = [];

      this.reward.RewardImg.forEach((item) => {
        rewardImgIds.push(item.id);
      });
      this.rewardImgIds = rewardImgIds;
      console.log("rewardImgIds", this.rewardImgIds);
    },

    async save() {
      let reward = await this.update();
      if (!reward) {
        this.alertError();
        return;
      }

      if (this.files.length == 0) {
        this.alertSuccess();
        return;
      }

      let formData = new FormData();
      this.files.forEach((file) => {
        console.log(file);
        formData.append("files", file);
      });
      if (!formData) {
        return;
      }

      let filesUpload = await this.uploadsFiles(formData);
      if (!filesUpload) {
        this.alertError();
        return;
      }

      let rewardImg = await this.createRewardImg(filesUpload);
      if (!rewardImg) {
        this.alertError();
        return;
      }

      await this.main();
      await this.alertSuccess();
      this.files = [];
    },

    async update() {
      let reward = await this.$axios
        .put("/api/reward/" + this.reward.id, {
          data: this.reward,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return reward;
    },

    async uploadsFiles(formData) {
      let filesUpload = await this.$axios
        .post("/api/uploads-reward", formData, {
          headers: {
            "Reward-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return filesUpload;
    },

    async createRewardImg(filesUpload) {
      let rewardImg = await this.$axios
        .post("/api/rewardImg", {
          data: {
            reward: this.reward,
            rewardImg: filesUpload,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return rewardImg;
    },

    async getRewardByTicket() {
      let reward = await this.$axios
        .get("/api/reward/ticket/" + this.$route.params.ticket)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return reward;
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
