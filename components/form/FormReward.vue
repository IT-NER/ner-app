<template>
  <div>
    <v-container>
      <!-- DETAIL REWARD -->
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-toolbar dense flat>
              <div class="title">DETAIL REWARD</div>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="2">
                  <v-text-field
                    label="TICKET"
                    required
                    v-model="reward.ticket"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    autofocus
                    label="NAME"
                    required
                    v-model="reward.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="1">
                  <v-text-field
                    label="POINT"
                    required
                    v-model="reward.point"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    label="DESCRIPTION"
                    required
                    v-model="reward.description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- IMAGES UPLOAD -->
      <v-row>
        <v-col cols="12">
          <form @submit.prevent="upload" enctype="multipart/form-data">
            <v-card flat>
              <v-toolbar flat dense>
                <div class="title">IMAGES UPLOAD</div>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-file-input
                      v-model="reward.files"
                      accept="image/jpeg"
                      label="IMAGES"
                      @change="handleImages"
                      multiple
                      counter
                      show-size
                      clearable
                      required
                      type="file"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="12" class="text-right">
                    <v-btn color="success" type="submit"> อัพโหลดรูปภาพ </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </form>
        </v-col>
      </v-row>

      <!-- previewImg -->
      <v-row>
        <v-col
          cols="12"
          md="2"
          v-for="(item, i) in reward.url"
          :key="i"
          :v-if="item"
        >
          <v-card flat>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="error"
                      v-bind="attrs"
                      v-on="on"
                      @click="removeImage(item)"
                    >
                      mdi-close
                    </v-icon>
                  </template>
                  REMOVE
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card>
          <v-card @click="viewImg(item)">
            <v-card-actions>
              <v-img :aspect-ratio="16 / 9" :src="item.url" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- IMAGES REWARD -->
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-toolbar flat dense>
              <div class="title">IMAGES REWARD</div>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text v-if="showRewardImg">
              <v-row>
                <v-col
                  cols="12"
                  md="2"
                  v-for="(item, i) in reward.RewardImg"
                  :key="i"
                ></v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <v-row>
                <v-col cols="12">
                  <v-alert
                    text
                    dense
                    prominent
                    type="warning"
                    icon="mdi-image-plus-outline"
                  >
                    <div class="title">NO IMAGES</div>
                    <div class="sub-title">Please upload an image file.</div>
                  </v-alert>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- dialogViewImg -->
    <v-dialog
      v-model="dialogViewImg"
      max-width="800"
      transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-card-actions>
          <v-carousel v-model="indexUrl">
            <v-carousel-item
              v-for="(item, i) in reward.url"
              :key="i"
              :src="item.url"
              :aspect-ratio="16 / 9"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["reward"],
  data() {
    return {
      dialogViewImg: false,
      indexUrl: null,

      showRewardImg: false,
    };
  },

  created() {},

  methods: {
    async handleImages() {
      let files = this.reward.files;
      this.reward.files = [];
      this.reward.url = [];

      if (files.length > 10) {
        this.alertImgOverLimit();
        return;
      }

      files.forEach((item) => {
        if (item.size <= 2500000) {
          this.reward.files.push(item);
          this.reward.url.push({ url: URL.createObjectURL(item) });
        }
      });
    },

    async upload() {
      let files = this.reward.files;

      let formData = new FormData();
      formData.append("id", this.reward.id);
      formData.append("ticket", this.reward.ticket);

      files.forEach((file) => {
        formData.append("files", file);
      });

      let filesUpload = await this.uploadFile(formData);
      // console.log("filesUpload", filesUpload);
      if (!filesUpload) {
        this.alertError();
        return;
      }

      let itemRewardImg = await this.createRewardImg(filesUpload);
    },

    async createRewardImg(filesUpload) {
      console.log("filesUpload", filesUpload);
      let itemRewardImg = await this.$axios
        .post("/api/rewardImg", {
          reward: this.reward,
          rewardImg: filesUpload,
        })
        .then((res) => {
          console.log("res", res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async uploadFile(formData) {
      let filesUpload = await this.$axios
        .post("/api/uploads/reward", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          this.alertError();
          return false;
        });

      return filesUpload;
    },

    async getReward() {
      let reward = await this.$axios
        .get("/api/reward")
        .then((res) => {
          // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });

      // this.$emit("update:reward.RewardImg", reward);
    },

    async viewImg(item) {
      let index = this.reward.url.indexOf(item);
      this.indexUrl = index;
      this.dialogViewImg = true;
    },

    async removeImage(item) {
      let index = this.reward.url.indexOf(item);
      this.reward.url.splice(index, 1);
      this.reward.files.splice(index, 1);
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
