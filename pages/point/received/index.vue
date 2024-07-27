<template>
  <div>
    <card-point-received />
  </div>
</template>

<script>
import CardPointReceived from "~/components/card/CardPointReceived.vue";

export default {
  components: { CardPointReceived },

  data() {
    return {
      bannerIds: [],
      activityIds: [],
      newsIds: [],
      number: null,

      contents: [],
    };
  },

  created() {
    this.main();
  },

  methods: {
    async main() {
      let content = await this.getContentPublish();

      this.bannerIds = [];
      this.activityIds = [];
      this.newsIds = [];

      await content.forEach((item) => {
        if (item.contentTypeId == 1) {
          this.bannerIds.push(item.id);
        } else if (item.contentTypeId == 2) {
          this.activityIds.push(item.id);
        } else if (item.contentTypeId == 3) {
          this.newsIds.push(item.id);
        }
      });

      console.log("bannerIds", this.bannerIds);
      console.log("activityIds", this.activityIds);
      console.log("newsIds", this.newsIds);
    },

    async getContentPublish() {
      let content = await this.$axios
        .get("/api/content/publish")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return content;
    },
  },
};
</script>

<style lang="scss" scoped></style>
