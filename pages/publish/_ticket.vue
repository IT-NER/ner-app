<template>
  <div>
    <form @submit.prevent="save">
      <card-publish
        :title.sync="title"
        :path.sync="path"
        :publish.sync="publish"
      />
    </form>
  </div>
</template>

<script>
import CardPublish from "~/components/card/CardPublish.vue";
export default {
  components: { CardPublish },

  data() {
    return {
      title: "ประชาสัมพันธ์",
      path: "/publish",
      publish: {
        id: null,
        ticket: null,
        start: null,
        end: null,
        timed: true,
        remark: null,
        active: true,
        publish: true,
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
      this.publish = await this.getPublishByTicket();
    },

    async getPublishByTicket() {
      let publish = await this.$axios
        .get("/api/publish/ticket/" + this.$route.params.ticket)
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

      return publish;
    },

    async save() {
      if (!this.publish.contentId) {
        this.alertPleaseSelectedContent();
        return;
      }

      this.publish.start = new Date(
        this.publish.dateStart + "T" + this.publish.timeStart
      );
      this.publish.end = new Date(
        this.publish.dateEnd + "T" + this.publish.timeEnd
      );

      // console.log("start", this.publish.start);
      // console.log("end", this.publish.end);
      // return;

      let publish = await this.$axios
        .put("/api/publish/" + this.publish.id, {
          data: this.publish,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      if (!publish) {
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
