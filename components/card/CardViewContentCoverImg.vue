<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" v-if="item.contentCoverImgId">
          <v-card @click="viewImg" height="auto">
            <v-card-actions>
              <v-img :src="item.ContentCoverImg.url" width="100vw" />
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" v-else>
          <v-alert text prominent type="error" icon="mdi-cloud-alert">
            กรุณาอัพโหลดรูปภาพหน้าปก
          </v-alert>
        </v-col>
      </v-row>
    </v-container>

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
                hide-delimiter-background
                hide-delimiters
                height="auto"
                :show-arrows="false"
              >
                <v-carousel-item :src="item.ContentCoverImg.url" width="100vw">
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
    };
  },

  methods: {
    viewImg() {
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
