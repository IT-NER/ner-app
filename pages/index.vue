<template>
  <div>
    <!-- banner -->
    <content-banner :itemsBanner.sync="itemsBanner" />

    <!-- activity -->
    <content-activity :itemsActivity.sync="itemsActivity" />
  </div>
</template>

<script>
import ContentBanner from "~/components/content/ContentBanner.vue";
import ContentActivity from "~/components/content/ContentActivity.vue";

export default {
  components: { ContentBanner, ContentActivity },

  data() {
    return {
      itemsBanner: [],
      itemsActivity: [],
      itemsNews: [],
    };
  },

  created() {
    // this.main();
    this.getContentPublicContentBanner();
    this.getContentPublicContentActivity();
  },
  methods: {
    async getContentPublicContentActivity() {
      this.itemsActivity = await this.$axios
        .get("/api/contentPublic/content/activity")
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });
    },

    async getContentPublicContentBanner() {
      this.itemsBanner = await this.$axios
        .get("/api/contentPublic/content/banner")
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });
    },

    async main() {
      let items = await this.getContentAll();
      if (!items) {
        return;
      }

      await this.setItemsContent(items);
    },

    async setItemsContent(items) {
      items.forEach((item) => {
        if (item.Content.contentTypeId == 1) {
          this.itemsBanner.push(item.Content);
        }
        if (item.Content.contentTypeId == 2) {
          this.itemsActivity.push(item.Content);
        }
        if (item.Content.contentTypeId == 3) {
          this.itemsNews.push(item.Content);
        }
      });
    },

    async getContentAll() {
      let items = await this.$axios
        .get("/api/contentPublic/content")
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });

      return items;
    },
  },
};
</script>

<style lang="scss" scoped></style>
