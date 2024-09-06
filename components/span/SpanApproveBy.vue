<template>
  <div>
    <!-- <span> -->
    {{ user.name }}
    <!-- </span> -->
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      user: {
        fname: null,
        lname: null,
        name: null,
      },
    };
  },

  watch: {
    id(val) {
      if (val) {
        this.getItem();
      }
    },
  },

  created() {
    this.getItem();
  },
  methods: {
    async getItem() {
      this.user = await this.$axios
        .get("/api/user/" + this.id)
        .then((res) => {
          res.data.name = res.data.fname + " " + res.data.lname;
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
