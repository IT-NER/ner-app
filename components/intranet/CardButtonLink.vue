<template>
  <div>
    <v-btn
      color="success"
      tile
      block
      dark
      v-for="(item, i) in buttonLinks"
      :key="i"
      :href="item.url"
      target="_blank"
      outlined
    >
      {{ item.text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonLinks: [],

      buttonLink: {
        id: null,
        ticket: null,
        remark: null,
        active: null,
        User: null,
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
