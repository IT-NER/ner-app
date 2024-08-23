<template>
  <div>
    <v-card flat>
      <v-card-title> รูปโปรไฟล์ </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-avatar color="primary" size="300px">
          <v-img v-if="item.img" :src="item.img" />
          <v-img
            v-else
            src="https://investor.nerubber.com/themes/default/assets/static/images/logo-stroke.png"
          />
        </v-avatar>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <v-file-input
          label="เพิ่มรูปภาพ"
          accept="image/jpeg, image/png"
          counter
          show-size
          v-model="file"
          @change="handleFiles"
          clearable
        >
          <template v-slot:append>
            <v-btn color="success" outlined :disabled="!file" @click="upload">
              <v-icon class="mr-2">mdi-cloud-upload</v-icon>
              อัพโหลด
            </v-btn>
          </template>
        </v-file-input>
      </v-card-actions>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      file: null,
    };
  },

  methods: {
    async upload() {
      let formData = new FormData();
      formData.append("id", Number(this.item.id));
      formData.append("file", this.file);

      await this.$axios
        .post("/api/user/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          this.file = null;
          this.$emit("getItem");
          await this.alertSuccess();
        })
        .catch((err) => {
          this.alertError();
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

    async handleFiles(e) {
      console.log("e", e);

      if (!e) {
        return;
      }

      let size = await this.checkSize(e);
      let type = await this.checkType(e);
      console.log("size", size);
      console.log("type", type);

      if (!size) {
        this.file = null;
      }
      if (!type) {
        this.file = null;
      }
    },
    async checkSize(item) {
      let data = false;
      if (item.size <= 3000000) {
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
  },
};
</script>

<style lang="scss" scoped></style>
