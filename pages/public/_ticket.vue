<template>
  <div>
    <form @submit.prevent="save">
      <card-content-public
        :title.sync="title"
        :path.sync="path"
        :contentPublic.sync="contentPublic"
      />
    </form>
  </div>
</template>

<script>
import CardContentPublic from "~/components/card/CardContentPublic.vue";
export default {
  components: { CardContentPublic },

  data() {
    return {
      title: "ประชาสัมพันธ์",
      path: "/public",
      contentPublic: {
        id: null,
        ticket: null,
        start: null,
        end: null,
        timed: true,
        remark: null,
        active: true,
        public: true,
        Content: [],
        contentId: null,
        User: [],
        userId: null,
      },
    };
  },
  created() {
    this.main();
  },

  methods: {
    async main() {
      this.contentPublic = await this.getPublicByTicket();
    },

    async getPublicByTicket() {
      let contentPublic = await this.$axios
        .get("/api/contentPublic/ticket/" + this.$route.params.ticket)
        .then((res) => {
          res.data["contentIdBefore"] = res.data.contentId;
          res.data["start"] = this.$moment(new Date(res.data.start)).format(
            "YYYY-MM-DDTHH:mm"
          );
          res.data["end"] = this.$moment(new Date(res.data.end)).format(
            "YYYY-MM-DDTHH:mm"
          );
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return contentPublic;
    },

    async save() {
      console.log("contentPublic", this.contentPublic);

      let contentPublic = await this.$axios
        .put("/api/contentPublic/" + this.contentPublic.id, {
          data: this.contentPublic,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      if (!contentPublic) {
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
  },
};
</script>
