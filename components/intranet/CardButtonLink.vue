<template>
  <div>
    <v-btn
      color="success"
      tile
      block
      dark
      v-for="(item, i) in items"
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
      items: [
        {
          text: "ERP",
          url: "https://nererp-uat.sandbox.operations.dynamics.com/",
        },
        {
          text: "E-Leave",
          url: "http://49.231.250.122:50433/LoginERS/MainERS/Default.aspx",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
