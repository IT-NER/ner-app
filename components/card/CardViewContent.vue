<template>
  <div>
    <v-container v-if="item">
      <v-row>
        <v-col cols="12">
          <v-card flat height="auto" width="1200" class="mx-auto">
            <v-card-actions>
              <v-carousel
                height="auto"
                width="1200"
                hide-delimiters
                show-arrows-on-hover
                cycle
              >
                <v-carousel-item
                  v-for="(item, i) in item.ContentImg"
                  :key="i"
                  :src="`/uploads/content/${item.name}`"
                  :aspect-ratio="16 / 9"
                  height="auto"
                  width="1200"
                >
                </v-carousel-item>
              </v-carousel>
            </v-card-actions>
            <v-toolbar dense elevation="0">
              <v-spacer></v-spacer>
              <h5>วันที่สร้าง : {{ $moment(item.createAt).format("LL") }}</h5>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card flat height="auto" width="1200" class="mx-auto">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <h1>หัวข้อ/เรื่อง : {{ item.title }}</h1>
                  </v-col>
                  <v-col cols="12">
                    <h2>คำอธิบาย : {{ item.description }}</h2>
                  </v-col>
                  <v-col cols="12">
                    <h3>เนื้อหา : {{ item.detail }}</h3>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card flat style="margin: 50px 0 50px 0">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                elevation="10"
                large
                x-large
                hover
                :disabled="count > 0"
                color="success"
                @click="addPoint"
              >
                <v-icon x-large color="yellow"> mdi-star </v-icon>
                <h3>กดรับ {{ item.point }} พอยท์</h3>
                <v-icon x-large color="yellow"> mdi-star </v-icon>
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
  props: ["id"],

  data() {
    return {
      item: null,
      count: 0,
    };
  },

  created() {
    this.main();
  },
  methods: {
    async addPoint() {
      let user = this.$auth.$storage.getCookie("user");

      await this.$axios
        .post("/api/point/addPointUser", {
          data: {
            point: this.item.point,
            contentId: this.item.id,
            userId: user.id,
          },
        })
        .then((res) => {
          console.log("res", res.data);
          this.alertReceivedSuccess();
          this.main();
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },

    async alertReceivedSuccess() {
      this.$swal.fire({
        position: "center",
        type: "success",
        title: "สำเร็จ",
        text: "คุณได้รับพอยท์ เรียบร้อยแล้ว",
      });
    },

    async main() {
      await this.getItem();
      await this.checkReceivePoint();
    },

    async getItem() {
      this.item = await this.$axios
        .get("/api/content/" + this.id)
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },

    async checkReceivePoint() {
      let user = await this.$auth.$storage.getCookie("user");

      this.count = await this.$axios
        .post("/api/point/checkReceivePoint", {
          data: {
            userId: user.id,
            contentId: this.item.id,
          },
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          return 0;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
