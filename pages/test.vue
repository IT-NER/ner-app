<template>
  <div>TEST LAYOUT</div>
</template>

<script>
export default {
  layout: "indexLayout",
  data() {
    return {
      between: null,
    };
  },

  created() {
    this.isBetween();
  },

  methods: {
    isBetween() {
      let a = new Date("2024-01-01T08:00");
      let b = new Date("2024-01-01T12:00");

      let c = new Date("2024-01-01T13:00");

      this.between = this.$moment(c).isBetween(a, b);
    },
  },
};
</script>

<style lang="scss" scoped></style>
