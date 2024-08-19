<template>
  <div>
    <v-card flat style="margin: 50px 0 50px 0">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="item.point > 0"
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
  </div>
</template>

<script>
export default {
  props: ["id"],

  data() {
    return {
      item: {
        point: 0,
      },
      count: 0,
    };
  },

  created() {
    this.main();
  },

  methods: {
    async main() {
      await this.getItem();
      await this.checkReceivePoint();
    },
    async getItem() {
      this.item = await this.$axios
        .get("/api/content/" + this.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
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
          //   console.log("res", res.data);
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
    async checkReceivePoint() {
      let user = await this.$auth.$storage.getCookie("user");

      this.count = await this.$axios
        .post("/api/point/checkReceivePoint", {
          data: {
            userId: user.id,
            contentId: this.id,
          },
        })
        .then((res) => {
          //   console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          return 0;
        });

      return count;
    },
  },
};
</script>

<style lang="scss" scoped></style>
