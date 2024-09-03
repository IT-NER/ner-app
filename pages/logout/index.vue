<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.logout();
  },

  methods: {
    async logout() {
      await this.$auth
        .logout()
        .then(async (res) => {
          let user = await this.$auth.$storage.removeUniversal("user");
          if (!user) {
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
