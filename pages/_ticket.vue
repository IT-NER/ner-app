<template>
  <div>
    <card-view-content :ticket.sync="$route.params.ticket" />
  </div>
</template>

<script>
import CardViewContent from "~/components/card/CardViewContent.vue";
export default {
  layout: "blankLayout",
  components: { CardViewContent },
};
</script>

<style lang="scss" scoped></style>
