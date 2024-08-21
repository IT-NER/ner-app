<template>
  <div>
    <v-card flat class="my-5">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          hover
          x-large
          outlined
          :disabled="received"
          @click="addPoint"
        >
          กดรับ {{ item.point }} พอยท์
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["item", "received"],

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
        .then(async (res) => {
          await this.alertReceivedSuccess(this.item.point);
          this.$emit("getItem");
        })
        .catch((err) => {
          return false;
        });
    },

    async alertReceivedSuccess(point) {
      this.$swal.fire({
        position: "center",
        type: "success",
        title: "สำเร็จ",
        text: "ได้รับ " + point + " พอยท์",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
