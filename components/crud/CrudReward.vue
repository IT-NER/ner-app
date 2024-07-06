<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-card>
      <v-card-title elevation="0">
        <div class="display-1">
          {{ title }}
        </div>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="ค้นหา"></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" v-bind="attrs" v-on="on" @click="addItem">
              เพิ่ม
            </v-btn>
          </template>
          <div class="title">เพิ่ม</div>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="primary" @click="getReward">
              รีเฟรช
            </v-btn>
          </template>
          <div class="title">รีเฟรช</div>
        </v-tooltip>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="rewards"
        class="elevation-0"
        :search="search"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="warning"
                @click="editItem(item)"
              >
                แก้ไข
              </v-btn>
            </template>
            <span class="title"> แก้ไข </span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      transition="slide-y-reverse-transition"
      max-width="1250"
    >
      <form @submit.prevent="save" enctype="multipart/form-data">
        <v-card>
          <v-card-title dense elevation="0">
            {{ title }}
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  color="error"
                  @click="dialog = false"
                >
                  mdi-close
                </v-icon>
              </template>
              <div class="title">ปิด</div>
            </v-tooltip>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <!-- FormReward -->
            <form-reward :reward.sync="reward" />
            <!-- CardViewImg -->
            <card-view-img :reward.sync="reward" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" type="submit" v-bind="attrs" v-on="on">
                  บันทึก
                </v-btn>
              </template>
              <div class="title">บันทึก</div>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import FormReward from "~/components/form/FormReward.vue";
import CardViewImg from "~/components/card/CardViewImg.vue";
export default {
  components: { FormReward, CardViewImg },
  data() {
    return {
      title: "ของรางวัล",
      search: null,
      dialog: false,
      overlay: false,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "TICKET", value: "ticket" },
        { text: "NAME", value: "name" },
        { text: "DESCRIPTION", value: "description" },
        { text: "POINT", value: "point" },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],
      rewards: [],
      reward: {
        id: null,
        ticket: null,
        name: null,
        description: null,
        point: null,
        userId: null,
        RewardImg: [],
        files: [],
        url: [],
      },

      user: null,
    };
  },

  created() {
    this.getReward();
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.getReward();
      }
    },
  },

  methods: {
    async uploadFile(formData) {
      let filesUpload = await this.$axios.post(
        "/api/uploads/reward",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return filesUpload;
    },

    async createRewardImg(filesUpload) {
      // console.log("filesUpload", filesUpload);
      let itemRewardImg = await this.$axios.post("/api/rewardImg", {
        reward: this.reward,
        rewardImg: filesUpload,
      });

      return itemRewardImg;
    },

    async getRewardById() {
      let reward = await this.$axios.get("/api/reward/" + this.reward.id);

      return reward;
    },

    async save() {
      this.overlay = true;

      let reward = await this.update();
      if (!reward) {
        this.alertError();
        return;
      }

      let formData = await this.setFormData();
      // console.log("formData", formData);
      if (!formData) {
        this.alertSuccess();
        return;
      }

      let filesUpload = await this.uploadFile(formData);
      // console.log("filesUpload", filesUpload);
      if (!filesUpload) {
        this.alertError();
        return;
      }

      let rewardImg = await this.createRewardImg(filesUpload.data);
      // console.log("rewardImg", rewardImg);
      if (!filesUpload) {
        this.alertError();
        return;
      }

      let item = await this.getRewardById();
      this.reward = await item.data;
      await this.alertSuccess();
    },

    async setFormData() {
      // console.log("this.reward.files", this.reward.files);
      // return;

      if (!this.reward.files) {
        return false;
      }

      let formData = null;
      formData = new FormData();

      formData.append("id", this.reward.id);
      formData.append("ticket", this.reward.ticket);
      this.reward.files.forEach((file) => {
        formData.append("files", file);
      });

      if (formData) {
        return formData;
      }
    },

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
        timer: 1500,
      });

      this.overlay = false;
    },

    async alertSuccess() {
      this.reward.files = [];
      this.reward.url = [];
      this.overlay = false;
      await this.getReward();

      await this.$swal.fire({
        position: "top-end",
        type: "success",
        title: "บันทึก เรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async update() {
      let reward = await this.$axios.put("/api/reward/" + this.reward.id, {
        data: this.reward,
      });
      return reward;
    },

    async addItem() {
      this.reward.files = [];
      this.reward.url = [];

      this.user = await this.$auth.$storage.getCookie("user");
      let reward = await this.create();

      if (!reward) {
        this.alertError();
        return;
      }

      this.reward = await reward.data;
      this.dialog = true;
    },

    async create() {
      let reward = await this.$axios.post("/api/reward/ticket", {
        data: this.user,
      });

      return reward;
    },

    async editItem(item) {
      this.reward.files = [];
      this.reward.url = [];

      this.reward = await Object.assign({}, item);
      this.dialog = true;
    },

    async getReward() {
      let rewards = await this.$axios.get("/api/reward");

      if (!rewards) {
        this.alertError();
        return;
      }

      this.rewards = await rewards.data;
    },

    async delRewardImgById(item) {
      let itemRewardImg = await this.$axios.delete("/api/rewardImg/" + item.id);
      if (!itemRewardImg) {
        this.alertError();
      }

      await this.getRewardById();
      await this.alertSuccess();
    },

    async alertImgRequest() {
      this.$swal.fire({
        position: "center",
        type: "error",
        title: " กรุณาแนบไฟล์รูปภาพ",
        text: "สามารถอัพโหลดรูปภาพได้ครั้งละ 10 รูป",
        showConfirmButton: true,
      });
    },

    async alertImgOverLimit() {
      this.$swal.fire({
        position: "center",
        type: "error",
        title: "ล้มเหลว",
        text: "สามารถอัพโหลดรูปภาพได้ครั้งละ 10 รูป",
        showConfirmButton: true,
      });
    },
  },
};
</script>
