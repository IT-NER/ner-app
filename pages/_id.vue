<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <card-view-content :item.sync="item" />
        </v-col>
        <v-col cols="12">
          <card-button-received-point :id.sync="$route.params.id" />
        </v-col>
      </v-row>
    </v-container>

    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import CardViewContent from "~/components/card/CardViewContent.vue";
import CardButtonReceivedPoint from "~/components/card/CardButtonReceivedPoint.vue";
export default {
  layout: "blankLayout",
  components: { CardViewContent, CardButtonReceivedPoint },

  data() {
    return {
      item: {
        id: null,
        start: null,
        end: null,
        timed: null,
        publish: null,
        ticket: null,
        code: null,
        title: null,
        description: null,
        detail: null,
        point: null,
        contentStatusId: null,
        contentTypeId: null,
        userId: null,
        contentCoverImgId: null,
        active: null,
        ContentStatus: [],
        ContentType: [],
        User: [],
        ContentCoverImg: [],
        ContentImg: [],
        PointReceived: [],
      },
    };
  },
  created() {
    this.getItem();
  },
  methods: {
    async getItem() {
      this.item = await this.$axios
        .get("/api/content/" + Number(this.$route.params.id))
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          this.$router.push("/");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
