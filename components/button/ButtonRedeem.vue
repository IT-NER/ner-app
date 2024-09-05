<template>
  <div>
    <v-btn
      color="success"
      outlined
      x-large
      v-if="item.active"
      :disabled="!show"
      @click="$emit('redeemItem', item)"
    >
      ใช้ {{ item.point }} พอยท์
      <v-icon class="mx-2">mdi-swap-horizontal</v-icon>
      แลกของรางวัล
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ["item", "show"],
};
</script>

<style lang="scss" scoped></style>
