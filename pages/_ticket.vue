<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1>
            {{ item.title }}
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card width="600" class="mx-auto" flat>
            <v-card-actions>
              <v-carousel
                cycle
                hide-delimiter-background
                show-arrows-on-hover
                width="600"
                height="auto"
              >
                <v-carousel-item v-for="(list, y) in item.ContentImg" :key="y">
                  <v-img
                    :src="`/uploads/content/${list.name}`"
                    class="grey lighten-2"
                    width="600"
                    height="auto"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-carousel-item>
              </v-carousel>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="subtitle-1">
            {{ item.description }}
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="subtitle-2">
            {{ item.detail }}
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-center">
          <v-card flat height="100">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                x-large
                color="success"
                @click="getPoint(item)"
                :disabled="btnAllow"
              >
                รับ {{ item.point }} พอยท์
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "blankLayout",
  data() {
    return {
      item: [],
      pointReceived: {
        point: null,
        userId: null,
        contentPublicId: null,
      },

      btnAllow: true,
    };
  },
  created() {
    this.main();
  },
  methods: {
    async main() {
      this.item = await this.getContentByContentByTicket();
      this.pointReceived = await this.setData();
    },

    async setData(item) {
      let data = {
        userId: null,
        point: null,
        contentPublicId: null,
      };

      let user = await this.$auth.$storage.getCookie("user");
      let point = await item.point;
      let ContentPublic = await Object.assign({}, item.ContentPublic);

      data.userId = user.id;
      data.point = point;
      data.contentPublicId = ContentPublic[0].id;

      this.pointReceived = data;

      return data;
    },

    async check() {
      // let data = {
      //   userId:
      // }
      let contentPublic = Object.assign({}, this.item.ContentPublic);

      console.log("contentPublic", contentPublic[0].id);
      // let item = await this.$axios
      //   .post("/api/pointReceived/check", {
      //     data: pointReceived,
      //   })
      //   .then((res) => {
      //     console.log("res", res.data);
      //     return res.data;
      //   })
      //   .catch((err) => {
      //     console.log("err", err);
      //     return false;
      //   });
      // return item;
    },

    async getContentByContentByTicket() {
      let item = await this.$axios
        .get("/api/content/ticket/" + this.$route.params.ticket)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return item;
    },

    async getPoint(item) {
      let pointReceived = await this.setData(item);
      console.log("pointReceived", pointReceived);

      let itemPointReceived = await this.createPointReceived(pointReceived);
      console.log("itemPointReceived", itemPointReceived);
    },

    async createPointReceived(pointReceived) {
      let item = await this.$axios
        .post("/api/pointReceived", {
          data: pointReceived,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });
      return item;
    },
  },
};
</script>

<style lang="scss" scoped></style>
