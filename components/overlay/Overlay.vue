<template>
  <v-overlay :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: ["overlay"],
};
</script>

<style lang="scss" scoped></style>
