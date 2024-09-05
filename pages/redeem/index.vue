<template>
  <div>
    <v-card flat v-if="items.length">
      <v-card-title>
        <span>
          ของรางวัล
          <small class="ml-2 success--text"> (สามารถแลกได้) </small>
        </span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <card-items-reward :items.sync="items" :user.sync="user" />
      </v-card-text>
      <v-divider></v-divider>
    </v-card>

    <v-card flat v-if="items2.length">
      <v-card-title>
        <span>
          ของรางวัล
          <small class="ml-2 error--text"> (หมดสต๊อก) </small>
        </span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <card-items-reward-not-active :items.sync="items2" :user.sync="user" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardItemsReward from "~/components/card/CardItemsReward.vue";
import CardItemsRewardNotActive from "~/components/card/CardItemsRewardNotActive.vue";
export default {
  components: {
    CardItemsReward,
    CardItemsRewardNotActive,
  },
  data() {
    return {
      items: [],
      items2: [],
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
    await this.getItems2();
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
    async getItems2() {
      this.items2 = await this.$axios
        .get("/api/rewards-not-active")
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
