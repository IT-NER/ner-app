<template>
  <div>
    <v-chip
      v-for="(item, i) in Room"
      :key="i"
      label
      :color="item.color"
      dark
      class="ma-2"
    >
      {{ item.name }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: ["Room"],
};
</script>

<style lang="scss" scoped></style>
