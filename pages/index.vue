<template>
  <div>
    <card-item-content-banner
      :contentIds.sync="bannerIds"
      v-if="bannerIds.length > 0"
    />
    <v-card v-else flat>
      <v-card-title> แบนเนอร์ </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          COMING SOON
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardItemContentBanner from "~/components/card/CardItemContentBanner.vue";
export default {
  components: { CardItemContentBanner },
  data() {
    return {
      bannerIds: [],
      activityIds: [],
      newsIds: [],
      number: null,
    };
  },

  created() {
    this.main();
  },
  methods: {
    async main() {
      let banner = await this.getPublishContentBanner();
      console.log("banner", banner);
      let activity = await this.getPublishContentActivity();
      console.log("activity", activity);
      let news = await this.getPublishContentNews();
      console.log("news", news);

      if (banner) {
        banner.forEach((e) => {
          this.bannerIds.push(e.contentId);
        });
      }

      if (activity) {
        activity.forEach((e) => {
          this.activityIds.push(e.contentId);
        });
      }

      if (news) {
        news.forEach((e) => {
          this.newsIds.push(e.contentId);
        });
      }
    },

    async getPublishContentBanner() {
      let banner = await this.$axios
        .get("/api/publish/content/banner")
        .then((res) => {
          res.data.forEach((e) => {});
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return banner;
    },
    async getPublishContentActivity() {
      let activity = await this.$axios
        .get("/api/publish/content/activity")
        .then((res) => {
          res.data.forEach((e) => {});
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return activity;
    },
    async getPublishContentNews() {
      let news = await this.$axios
        .get("/api/publish/content/news")
        .then((res) => {
          res.data.forEach((e) => {});
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return news;
    },
  },
};
</script>

<style lang="scss" scoped></style>
