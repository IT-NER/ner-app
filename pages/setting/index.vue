<template>
  <div></div>
</template>

<script>
export default {
  layout: "setting",

  created() {
    this.goToSettingUser();
  },

  methods: {
    async goToSettingUser() {
      this.$router.push("/setting/user");
    },
  },
};
</script>

<style lang="scss" scoped></style>
