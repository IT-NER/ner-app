<template>
  <div>
    <profile />
  </div>
</template>

<script>
import Profile from "~/components/user/Profile.vue";
export default {
  layout: "profile",
  components: { Profile },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
