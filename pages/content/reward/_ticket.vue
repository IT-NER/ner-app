<template>
  <div>
    <!-- overlay -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- form -->
    <form @submit.prevent="save">
      <v-card flat>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" color="warning" to="/content/reward">
            กลับหน้าหลัก
          </v-btn>
          <v-btn color="primary" type="submit"> บันทึก </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title> REWARD </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <form-reward :reward.sync="reward" :files.sync="files" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title> UPLOADS FILES </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  prepend-icon="mdi-cloud-upload-outline"
                  accept="image/jpeg"
                  label="UPLOADS FILE IMAGE"
                  multiple
                  counter
                  show-size
                  clearable
                  @change="handleFiles"
                  v-model="files"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </form>

    <v-divider></v-divider>

    <v-card flat>
      <v-card-title> IMAGES </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <card-reward-img
          :reward.sync="reward"
          @getRewardByTicket="getRewardByTicket"
          @alertSuccess="alertSuccess"
          @alertError="alertError"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardRewardImg from "~/components/card/CardRewardImg.vue";
import FormReward from "~/components/form/FormReward.vue";
export default {
  components: { FormReward, CardRewardImg },

  data() {
    return {
      overlay: false,
      reward: {
        ticket: this.$route.params.ticket,
        RewardImg: [],
      },

      files: [],
    };
  },

  created() {
    this.getUser();
    this.getRewardByTicket();
  },

  methods: {
    async handleFiles() {
      let files = await this.files.filter((item) => item.size < 2000000);
      this.$emit("update:files", files);
    },

    async save() {
      this.overlay = true;

      let reward = await this.update();
      if (!reward) {
        this.alertError();
        this.overlay = false;
        return;
      }
      if (this.files.length == 0) {
        this.reward = await reward;
        this.alertSuccess();
      }

      let filesUpload = await this.uploadFile();
      if (!filesUpload) {
        this.alertError();
        this.overlay = false;
        return;
      }

      let rewardImg = await this.createRewardImg(filesUpload);
      if (!rewardImg) {
        this.alertError();
        this.overlay = false;
        return;
      }

      this.reward = await this.getRewardByTicket();
      this.files = [];
      this.overlay = false;
      this.alertSuccess();
    },

    async uploadFile() {
      let formData = new FormData();
      formData.append("id", this.reward.id);
      formData.append("ticket", this.reward.ticket);
      this.files.forEach((file) => {
        formData.append("files", file);
      });

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
      // console.log("filesUpload", filesUpload);
      let rewardImg = await this.$axios.post("/api/rewardImg", {
        reward: this.reward,
        rewardImg: filesUpload,
      });

      return rewardImg;
    },

    async update() {
      let reward = await this.$axios
        .put("/api/reward/" + this.reward.id, {
          data: this.reward,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });

      return reward;
    },

    async getUser() {
      let user = this.$auth.$storage.getCookie("user");
      this.reward.userId = user.id;
    },

    async getRewardByTicket() {
      // this.reward.ticket = await this.$route.params.ticket;

      let reward = await this.$axios
        .get("/api/reward/ticket/" + this.$route.params.ticket)
        .then((res) => {
          // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
          return false;
        });

      if (!reward) {
        this.$router.push("/content/reward");
      }

      this.reward = await reward;
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
