<template>
  <div>
    <v-container>
      <!-- DETAIL REWARD -->
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-toolbar dense flat>
              <div class="title">DETAIL REWARD</div>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="2">
                  <v-text-field
                    label="TICKET"
                    required
                    v-model="reward.ticket"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    autofocus
                    label="NAME"
                    required
                    v-model="reward.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="1">
                  <v-text-field
                    label="POINT"
                    required
                    v-model="reward.point"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    label="DESCRIPTION"
                    required
                    v-model="reward.description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- IMAGES UPLOAD -->
      <v-row>
        <v-col cols="12">
          <form @submit.prevent="upload">
            <v-card flat>
              <v-toolbar flat dense>
                <div class="title">IMAGES UPLOAD</div>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-file-input
                      v-model="reward.files"
                      accept="image/jpeg"
                      label="IMAGES"
                      @change="handleImages"
                      multiple
                      counter
                      show-size
                      clearable
                      required
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="12" class="text-right">
                    <v-btn color="success" type="submit"> อัพโหลดรูปภาพ </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </form>
        </v-col>
      </v-row>

      <!-- previewImg -->
      <v-row>
        <v-col
          cols="12"
          md="2"
          v-for="(item, i) in reward.url"
          :key="i"
          :v-if="item"
        >
          <v-card>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="dark"
                      v-bind="attrs"
                      v-on="on"
                      @click="removeImage(item)"
                    >
                      mdi-close
                    </v-icon>
                  </template>
                  REMOVE
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card>
          <v-card @click="viewImg(item)">
            <v-card-actions>
              <v-img :src="item.url" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- IMAGES REWARD -->
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-toolbar flat dense>
              <div class="title">IMAGES REWARD</div>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text v-if="reward.RewardImg.length > 0">
              <v-row>
                <v-col cols="12" md="2"></v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <v-row>
                <v-col cols="12">
                  <v-alert
                    text
                    dense
                    prominent
                    type="warning"
                    icon="mdi-image-plus-outline"
                  >
                    <div class="title">NO IMAGES</div>
                    <div class="sub-title">Please upload an image file.</div>
                  </v-alert>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- dialogViewImg -->
    <v-dialog
      v-model="dialogViewImg"
      max-width="800"
      transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-card-actions>
          <v-carousel v-model="indexUrl">
            <v-carousel-item
              v-for="(item, i) in reward.url"
              :key="i"
              :src="item.url"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["reward"],
  data() {
    return {
      dialogViewImg: false,
      indexUrl: null,
    };
  },

  created() {},

  methods: {
    async upload() {
      console.log("reward", this.reward);

      let formData = new FormData();
      formData.append("ticket", this.reward.ticket);
      formData.append("id", this.reward.id);
      this.reward.files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await this.$axios
        .post("/api/reward/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("res", res.data);
        });
      // this.getReward();
    },

    async getReward() {
      let reward = await this.$axios
        .get("/api/reward")
        .then((res) => {
          // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });

      // this.$emit("update:reward.RewardImg", reward);
    },

    async viewImg(item) {
      let index = this.reward.url.indexOf(item);
      this.indexUrl = index;
      this.dialogViewImg = true;
    },

    async removeImage(item) {
      let index = this.reward.url.indexOf(item);
      this.reward.url.splice(index, 1);
      this.reward.files.splice(index, 1);
    },

    async handleImages(e) {
      this.reward.files = [];
      this.reward.url = [];

      if (!e) {
        return;
      }
      if (e.length > 50) {
        return;
      }

      e.forEach((item) => {
        if (item.size <= 2500000) {
          this.reward.files.push(item);
          this.reward.url.push({ url: URL.createObjectURL(item) });
        }
      });

      // console.log("url", this.reward.url);
      // console.log("files", this.reward.files);
    },
  },
};
</script>

<style lang="scss" scoped></style>
