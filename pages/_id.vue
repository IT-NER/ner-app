<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-btn color="error" class="float-end" @click="close">
            ปิด
            <v-icon class="ml-2">mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <card-view-content :item.sync="item" />
        </v-col>
        <v-col cols="12" v-if="show">
          <card-button-received-point
            :item.sync="item"
            @getItem="getItem"
            :received.sync="received"
          />
        </v-col>
      </v-row>
    </v-container>

    <br />
    <br />
    <br />
    <br />
    <br />

    <btn-scroll-to-top />
  </div>
</template>

<script>
import CardViewContent from "~/components/card/CardViewContent.vue";
import CardButtonReceivedPoint from "~/components/card/CardButtonReceivedPoint.vue";
import BtnScrollToTop from "~/components/button/BtnScrollToTop.vue";
export default {
  layout: "blankLayout",
  components: { CardViewContent, CardButtonReceivedPoint, BtnScrollToTop },

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
      received: false,
      show: false,
    };
  },

  created() {
    this.getItem();
  },
  methods: {
    async close() {
      window.close();
    },
    async checkReceived(item) {
      let data = false;
      let user = await this.$auth.$storage.getCookie("user");

      if (item.PointReceived.length > 0) {
        let result = await item.PointReceived.find((e) => e.userId == user.id);
        if (result) {
          data = true;
        }
      }
      console.log("data", data);
      return data;
    },
    async getItem() {
      this.item = await this.$axios
        .get("/api/content/" + Number(this.$route.params.id))
        .then(async (res) => {
          this.received = await this.checkReceived(res.data);
          this.show = true;
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
