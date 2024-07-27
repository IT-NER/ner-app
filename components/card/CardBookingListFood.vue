<template>
  <div>
    <div v-if="ids.length > 0">
      <p v-for="(item, i) in items" :key="i">{{ i + 1 }}. {{ item.name }}</p>
    </div>

    <div v-else>
      <v-alert text prominent type="error" icon="mdi-cloud-alert">
        ไม่มีรายการ
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ids", "dialogView"],
  data() {
    return {
      items: [],
    };
  },

  watch: {
    ids(val) {
      if (val) {
        this.main();
      }
    },
  },
  mounted() {
    this.main();
  },
  methods: {
    async main() {
      this.items = await this.getItems();
    },
    async getItems() {
      let items = await this.$axios
        .post("/api/food/ids", {
          data: this.ids,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return items;
    },
  },
};
</script>
<style lang="scss" scoped></style>
