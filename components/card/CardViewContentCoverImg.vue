<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" v-if="item.contentCoverImgId">
          <v-card
            class="mx-auto"
            @click="viewImg"
            max-width="500"
            height="auto"
          >
            <v-card-actions>
              <v-img :src="item.ContentCoverImg.url" />
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
      scrollable
      transition="dialog-transition"
      max-width="1366"
      height="auto"
    >
      <v-card>
        <v-card-actions>
          <v-carousel
            hide-delimiter-background
            hide-delimiters
            :show-arrows="false"
            height="auto"
          >
            <v-carousel-item
              v-if="item.ContentCoverImg"
              :src="item.ContentCoverImg.url"
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
