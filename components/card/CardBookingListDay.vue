<template>
  <div>
    {{ focus }}
    {{ items }}
  </div>
</template>

<script>
export default {
  props: ["focus"],

  data() {
    return {
      items: [],
    };
  },

  watch: {
    focus(val) {
      if (val) {
        this.main();
      } else {
        this.main();
      }
    },
  },
  created() {
    this.main();
  },

  methods: {
    async main() {
      this.items = await this.getItems();
    },

    async getItems() {
      let items = await this.$axios
        .post("/api/booking/date", {
          data: this.focus,
        })
        .then((res) => {
          return data;
        })
        .catch((err) => {
          return false;
        });

      return items;
    },
  },
};
</script>

<style lang="scss" scoped></style>
