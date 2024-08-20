<template>
  <div>
    <v-card flat>
      <v-card-title> ของรางวัล </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <card-items-reward :items.sync="items" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardItemsReward from "~/components/card/CardItemsReward.vue";
export default {
  components: {
    CardItemsReward,
  },
  data() {
    return {
      items: [],
      item: {
        id: null,
        ticket: null,
        code: null,
        name: null,
        description: null,
        point: null,
        userId: null,
        active: null,
      },
    };
  },

  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.items = await this.$axios
        .get("/api/rewards")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
