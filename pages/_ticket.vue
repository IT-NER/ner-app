<template>
  <div>
    <!-- ViewContent -->
    <ViewContent v-if="id" :id.sync="id" />

    <ButtonReceivedPoint v-if="id" :id.sync="id" />
  </div>
</template>

<script>
import ButtonReceivedPoint from "~/components/btn/ButtonReceivedPoint.vue";
import ViewContent from "~/components/view/ViewContent.vue";
export default {
  layout: "blankLayout",
  components: { ViewContent, ButtonReceivedPoint },
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
