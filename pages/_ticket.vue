<template>
  <div>
    <!-- ViewContent -->
    <view-content v-if="id" :id.sync="id" />
  </div>
</template>

<script>
import ViewContent from "~/components/view/ViewContent.vue";
export default {
  layout: "blankLayout",
  components: { ViewContent },
  data() {
    return {
      id: null,
    };
  },

  created() {
    this.main();
  },

  methods: {
    async main() {
      let content = await this.getContentByTicket();
      if (!content) {
        this.$router.push("/");
        return;
      }

      this.id = await content.id;
      console.log("id", this.id);
    },

    async getContentByTicket() {
      let content = await this.$axios
        .get("/api/content/ticket/" + this.$route.params.ticket)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return content;
    },
  },
};
</script>

<style lang="scss" scoped></style>
