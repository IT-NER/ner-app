<template>
  <div>
    <v-container v-if="item">
      <v-row>
        <v-col>
          <v-carousel height="auto">
            <v-carousel-item
              v-for="(item, i) in item.ContentImg"
              :key="i"
              :src="`/uploads/content/${item.name}`"
            >
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-right">
          <h5>วันที่สร้าง : {{ $moment(item.start).format("LL") }}</h5>
        </v-col>
      </v-row>

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

      <v-row style="margin: 100px 0 100px 0">
        <v-col cols="12" class="text-center">
          <v-btn :disabled="count > 0" color="success" @click="addPoint">
            <v-icon color="yellow" class="mr-3">mdi-star</v-icon>
            <h3>รับ {{ item.point }} พอยท์</h3>
            <v-icon color="yellow" class="ml-3">mdi-star</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["ticket"],

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
          this.main();
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },

    async main() {
      await this.getItem();
      await this.checkReceivePoint();
    },

    async getItem() {
      this.item = await this.$axios
        .get("/api/content/ticket/" + this.ticket)
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
          return false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
