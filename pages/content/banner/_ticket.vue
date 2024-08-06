<template>
  <div>
    <form @submit.prevent="save">
      <v-card>
        <v-toolbar elevation="0">
          <div class="title">{{ title }}</div>
          <v-spacer></v-spacer>
          <v-btn color="warning" outlined @click="goToIndex">
            กลับหน้าหลัก
          </v-btn>
          <v-btn color="success" outlined type="submit"> บันทึก </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <form-content :item.sync="item" />
        </v-card-text>
      </v-card>
    </form>

    <v-row>
      <v-col cols="12" md="6">
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            รูปภาพหน้าปก
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!img1"
              color="success"
              outlined
              @click="uploadImg1"
              >อัพโหลด</v-btn
            >
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-file-input v-model="img1" label="เพิ่มรูปภาพ"></v-file-input>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6"></v-col>
    </v-row>
  </div>
</template>

<script>
import FormContent from "~/components/form/FormContent.vue";
export default {
  components: { FormContent },
  data() {
    return {
      title: "BANNER",
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
        point: null,
        contentStatusId: null,
        contentTypeId: null,
        userId: null,
        active: null,
        ContentStatus: null,
        ContentType: null,
        User: null,
        ContentImg: [],
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

      img1: null,
      img2: null,
    };
  },

  created() {
    this.getItem();
  },

  methods: {
    async uploadImg1() {
      if (this.img1.size > 2000000) {
        this.img1 = null;
        this.alertOverSize();
        return;
      }
      if (this.img1.type != "image/jpeg") {
        this.img1 = null;
        this.alertErrorType();
        return;
      }

      console.log("img1", this.img1);

      let formData = new FormData();
    },

    async save() {
      await this.setDateTime();
      await this.$axios
        .put("/api/content/" + this.item.id, {
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
    async goToIndex() {
      this.$router.push(this.path);
    },
    async getItem() {
      this.item = await this.$axios
        .get("/api/content/ticket/" + this.$route.params.ticket)
        .then((res) => {
          console.log(res.data);
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
