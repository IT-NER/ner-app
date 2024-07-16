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
      let banner = await this.getContentPublicContentBanner();
      console.log("banner", banner);
      let activity = await this.getContentPublicContentActivity();
      console.log("activity", activity);
      let news = await this.getContentPublicContentNews();
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

    async getContentPublicContentBanner() {
      let banner = await this.$axios
        .get("/api/contentPublic/content/banner")
        .then((res) => {
          res.data.forEach((e) => {});
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return banner;
    },
    async getContentPublicContentActivity() {
      let activity = await this.$axios
        .get("/api/contentPublic/content/activity")
        .then((res) => {
          res.data.forEach((e) => {});
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return activity;
    },
    async getContentPublicContentNews() {
      let news = await this.$axios
        .get("/api/contentPublic/content/news")
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
