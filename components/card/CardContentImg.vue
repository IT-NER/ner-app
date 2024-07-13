<template>
  <div>
    {{ items }}
  </div>
</template>

<script>
export default {
  props: ["contentImgIds"],

  data() {
    return {
      items: [],
    };
  },

  watch: {
    contentImgIds(val) {
      if (val) {
        this.getContentByIds();
      }
    },
  },

  methods: {
    async getContentByIds() {
      this.items = await this.$axios
        .post("/api/contentImg/ids", {
          data: this.contentImgIds,
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
