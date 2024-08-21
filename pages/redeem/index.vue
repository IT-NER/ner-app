<template>
  <div>
    <v-card flat>
      <v-card-title> ของรางวัล </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <card-items-reward :items.sync="items" :user.sync="user" />
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
      user: null,
    };
  },

  async created() {
    await this.getItems();
    await this.getUser();
  },
  methods: {
    async getUser() {
      let user = await this.$auth.$storage.getCookie("user");
      this.user = await this.$axios
        .get("/api/user/" + Number(user.id))
        .then(async (res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
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
