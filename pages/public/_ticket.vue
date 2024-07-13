<template>
  <div>
    {{ items }}
  </div>
</template>

<script>
export default {
  props: ["items"],

  created() {
    this.main();
  },
};
</script>

<style lang="scss" scoped></style>
