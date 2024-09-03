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
          :src="`/uploads/reward/${item.name}`"
          width="50px"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-title> รูปภาพ </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-col cols="12" md="2" v-for="(item, i) in items" :key="i">
            <v-toolbar dense tile>
              <v-switch
                v-model="item.index"
                @change="setImgIndex(item)"
              ></v-switch>
              <v-spacer></v-spacer>
              <v-icon @click="delImg(item)"> mdi-close </v-icon>
            </v-toolbar>
            <v-card @click="viewImg(item)" hover tile>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-img
                  :src="`/uploads/reward/${item.name}`"
                  :aspect-ratio="1"
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
      <v-card flat>
        <v-card-actions>
          <v-carousel
            v-model="index"
            width="600"
            height="auto"
            hide-delimiter-background
            hide-delimiters
          >
            <v-carousel-item v-for="(item, i) in items" :key="i">
              <v-img
                :src="`/uploads/reward/${item.name}`"
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
  props: ["rewardImgIds", "main"],

  data() {
    return {
      items: [],
      dialog: false,
      index: 0,
      imgIndex: [],
    };
  },

  watch: {
    async rewardImgIds(val) {
      if (val) {
        await this.getRewardByIds();
        await this.getImgIndex();
      }
    },
  },

  methods: {
    async delImg(item) {
      // let rewardImg = Object.assign({}, item);
      let rewardImg = await this.$axios
        .delete("/api/rewardImg/" + item.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      this.$emit("main");
    },

    async getImgIndex() {
      this.imgIndex = this.items.filter((item) => item.index == true);
    },

    async getRewardByIds() {
      this.items = await this.$axios
        .post("/api/rewardImg/ids", {
          data: this.rewardImgIds,
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
      // console.log("item", item);
      let itemImg = Object.assign({}, item);

      let RewardImg = await this.$axios
        .post("/api/rewardImg/setImgIndex", {
          data: itemImg,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      if (!RewardImg) {
        this.$emit("alertError");
      }

      this.$emit("main");
    },
  },
};
</script>
