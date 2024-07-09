<template>
  <div>
    <!-- overlay -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- form -->
    <form @submit.prevent="save">
      <v-card flat>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" color="warning" to="/content/public">
            กลับหน้าหลัก
          </v-btn>
          <v-btn color="primary" type="submit"> บันทึก </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title> PUBLIC CONTENT </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <form-content-public :item.sync="contentPublic" />
        </v-card-text>
      </v-card>
    </form>
  </div>
</template>

<script>
import FormContentPublic from "~/components/form/FormContentPublic.vue";
export default {
  components: { FormContentPublic },
  data() {
    return {
      overlay: false,

      contentPublic: {
        id: null,
        ticket: null,
        start: null,
        end: null,
        timed: true,
        remark: null,
        active: true,
        publish: true,
        Content: [],
        contentId: null,
        ContentPublicUser: [],
        User: [],
        userId: null,
      },
    };
  },

  created() {
    this.getContentPublicByTicket();
  },

  methods: {
    async save() {},

    async getContentPublicByTicket() {
      this.contentPublic = await this.$axios
        .get("/api/contentPublic/ticket/" + this.$route.params.ticket)
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
