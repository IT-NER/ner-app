<template>
  <div>
    <!-- {{ item }} -->
    <form @submit.prevent="save">
      <v-card>
        <v-card-title>
          ของรางวัล
          <v-spacer></v-spacer>
          <v-btn color="warning" outlined @click="goToIndex">
            <v-icon class="mr-2"> mdi-reply </v-icon>
            กลับหน้าหลัก
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <form-reward :item.sync="item" @updateActive="updateActive" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" outlined type="submit">
            <v-icon class="mr-2"> mdi-content-save </v-icon>
            บันทึก
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        id: null,
        ticket: null,
        code: null,
        name: null,
        description: null,
        point: 0,
        userId: null,
        active: true,
      },
    };
  },

  created() {
    this.getItem();
  },

  methods: {
    async save() {
      await this.$axios
        .put("/api/admin/reward/" + this.$route.params.id, {
          data: this.item,
        })
        .then((res) => {
          this.getItem();
          this.alertSuccess();
        })
        .catch((err) => {
          this.getItem();
          this.alertError();
        });
    },
    async goToIndex() {
      this.$router.push("/reward");
    },
    async updateActive() {
      await this.$axios
        .get("/api/admin/reward/update/active/" + this.$route.params.id)
        .then((res) => {
          this.getItem();
          this.alertSuccess();
        })
        .catch((err) => {
          this.getItem();
          this.alertError();
        });
    },
    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
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
    async getItem() {
      this.item = await this.$axios
        .get("/api/admin/reward/" + this.$route.params.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          this.$router.push("/reward");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
