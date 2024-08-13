<template>
  <div>
    <v-toolbar class="success" dense dark elevation="0">
      <v-spacer></v-spacer>
      พอยท์ :
      <p>{{ item }}</p>
      <v-spacer></v-spacer>
    </v-toolbar>
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
        .get("/api/user/" + this.$auth.$state.user.id)
        .then((res) => {
          console.log("user", res.data);

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
