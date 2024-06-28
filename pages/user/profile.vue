<template>
  <div>
    <profile />
  </div>
</template>

<script>
import Profile from "~/components/user/Profile.vue";
export default {
  layout: "profileLayout",
  components: { Profile },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
