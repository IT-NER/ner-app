<template>
  <div>
    <v-row v-if="content.ContentImg.length > 0">
      <v-col cols="12" md="12">
        <v-card>
          <v-card-actions>
            <v-carousel
              cycle
              hide-delimiter-background
              show-arrows-on-hover
              hide-delimiters
              v-model="imgIndex"
            >
              <v-carousel-item
                v-for="(item, i) in content.ContentImg"
                :key="i"
                :src="`/uploads/content/${item.name}`"
                :aspect-ratio="16 / 9"
              >
              </v-carousel-item>
            </v-carousel>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="content.ContentImg.length > 0">
      <v-col
        cols="12"
        md="2"
        v-for="(item, i) in content.ContentImg"
        :key="i"
        :v-if="item"
        class="d-flex child-flex"
      >
        <v-card flat>
          <v-row>
            <v-col cols="12" class="text-right">
              <v-btn fab x-small color="warning">
                <v-icon dark @click="delImg(item)">mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-card flat @click="viewImg(i)">
            <v-card-actions>
              <v-img
                :src="`/uploads/content/${item.name}`"
                :aspect-ratio="16 / 9"
                class="grey lighten-2"
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
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          ยังไม่มีรูปภาพ
        </v-alert>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      transition="slide-y-reverse-transition"
      width="800px"
    >
      <v-card>
        <v-card-actions>
          <v-carousel
            cycle
            show-arrows-on-hover
            hide-delimiters
            v-model="imgIndex"
          >
            <v-carousel-item
              v-for="(item, i) in content.ContentImg"
              :key="i"
              :src="`/uploads/content/${item.name}`"
              :aspect-ratio="16 / 9"
            >
            </v-carousel-item>
          </v-carousel>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["content", "getContentByTicket", "alertSuccess", "alertError"],

  data() {
    return {
      showImg: false,
      imgIndex: 0,
      dialog: false,
    };
  },

  methods: {
    async viewImg(index) {
      this.imgIndex = index;
      this.dialog = true;
    },

    async delImg(item) {
      let contentImg = await this.delContentImgById(item);
      if (!contentImg) {
        this.$emit("alertError");
      }
      this.$emit("getContentByTicket");
    },

    async delContentImgById(item) {
      let contentImg = await this.$axios.delete("/api/contentImg/" + item.id);
      return contentImg;
    },
  },
};
</script>

<style lang="scss" scoped></style>
