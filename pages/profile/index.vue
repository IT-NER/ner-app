<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <card-profile-img :item.sync="item" @getItem="getItem" />
        </v-col>
        <v-col cols="12" md="8">
          <card-profile-detail :item.sync="item" @getItem="getItem" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardProfileDetail from "~/components/card/CardProfileDetail.vue";
import CardProfileImg from "~/components/card/CardProfileImg.vue";
export default {
  components: { CardProfileImg, CardProfileDetail },
  data() {
    return {
      item: {
        img: null,
        Department: {
          name: null,
        },
        point: 0,
      },
    };
  },

  created() {
    this.getItem();
  },

  methods: {
    async getItem() {
      let user = this.$auth.$storage.getCookie("user");

      this.item = await this.$axios
        .get("/api/user/" + user.id)
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
