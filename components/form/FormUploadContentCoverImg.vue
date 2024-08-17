<template>
  <div>
    <v-card>
      <v-card-title>
        รูปภาพหน้าปก
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!item.filesContentCoverImg"
          color="success"
          outlined
          @click="upload"
        >
          <v-icon class="mr-2">mdi-cloud-upload</v-icon>
          อัพโหลด</v-btn
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-file-input
          v-model="item.filesContentCoverImg"
          label="เพิ่มรูปภาพ"
          hide-details
          accept="image/jpeg,image/png"
        ></v-file-input>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text v-if="this.item.ContentCoverImg">
        <a>
          <v-img
            :src="`/uploads/content/${this.item.ContentCoverImg.name}`"
            :aspect-ratio="16 / 9"
            @click="viewImg"
          />
        </a>
      </v-card-text>
      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          ยังไม่มีรูปภาพ
        </v-alert>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="dialog"
      transition="dialog-transition"
      height="auto"
      max-width="800"
    >
      <v-card>
        <v-card-actions>
          <v-img
            v-if="this.item.ContentCoverImg"
            :src="`/uploads/content/${this.item.ContentCoverImg.name}`"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["item"],

  data() {
    return {
      dialog: false,
      filesContentCoverImg: null,
    };
  },

  methods: {
    async viewImg() {
      this.dialog = true;
    },
    async checkSize() {
      let data = false;
      if (this.item.filesContentCoverImg.size <= 2000000) {
        data = true;
      }
      return data;
    },
    async checkType() {
      let data = false;
      if (this.item.filesContentCoverImg.type == "image/jpeg") {
        data = true;
      }
      if (this.item.filesContentCoverImg.type == "image/png") {
        data = true;
      }
      return data;
    },
    async upload() {
      let size = this.checkSize();
      if (!size) {
        this.item.filesContentCoverImg = null;
        this.alertOverSize();
        return;
      }
      let type = this.checkType();
      if (!type) {
        this.item.filesContentCoverImg = null;
        this.alertErrorType();
        return;
      }

      let formData = new FormData();
      formData.append("file", this.item.filesContentCoverImg);

      let file = await this.uploadsCoverImg(formData);
      console.log("file", file);
      if (!file) {
        this.alertError();
        return;
      }
      let contentCoverImg = await this.createContentCoverImg(file);
      if (!contentCoverImg) {
        this.alertError();
        return;
      }

      this.$emit("getItem");
      await this.alertSuccess();
      this.item.filesContentCoverImg = null;
    },

    async uploadsCoverImg(formData) {
      let filesUpload = await this.$axios
        .post("/api/uploads-content-single", formData, {
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

    async createContentCoverImg(file) {
      let data = await this.$axios
        .post("/api/contentCoverImg", {
          data: {
            content: this.item,
            contentCoverImg: file,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return data;
    },

    // alert
    async alertOverSize() {
      this.$swal.fire({
        type: "error",
        title: "ไฟล์ภาพใหญ่กว่า 2 MB",
      });
    },
    async alertErrorType() {
      this.$swal.fire({
        type: "error",
        title: "ไฟล์ไม่ถูกต้อง",
        text: "อนุญาตไฟล์ .jpg/.png เท่านั้น",
      });
    },
    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
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
