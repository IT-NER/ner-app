<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-file-input
            label="รูปภาพ"
            v-model="files"
            multiple
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
          <card-pre-view-img :files.sync="files" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardPreViewImg from "~/components/card/CardPreViewImg.vue";
export default {
  components: { CardPreViewImg },

  props: ["id", "item"],
  data() {
    return {
      files: [],
    };
  },

  computed: {
    btnDisable() {
      let data = false;
      if (!this.files.length) {
        data = true;
      }
      return data;
    },
  },

  methods: {
    async upload() {
      let formData = new FormData();
      formData.append("id", Number(this.item.id));
      this.files.forEach((e) => {
        formData.append("files", e);
      });

      await this.$axios
        .post("/api/admin/content/upload/contentImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          this.files = [];
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
      if (!e) {
        return;
      }

      this.files.forEach(async (e) => {
        let size = await this.checkSize(e);
        let type = await this.checkType(e);

        let index = this.files.indexOf(e);
        if (!size) {
          this.files.splice(index, 1);
        }
        if (!type) {
          this.files.splice(index, 1);
        }
      });
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
