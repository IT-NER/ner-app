<template>
  <div>
    <booking-management />
  </div>
</template>

<script>
import BookingManagement from "~/components/booking/BookingManagement.vue";

export default {
  layout: "bookingLayout",
  components: { BookingManagement },
};
</script>

<style lang="scss" scoped></style>
