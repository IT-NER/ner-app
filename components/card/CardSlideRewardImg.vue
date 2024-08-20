<template>
  <div>
    <v-card width="100vw" class="mx-auto">
      <v-card-actions>
        <v-carousel
          v-model="index"
          cycle
          hide-delimiter-background
          hide-delimiters
          show-arrows-on-hover
          height="auto"
        >
          <v-carousel-item
            v-for="(list, i) in item.RewardImg"
            :key="i"
            :src="list.url"
            @click="viewImg(list)"
          >
          </v-carousel-item>
        </v-carousel>
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-transition"
      persistent
    >
      <v-card
        flat
        class="d-flex justify-center align-center ma-auto"
        tile
        color="black"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-btn color="error" class="float-right" @click="dialog = false">
                ปิด
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-carousel
                v-model="index"
                cycle
                hide-delimiter-background
                hide-delimiters
                show-arrows-on-hover
                height="auto"
              >
                <v-carousel-item
                  v-for="(list, i) in item.RewardImg"
                  :key="i"
                  :src="list.url"
                  width="100vw"
                >
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
      dialogImg: false,
      index: 0,
    };
  },

  computed: {
    show() {
      let data = false;
      if (this.item.RewardImg) {
        data = true;
      }
      return data;
    },
  },

  methods: {
    async viewImg(list) {
      this.index = this.item.RewardImg.indexOf(list);
      this.dialog = true;
      if (this.dialog) {
        this.dialogImg = true;
      }
    },
    async removeItem(item) {
      // console.log("item", item);
      await this.$axios
        .delete("/api/admin/reward/delete/rewardImg/" + item.id)
        .then(async (res) => {
          this.$emit("update:item", await res.data);
          await this.alertSuccess();
        })
        .catch((err) => {
          this.alertError();
        });
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
