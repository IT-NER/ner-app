<template>
  <div>
    <v-card>
      <v-card-title>
        รูปภาพคอนเทนต์
        <v-spacer></v-spacer>
        <v-btn
          :disabled="showBtnUpload"
          color="success"
          outlined
          @click="upload"
        >
          <v-icon class="mr-2">mdi-cloud-upload</v-icon>
          อัพโหลด
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-file-input
          v-model="files"
          label="เพิ่มรูปภาพ"
          hide-details
          multiple
          accept="image/jpeg,image/png"
        ></v-file-input>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text v-if="this.item.ContentImg.length > 0">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="3"
              v-for="(item, i) in this.item.ContentImg"
              :key="i"
            >
              <v-card @click.stop="viewImg(item)">
                <v-card-actions>
                  <v-img
                    :src="`/uploads/content/${item.name}`"
                    :aspect-ratio="16 / 9"
                  >
                    <template v-slot:default>
                      <v-row>
                        <v-col cols="12" class="text-right">
                          <v-btn
                            color="warning"
                            x-small
                            fab
                            @click.stop="removeItemContentImg(item)"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </template>
                  </v-img>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
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
      width="800px"
    >
      <v-card>
        <v-card-actions>
          <v-carousel v-model="index" hide-delimiters height="auto">
            <v-carousel-item
              v-for="(item, i) in this.item.ContentImg"
              :key="i"
              :src="`/uploads/content/${item.name}`"
            >
            </v-carousel-item>
          </v-carousel>
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
      files: [],
      index: 0,
    };
  },

  computed: {
    showBtnUpload() {
      if (this.files.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    async viewImg(item) {
      let index = this.item.ContentImg.indexOf(item);
      this.index = index;
      this.dialog = true;
    },
    async removeItemContentImg(item) {
      console.log("item", item);
      await this.$axios
        .delete("/api/contentImg/" + item.id)
        .then((res) => {
          this.$emit("getItem");
          this.alertSuccess();
          return;
        })
        .catch((err) => {
          this.alertError();
          return;
        });
    },
    async checkSize(item) {
      let data = false;
      if (item.size <= 2000000) {
        data = true;
      }
      return data;
    },
    async checkType(item) {
      let data = false;
      if (item.type == "image/jpeg") {
        data = true;
      }
      if (item.type == "image/png") {
        data = true;
      }
      return data;
    },
    async upload() {
      let filesUpload = [];
      this.files.forEach(async (e) => {
        let size = await this.checkSize(e);
        let type = await this.checkType(e);
        // console.log("size", size);
        // console.log("type", type);

        if (size && type) {
          filesUpload.push(e);
        }
      });

      if (filesUpload.length > 0) {
        this.files = filesUpload;
      }

      let formData = new FormData();
      this.files.forEach((e) => {
        formData.append("files", e);
      });

      let file = await this.uploadsImg(formData);
      if (!file) {
        this.alertError();
        return;
      }
      let contentImg = await this.createContentImg(file);
      if (!contentImg) {
        this.alertError();
        return;
      }

      this.$emit("getItem");
      this.alertSuccess();
      this.files = [];
    },

    async uploadsImg(formData) {
      let filesUpload = await this.$axios
        .post("/api/uploads-content-array", formData, {
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

    async createContentImg(file) {
      let data = await this.$axios
        .post("/api/contentImg", {
          data: {
            content: this.item,
            contentImg: file,
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
        title: "ไฟล์ภาพต้องใช้ไฟล์ JPEG เท่านั้น",
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
