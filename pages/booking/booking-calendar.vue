<template>
  <div>
    <booking-calendar />
  </div>
</template>

<script>
import BookingCalendar from "~/components/booking/BookingCalendar.vue";
export default {
  components: { BookingCalendar },

  data() {
    return {
      bookings: [],
      booking: {
        id: null,
        start: null,
        end: null,
        name: null,
        color: null,
        timed: true,
        url: null,
        description: null,
        chairman: null,
        quantity: null,
        meetingId: null,
        meetingPassword: null,
        UserId: null,
        ApproveBy: null,
        MeetingTypeId: null,
        RoomId: null,
        ProgramId: null,
        StatusId: null,
        UserPhoneNumber: null,
        MeetingType: null,
        Program: null,
        Room: null,
        Status: null,
        User: null,
        BookingDevice: null,
        BookingDrink: null,
        BookingFood: null,
      },

      bookingListDay: [],
      bookingListAll: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
