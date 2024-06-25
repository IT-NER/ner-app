<template>
  <div>
    <booking-calendar />
  </div>
</template>

<script>
import BookingCalendar from "~/components/booking/BookingCalendar.vue";
export default {
  layout: "booking",
  components: { BookingCalendar },
};
</script>

<style lang="scss" scoped></style>
