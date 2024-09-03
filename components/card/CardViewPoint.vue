<template>
  <div>
    <v-toolbar class="success" dense dark elevation="0">
      <v-spacer></v-spacer>
      <h3>
        {{ point }} พอยท์
        <span>
          <v-icon color="primary" @click="getItem">mdi-refresh</v-icon>
        </span>
      </h3>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      point: 0,
    };
  },

  created() {
    this.getItem();
  },

  methods: {
    async getItem() {
      let user = await this.$auth.$storage.getCookie("user");

      this.item = await this.$axios
        .get("/api/user/" + user.id)
        .then((res) => {
          // // console.log("user", res.data);
          this.point = res.data.point;
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
