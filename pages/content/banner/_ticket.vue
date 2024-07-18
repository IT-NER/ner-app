<template>
  <div>
    <form @submit.prevent="save">
      <card-content
        :title.sync="title"
        :path.sync="path"
        :content.sync="content"
        :files.sync="files"
      />
    </form>

    <v-divider></v-divider>
    <card-item-content-img :contentImgIds.sync="contentImgIds" @main="main" />
  </div>
</template>

<script>
import CardContent from "~/components/card/CardContent.vue";
import CardItemContentImg from "~/components/card/CardItemContentImg.vue";
export default {
  components: { CardContent, CardItemContentImg },
  data() {
    return {
      title: "BANNER",
      path: "/content/banner",

      content: {
        id: null,
        ticket: null,
        code: null,
        title: null,
        description: null,
        detail: null,
        point: 0,
        active: true,
        ContentImg: [],
        Content: [],
        contentStatusId: null,
        contentTypeId: null,
        userId: null,
        ContentStatus: [],
        ContentType: [],
        User: [],
      },

      files: [],
      contentImgIds: [],
    };
  },

  created() {
    this.main();
  },

  methods: {
    async main() {
      this.content = await this.getContentByTicket();
      // let contentImg = this.content.ContentImg
      let contentImgIds = [];

      this.content.ContentImg.forEach((item) => {
        contentImgIds.push(item.id);
      });
      this.contentImgIds = contentImgIds;
      console.log("contentImgIds", this.contentImgIds);
    },

    async save() {
      let content = await this.update();
      if (!content) {
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

      let contentImg = await this.createContentImg(filesUpload);
      if (!contentImg) {
        this.alertError();
        return;
      }

      await this.main();
      await this.alertSuccess();
      this.files = [];
    },

    async update() {
      let content = await this.$axios
        .put("/api/content/" + this.content.id, {
          data: this.content,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return content;
    },

    async uploadsFiles(formData) {
      let filesUpload = await this.$axios
        .post("/api/uploads-content", formData, {
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

    async createContentImg(filesUpload) {
      let contentImg = await this.$axios
        .post("/api/contentImg", {
          data: {
            content: this.content,
            contentImg: filesUpload,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return contentImg;
    },

    async getContentByTicket() {
      let content = await this.$axios
        .get("/api/content/ticket/" + this.$route.params.ticket)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

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
