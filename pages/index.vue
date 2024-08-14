<template>
  <div>
    <v-divider></v-divider>
    <!-- CardItemContentActivity -->
    <card-item-content-banner />
    <v-divider></v-divider>

    <!-- CardItemContentBanner -->
    <!-- <card-item-content-activity :contentIds.sync="activityIds" /> -->
    <!-- <v-divider></v-divider> -->

    <!-- CardItemContentNews -->
    <!-- <card-item-content-news :contentIds.sync="newsIds" /> -->
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
};
</script>

<style lang="scss" scoped></style>
