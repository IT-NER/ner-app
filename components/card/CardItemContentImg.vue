<template>
  <div>
    <v-card flat>
      <v-card-title> รูปภาพหน้าปก </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-img
          v-for="(item, i) in imgIndex"
          :key="i"
          :src="`/uploads/content/${item.name}`"
          :cover="true"
        ></v-img>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-title> รูปภาพ </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-col cols="12" md="2" v-for="(item, i) in items" :key="i">
            <v-toolbar dense tile>
              <v-spacer></v-spacer>
              <v-switch
                label="หน้าปก"
                inset
                v-model="item.index"
                @change="setImgIndex(item)"
              ></v-switch>
            </v-toolbar>
            <v-card @click="viewImg(item)" hover color="black">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-img
                  :src="`/uploads/content/${item.name}`"
                  width="100"
                  height="200"
                  :cover="true"
                />
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="dialog"
      transition="scale-transition"
      width="600"
      height="auto"
      :scrollable="false"
    >
      <v-card width="600" height="auto" flat>
        <v-card-actions>
          <v-carousel
            v-model="index"
            hide-delimiter-background
            hide-delimiters
            width="600"
            height="auto"
          >
            <v-carousel-item v-for="(item, i) in items" :key="i">
              <v-img
                :src="`/uploads/content/${item.name}`"
                width="600"
                height="auto"
              />
            </v-carousel-item>
          </v-carousel>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["contentImgIds", "main"],

  data() {
    return {
      items: [],
      dialog: false,
      index: 0,
      imgIndex: [],
    };
  },

  watch: {
    async contentImgIds(val) {
      if (val) {
        await this.getContentByIds();
        await this.getImgIndex();
      }
    },
  },

  methods: {
    async getImgIndex() {
      this.imgIndex = this.items.filter((item) => item.index == true);
    },

    async getContentByIds() {
      this.items = await this.$axios
        .post("/api/contentImg/ids", {
          data: this.contentImgIds,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },

    async viewImg(item) {
      let index = this.items.indexOf(item);
      this.index = index;
      this.dialog = true;
    },

    async setImgIndex(item) {
      console.log("item", item);
      let itemImg = Object.assign({}, item);

      let ContentImg = await this.$axios
        .post("/api/contentImg/setImgIndex", {
          data: itemImg,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      if (!ContentImg) {
        this.$emit("alertError");
      }

      this.$emit("main");
    },
  },
};
</script>
