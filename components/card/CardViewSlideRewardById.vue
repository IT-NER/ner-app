<template>
  <div>
    <v-card flat width="150" class="mx-auto">
      <v-card-actions>
        {{ item.name }}
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <v-carousel
          v-model="index"
          cycle
          hide-delimiter-background
          hide-delimiters
          show-arrows-on-hover
          height="auto"
        >
          <v-carousel-item
            v-for="(list, i) in item.RewardImg"
            :key="i"
            :src="list.url"
            width="150"
            :aspect-ratio="16 / 9"
            class="mx-auto"
          >
          </v-carousel-item>
        </v-carousel>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      item: {
        RewardImg: [],
      },
      index: 0,
    };
  },

  created() {
    this.getItem();
  },

  watch: {
    id(val) {
      if (val) {
        this.getItem();
      }
    },
  },

  methods: {
    async getItem() {
      this.item = await this.$axios
        .get("/api/admin/reward/" + this.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
