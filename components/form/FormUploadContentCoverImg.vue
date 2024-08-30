<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-file-input
            label="รูปภาพหน้าปก"
            v-model="file"
            @change="handleFiles"
            hide-details
            accept="image/jpeg,image/png"
            small-chips
          >
            <template v-slot:append>
              <v-btn
                :disabled="btnDisable"
                :v-show="!btnDisable"
                color="success"
                outlined
                @click="upload"
                class="mt-n2"
              >
                <v-icon>mdi-cloud-upload</v-icon>
                อัพโหลด</v-btn
              >
            </template>
          </v-file-input>
        </v-col>
      </v-row>
      <v-row v-if="!btnDisable">
        <v-col cols="12">
          <card-pre-view-cover-img :file.sync="file" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardPreViewCoverImg from "~/components/card/CardPreViewCoverImg.vue";
export default {
  components: { CardPreViewCoverImg },

  props: ["id", "item"],
  data() {
    return {
      file: null,
    };
  },

  computed: {
    btnDisable() {
      let data = false;
      if (!this.file) {
        data = true;
      }
      return data;
    },
  },

  methods: {
    async upload() {
      let formData = new FormData();
      formData.append("id", Number(this.item.id));
      formData.append("file", this.file);

      await this.$axios
        .post("/api/admin/content/upload/contentCoverImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          this.file = null;
          this.$emit("update:item", await res.data);
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
