<template>
  <div>
    <v-divider></v-divider>
    <!-- CardItemContentBanner -->
    <card-item-content-banner />
    <v-divider></v-divider>

    <!-- CardItemContentActivity -->
    <card-item-content-activity />
    <v-divider></v-divider>

    <!-- CardItemContentNews -->
    <card-item-content-news />
    <v-divider></v-divider>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import CardItemContentBanner from "~/components/card/CardItemContentBanner.vue";
import CardItemContentActivity from "~/components/card/CardItemContentActivity.vue";
import CardItemContentNews from "~/components/card/CardItemContentNews.vue";
export default {
  components: {
    CardItemContentBanner,
    CardItemContentActivity,
    CardItemContentNews,
  },

  created() {
    this.updateContentTimedOut();
  },

  methods: {
    async updateContentTimedOut() {
      await this.$axios.get("/api/content/update/timeout");
    },
  },
};
</script>

<style lang="scss" scoped></style>
