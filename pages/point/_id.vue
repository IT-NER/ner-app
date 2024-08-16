<template>
  <div>
    <v-card flat style="margin-bottom: 100px">
      <v-card-title>
        รับพอยท์
        <v-spacer></v-spacer>
        <v-btn color="warning" outlined @click="goToIndex">
          <v-icon class="mr-2"> mdi-reply </v-icon>
          กลับหน้าหลัก
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <!-- CardViewContentById -->
              <card-view-content-by-id :id.sync="$route.params.id" />
            </v-col>
            <v-col cols="12" md="6">
              <!-- CardUserReceivedPoint -->
              <card-user-received-point :id.sync="$route.params.id" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardUserReceivedPoint from "~/components/card/CardUserReceivedPoint.vue";
import CardViewContentById from "~/components/card/CardViewContentById.vue";
export default {
  components: { CardViewContentById, CardUserReceivedPoint },
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
    async goToIndex() {
      this.$router.push("/point");
    },
    async getItem() {
      this.item = await this.$axios
        .get("/api/admin/content/" + this.$route.params.id)
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
