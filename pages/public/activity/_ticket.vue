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
          <v-btn class="mr-2" color="warning" to="/public/activity">
            กลับหน้าหลัก
          </v-btn>
          <v-btn color="primary" type="submit"> บันทึก </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title> CONTENT ACTIVITY </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <form-content :content.sync="content" :files.sync="files" />
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
        <card-content-img
          :content.sync="content"
          @getContentByTicket="getContentByTicket"
          @alertSuccess="alertSuccess"
          @alertError="alertError"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardContentImg from "~/components/card/CardContentImg.vue";
import FormContent from "~/components/form/FormContent.vue";
export default {
  components: { FormContent, CardContentImg },
  layout: "defaultLayout",
  data() {
    return {
      overlay: false,
      content: {
        ticket: this.$route.params.ticket,
        contentTypeId: 2,
        ContentImg: [],
      },

      files: [],
    };
  },

  created() {
    this.getUser();
    this.getContentByTicket();
  },

  methods: {
    async handleFiles() {
      let files = await this.files.filter((item) => item.size < 2000000);
      this.$emit("update:files", files);
    },

    async save() {
      this.overlay = true;

      let content = await this.update();
      if (!content) {
        this.alertError();
        this.overlay = false;
        return;
      }
      if (this.files.length == 0) {
        this.content = await content;
        this.alertSuccess();
      }

      let filesUpload = await this.uploadFile();
      if (!filesUpload) {
        this.alertError();
        this.overlay = false;
        return;
      }

      let contentImg = await this.createContentImg(filesUpload);
      if (!contentImg) {
        this.alertError();
        this.overlay = false;
        return;
      }

      this.content = await this.getContentByTicket();
      this.files = [];
      this.overlay = false;
      this.alertSuccess();
    },

    async uploadFile() {
      let formData = new FormData();
      formData.append("id", this.content.id);
      formData.append("ticket", this.content.ticket);
      this.files.forEach((file) => {
        formData.append("files", file);
      });

      let filesUpload = await this.$axios
        .post("/api/uploads-content", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
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

    async createContentImg(filesUpload) {
      // console.log("filesUpload", filesUpload);
      let contentImg = await this.$axios.post("/api/contentImg", {
        content: this.content,
        contentImg: filesUpload,
      });

      return contentImg;
    },

    async update() {
      let content = await this.$axios
        .put("/api/content/" + this.content.id, {
          data: this.content,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });

      return content;
    },

    async getUser() {
      let user = this.$auth.$storage.getCookie("user");
      this.content.userId = user.id;
    },

    async getContentByTicket() {
      // this.content.ticket = await this.$route.params.ticket;

      let content = await this.$axios
        .post("/api/content/ticket", {
          data: this.content,
        })
        .then((res) => {
          // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
          return false;
        });

      if (!content) {
        this.$router.push("/public/activity");
      }

      this.content = await content;
      return content;
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
