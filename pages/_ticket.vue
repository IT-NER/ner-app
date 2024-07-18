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

    <overlay :overlay.sync="overlay" />
  </div>
</template>

<script>
import Overlay from "~/components/overlay/Overlay.vue";
export default {
  components: { Overlay },
  layout: "blankLayout",
  data() {
    return {
      item: [],
      pointReceived: [
        {
          point: null,
          userId: null,
          contentId: null,
        },
      ],

      btnAllow: true,
      overlay: false,
    };
  },

  created() {
    this.main();
  },

  methods: {
    async main() {
      this.overlay = true;
      this.item = await this.getContentByContentByTicket();
      this.pointReceived = await this.setData();

      let check = await this.checkReceived();
      if (check.length == 0) {
        this.btnAllow = false;
      } else {
        this.btnAllow = true;
      }
      this.overlay = false;
    },

    async setData() {
      let data = [
        {
          point: null,
          userId: null,
          contentId: null,
        },
      ];

      let user = await this.$auth.$storage.getCookie("user");
      let content = await Object.assign({}, this.item.Content);

      data[0].userId = await user.id;
      data[0].point = await this.item.point;
      data[0].contentId = await content[0].id;
      console.log("data", data);
      return data;
    },

    async checkReceived() {
      let item = await this.$axios
        .post("/api/pointReceived/checkReceived", {
          data: this.pointReceived,
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

    async getContentByContentByTicket() {
      let ticket = await this.$route.params.ticket;
      let item = await this.$axios
        .get("/api/content/ticket/" + ticket)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return item;
    },

    async getPoint() {
      this.overlay = true;
      let pointReceived = await this.setData();

      let itemPointReceived = await this.createPointReceived(pointReceived);
      console.log("itemPointReceived", itemPointReceived);

      if (!itemPointReceived) {
        this.alertError();
      }

      await this.main();
      await this.alertSuccess();
      this.overlay = false;
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

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertSuccess() {
      this.$swal.fire({
        position: "top-end",
        type: "success",
        title: "บันทึก เรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
