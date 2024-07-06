<template>
  <div>
    <booking-list />
  </div>
</template>

<script>
import BookingList from "~/components/booking/BookingList.vue";
export default {
  layout: "defaultLayout",
  components: { BookingList },
};
</script>

<style lang="scss" scoped></style>
