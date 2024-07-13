<template>
  <div>
    {{ items }}
  </div>
</template>

<script>
export default {
  props: ["contentIds"],

  data() {
    return {
      items: [],
    };
  },

  watch: {
    contentIds(val) {
      if (val) {
        this.getContentByIds();
      }
    },
  },

  methods: {
    async getContentByIds() {
      this.items = await this.$axios
        .post("/api/content/ids", {
          data: this.contentIds,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>
