<template>
  <div>
    <v-card flat>
      <v-card-title>
        ของรางวัล
        <v-spacer></v-spacer>
        <v-btn color="warning" outlined @click="goToIndex">
          <v-icon class="mr-2"> mdi-reply </v-icon>
          กลับหน้าหลัก
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <card-slide-reward-img :item.sync="item" />
      </v-card-text>
    </v-card>

    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import CardSlideRewardImg from "~/components/card/CardSlideRewardImg.vue";
export default {
  components: { CardSlideRewardImg },
  data() {
    return {
      item: {
        RewardImg: [],
      },
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
