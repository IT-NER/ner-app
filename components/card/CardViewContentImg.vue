<template>
  <div>
    <v-container fluid>
      <v-row v-if="item.ContentImg.length > 0">
        <v-col
          cols="12"
          md="2"
          sm="3"
          v-for="(list, i) in item.ContentImg"
          :key="i"
        >
          <v-card @click="viewImg(list)">
            <v-card-actions>
              <v-img :src="list.url" width="300" height="auto">
                <v-row>
                  <v-col cols="12">
                    <v-btn
                      color="warning"
                      class="float-right"
                      x-small
                      fab
                      @click.stop="removeItem(list)"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-img>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <v-alert text prominent type="error" icon="mdi-cloud-alert">
            กรุณาอัพโหลดรูปภาพหน้าปก
          </v-alert>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="dialog"
      scrollable
      transition="dialog-transition"
      max-width="1366"
      height="auto"
    >
      <v-card>
        <v-card-actions>
          <v-carousel
            v-model="index"
            hide-delimiter-background
            hide-delimiters
            height="auto"
          >
            <v-carousel-item
              v-for="(list, i) in item.ContentImg"
              :key="i"
              :src="list.url"
            ></v-carousel-item>
          </v-carousel>
        </v-card-actions>
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
      index: 0,
    };
  },
  methods: {
    async viewImg(list) {
      this.index = this.item.ContentImg.indexOf(list);
      this.dialog = true;
    },
    async removeItem(item) {
      console.log("item", item);
      await this.$axios
        .delete("/api/admin/content/delete/contentImg/" + item.id)
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
