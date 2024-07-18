<template>
  <div>
    <form @submit.prevent="save">
      <card-content
        :title.sync="title"
        :path.sync="path"
        :content.sync="content"
      />
    </form>
  </div>
</template>

<script>
import CardContent from "~/components/card/CardContent.vue";
export default {
  components: { CardContent },

  data() {
    return {
      title: "ประชาสัมพันธ์",
      path: "/content",
      content: {
        id: null,
        ticket: null,
        start: null,
        end: null,
        timed: true,
        remark: null,
        active: true,
        content: true,
        Content: [],
        contentId: null,
        User: [],
        userId: null,

        dateStart: this.$moment(new Date()).format("YYYY-MM-DD"),
        dateEnd: this.$moment(new Date()).format("YYYY-MM-DD"),
        dateStartModal: false,
        dateEndModal: false,

        timeStart: this.$moment(new Date()).format("HH:mm"),
        timeEnd: this.$moment(new Date()).format("HH:mm"),
        timeStartModal: false,
        timeEndModal: false,
      },
    };
  },
  created() {
    this.main();
  },

  methods: {
    async main() {
      this.content = await this.getContentByTicket();
    },

    async getContentByTicket() {
      let content = await this.$axios
        .get("/api/content/ticket/" + this.$route.params.ticket)
        .then((res) => {
          res.data["contentIdBefore"] = res.data.contentId;
          if (res.data.start || res.data.end) {
            res.data["dateStart"] = this.$moment(
              new Date(res.data.start)
            ).format("YYYY-MM-DD");
            res.data["timeStart"] = this.$moment(
              new Date(res.data.start)
            ).format("HH:mm");

            res.data["dateEnd"] = this.$moment(new Date(res.data.end)).format(
              "YYYY-MM-DD"
            );
            res.data["timeEnd"] = this.$moment(new Date(res.data.end)).format(
              "HH:mm"
            );
          } else {
            res.data["dateStart"] = this.$moment(new Date()).format(
              "YYYY-MM-DD"
            );
            res.data["dateEnd"] = this.$moment(new Date()).format("YYYY-MM-DD");
            res.data["timeStart"] = this.$moment(new Date()).format("HH:mm");
            res.data["timeEnd"] = this.$moment(new Date()).format("HH:mm");
          }
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return content;
    },

    async save() {
      if (!this.content.contentId) {
        this.alertPleaseSelectedContent();
        return;
      }

      this.content.start = new Date(
        this.content.dateStart + "T" + this.content.timeStart
      );
      this.content.end = new Date(
        this.content.dateEnd + "T" + this.content.timeEnd
      );

      // console.log("start", this.content.start);
      // console.log("end", this.content.end);
      // return;

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

      if (!content) {
        this.alertError();
        return;
      }

      await this.main();
      await this.alertSuccess();
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

    async alertPleaseSelectedContent() {
      this.$swal.fire({
        type: "warning",
        title: "กรุณาเลือกเนื้อหาประชาสัมพันธ์",
      });
    },
  },
};
</script>
