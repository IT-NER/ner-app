<template>
  <div>
    <v-btn outlined color="warning" :to="path"> กลับหน้าหลัก </v-btn>
  </div>
</template>

<script>
export default {
  props: ["path"],
};
</script>

<style lang="scss" scoped></style>
