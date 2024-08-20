<template>
  <div>
    <v-card v-if="item" flat>
      <v-card-title>
        {{ item.name }}
        <v-spacer></v-spacer>
        <v-btn color="warning" outlined @click="goToIndex">
          <v-icon class="mr-2"> mdi-reply </v-icon>
          กลับหน้าหลัก
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <!-- <v-card class="mx-auto" flat> -->
        <!-- <v-card-actions> -->
        <v-carousel
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
            class="mx-auto"
            width="50vw"
          >
          </v-carousel-item>
        </v-carousel>
        <!-- </v-card-actions> -->
        <!-- </v-card> -->
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null,
    };
  },
  created() {
    this.getItem();
  },
  methods: {
    async getItem() {
      this.item = await this.$axios
        .get("/api/reward/" + this.$route.params.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });
    },
    async goToIndex() {
      this.$router.push("/redeem");
    },
  },
};
</script>

<style lang="scss" scoped></style>
