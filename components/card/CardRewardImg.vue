<template>
  <div>
    {{ items }}
  </div>
</template>

<script>
export default {
  props: ["rewardImgIds"],

  data() {
    return {
      items: [],
    };
  },

  watch: {
    rewardImgIds(val) {
      if (val) {
        this.getRewardByIds();
      }
    },
  },

  methods: {
    async getRewardByIds() {
      this.items = await this.$axios
        .post("/api/rewardImg/ids", {
          data: this.rewardImgIds,
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
