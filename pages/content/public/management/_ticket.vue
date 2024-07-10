<template>
  <div>
    <!-- overlay -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- form -->
    <form @submit.prevent="save">
      <card-content-public
        :contentPublic.sync="contentPublic"
        :contents.sync="contents"
      />
    </form>

    <!-- {{ contentPublic.Content }} -->
    <card-content :content.sync="contentPublic.Content" />
  </div>
</template>

<script>
import CardContent from "~/components/card/CardContent.vue";
import CardContentPublic from "~/components/card/CardContentPublic.vue";
export default {
  components: { CardContentPublic, CardContent },
  data() {
    return {
      overlay: false,

      contentPublic: {
        id: null,
        ticket: null,
        start: null,
        end: null,
        timed: true,
        remark: null,
        active: true,
        public: true,
        Content: {
          id: null,
          ticket: null,
          code: null,
          title: null,
          description: null,
          detail: null,
          point: null,
          ContentImg: [],
        },
        contentId: null,
        User: [],
        userId: null,
      },

      contents: [],
    };
  },

  created() {
    this.getContentPublicByTicket();
    this.getContent();
  },

  methods: {
    async save() {
      console.log("contentPublic", this.contentPublic);

      let contentPublic = await this.updateContentPublic();
      if (!contentPublic) {
        this.alertError();
        return;
      }

      await this.getContentPublicByTicket();
      await this.getContent();
      await this.alertSuccess();
    },

    async updateContentPublic() {
      let contentPublic = await this.$axios
        .put("/api/contentPublic/" + Number(this.contentPublic.id), {
          data: this.contentPublic,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return contentPublic;
    },

    async getContent() {
      this.contents = await this.$axios
        .get("/api/contents")
        .then((res) => {
          res.data.forEach((e) => {
            e["name"] =
              e.ticket +
              " / " +
              e.title +
              " / " +
              e.ContentType.name +
              " / " +
              e.ContentStatus.name;
          });
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },

    async getContentPublicByTicket() {
      this.contentPublic = await this.$axios
        .get("/api/contentPublic/ticket/" + this.$route.params.ticket)
        .then((res) => {
          if (res.data.start && res.data.end) {
            res.data.start = this.$moment(res.data.start).format(
              "YYYY-MM-DDTHH:mm"
            );
            res.data.end = this.$moment(res.data.end).format(
              "YYYY-MM-DDTHH:mm"
            );
          }

          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          return false;
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
  },
};
</script>

<style lang="scss" scoped></style>
