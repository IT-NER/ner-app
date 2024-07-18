<template>
  <div>
    <v-divider></v-divider>
    <card-item-content-banner :contentIds.sync="bannerIds" />
    <v-divider></v-divider>
    <card-item-content-activity :contentIds.sync="activityIds" />
    <v-divider></v-divider>
    <card-item-content-news :contentIds.sync="newsIds" />
  </div>
</template>

<script>
import CardItemContentActivity from "~/components/card/CardItemContentActivity.vue";
import CardItemContentBanner from "~/components/card/CardItemContentBanner.vue";
import CardItemContentNews from "~/components/card/CardItemContentNews.vue";
export default {
  components: {
    CardItemContentBanner,
    CardItemContentActivity,
    CardItemContentNews,
  },
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
