<template>
  <div>
    <form @submit.prevent="save">
      <v-card flat>
        <v-card-title>
          จิตอาสา
          <v-spacer></v-spacer>
          <v-btn color="warning" outlined @click="goToIndex">
            <v-icon> mdi-reply </v-icon>
            กลับหน้าหลัก
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <!-- FormContent2 -->
          <form-content-2
            :item.sync="item"
            @updateTimed="updateTimed"
            @updatePublish="updatePublish"
            @updatePublishEnd="updatePublishEnd"
          />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-title> อัพโหลดรูปภาพ </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <form-upload-content-cover-img :item.sync="item" />
            </v-col>
            <v-col cols="12">
              <form-upload-content-img :item.sync="item" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title> รูปภาพหน้าปก </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <card-view-content-cover-img :item.sync="item" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title> รูปภาพ </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <card-view-content-img :item.sync="item" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" outlined type="submit">
            <v-icon> mdi-content-save </v-icon>
            บันทึก
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>

    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import CardViewContentImg from "~/components/card/CardViewContentImg.vue";
import CardViewContentCoverImg from "~/components/card/CardViewContentCoverImg.vue";
import FormContent2 from "~/components/form/FormContent2.vue";
import FormUploadContentCoverImg from "~/components/form/FormUploadContentCoverImg.vue";
import FormUploadContentImg from "~/components/form/FormUploadContentImg.vue";
export default {
  components: {
    FormContent2,
    FormUploadContentCoverImg,
    FormUploadContentImg,
    CardViewContentCoverImg,
    CardViewContentImg,
  },
  data() {
    return {
      title: "จิตอาสา",
      item: null,
      path: "/content/volunteer",

      item: {
        id: null,
        start: null,
        end: null,
        timed: true,
        publish: false,
        ticket: null,
        code: null,
        title: null,
        description: null,
        detail: null,
        point: 0,
        contentStatusId: null,
        contentTypeId: null,
        userId: null,
        active: null,
        ContentStatus: null,
        ContentType: null,
        User: null,
        contentCoverImgId: null,
        ContentImg: [],
        ContentCoverImg: [],
        PointReceived: [],

        dateStart: this.$moment().format("YYYY-MM-DD"),
        dateEnd: this.$moment().format("YYYY-MM-DD"),
        dateStartModal: false,
        dateEndModal: false,

        timeStart: this.$moment().format("00:00"),
        timeEnd: this.$moment().format("00:00"),
        timeStartModal: false,
        timeEndModal: false,
      },
    };
  },

  created() {
    this.getItem();
  },

  methods: {
    async updateTimed() {
      this.item.dateStart = this.$moment().format("YYYY-MM-DD");
      this.item.dateEnd = this.$moment().format("YYYY-MM-DD");
      this.item.timeStart = this.$moment().format("00:00");
      this.item.timeEnd = this.$moment().format("00:00");
      // await this.$axios
      //   .get("/api/admin/content/update/timed/" + this.$route.params.id)
      //   .then((res) => {
      //     this.alertSuccess();
      //     this.getItem();
      //   })
      //   .catch((err) => {
      //     this.alertError();
      //   });
    },

    async updatePublish() {
      await this.$axios
        .get("/api/admin/content/update/publish/" + this.$route.params.id)
        .then((res) => {
          this.alertSuccess();
          this.getItem();
        })
        .catch((err) => {
          this.alertError();
        });
    },
    async updatePublishEnd() {
      await this.$axios
        .get("/api/admin/content/update/publish/end/" + this.$route.params.id)
        .then((res) => {
          this.alertSuccess();
          this.getItem();
        })
        .catch((err) => {
          this.alertError();
        });
    },

    async save() {
      await this.setDateTime();
      await this.update();
    },

    async update() {
      await this.$axios
        .put("/api/admin/content/" + this.$route.params.id, {
          data: {
            start: this.item.start,
            end: this.item.end,
            title: this.item.title,
            description: this.item.description,
            detail: this.item.detail,
            point: this.item.point,
            timed: this.item.timed,
            publish: this.item.publish,
          },
        })
        .then((res) => {
          this.getItem();
          this.alertSuccess();
          // return res.data;
        })
        .catch((err) => {
          this.alertError();
        });
    },

    async setDateTime() {
      this.item.start = new Date(
        this.item.dateStart + "T" + this.item.timeStart
      );
      this.item.end = new Date(this.item.dateEnd + "T" + this.item.timeEnd);
    },

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
    async goToIndex() {
      this.$router.push(this.path);
    },
    async getItem() {
      this.item = await this.$axios
        .get("/api/admin/content/" + this.$route.params.id)
        .then((res) => {
          if (!res.data) {
            this.$router.push(String(this.path));
          }
          res.data["dateStart"] = this.$moment(new Date(res.data.start)).format(
            "YYYY-MM-DD"
          );
          res.data["timeStart"] = this.$moment(new Date(res.data.start)).format(
            "HH:mm"
          );

          res.data["dateEnd"] = this.$moment(new Date(res.data.end)).format(
            "YYYY-MM-DD"
          );
          res.data["timeEnd"] = this.$moment(new Date(res.data.end)).format(
            "HH:mm"
          );
          return res.data;
        })
        .catch((err) => {
          this.$router.push(String(this.path));
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
