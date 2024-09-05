<template>
  <div>
    <!-- {{ items }} -->

    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-carousel
            cycle
            hide-delimiter-background
            hide-delimiters
            show-arrows-on-hover
            height="auto"
          >
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.ContentCoverImg.url"
              :aspect-ratio="16 / 9"
              width="100vw"
            >
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "blankLayout",
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      this.items = await this.$axios
        .get("/api/content/publish/banner")
        .then((res) => {
          let items = [];
          res.data.forEach((e) => {
            if (e.ContentCoverImg) {
              items.push(e);
            }
          });
          //   return res.data;
          return items;
        })
        .catch((err) => {
          return [];
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
