<template>
  <div></div>
</template>

<script>
export default {
  layout: "settingLayout",

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
