<template>
  <div>
    <form @submit.prevent="save">
      <v-card>
        <v-card-title>
          แบนเนอร์
          <v-spacer></v-spacer>
          <v-btn color="warning" outlined @click="goToIndex">
            <v-icon class="mr-2"> mdi-reply </v-icon>
            กลับหน้าหลัก
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <!-- FormContent -->
          <form-content
            :item.sync="item"
            @updateTimed="updateTimed"
            @updatePublish="updatePublish"
            @updatePublishEnd="updatePublishEnd"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="success" outlined type="submit">
            <v-icon class="mr-2"> mdi-content-save </v-icon>
            บันทึก
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
    </form>

    <v-divider></v-divider>

    <v-row>
      <v-col cols="12" md="6">
        <!-- FormUploadContentCoverImg -->
        <form-upload-content-cover-img :item.sync="item" @getItem="getItem" />
      </v-col>
      <v-col cols="12" md="6">
        <form-upload-content-img :item.sync="item" @getItem="getItem" />
      </v-col>
    </v-row>

    <v-row style="margin-bottom: 100px">
      <v-col cols="12">
        <card-user-received-point :item="item" @getItem="getItem" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardUserReceivedPoint from "~/components/card/CardUserReceivedPoint.vue";
import FormContent from "~/components/form/FormContent.vue";
import FormUploadContentCoverImg from "~/components/form/FormUploadContentCoverImg.vue";
import FormUploadContentImg from "~/components/form/FormUploadContentImg.vue";
export default {
  components: {
    FormContent,
    FormUploadContentCoverImg,
    FormUploadContentImg,
    CardUserReceivedPoint,
  },
  data() {
    return {
      title: "แบนเนอร์",
      item: null,
      path: "/content/banner",

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
      await this.$axios
        .post("/api/admin/content/update/timed", {
          data: this.item,
        })
        .then((res) => {
          this.alertSuccess();
          this.getItem();
        })
        .catch((err) => {
          this.alertError();
        });
    },

    async updatePublish() {
      await this.$axios
        .post("/api/admin/content/update/publish", {
          data: this.item,
        })
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
        .post("/api/admin/content/update/publish/end", {
          data: this.item,
        })
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
        .post("/api/admin/content/update", {
          data: this.item,
        })
        .then((res) => {
          this.getItem();
          this.alertSuccess();
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
