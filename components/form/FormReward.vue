<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-toolbar dense flat>
              <div class="title">DETAIL REWARD</div>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    label="TICKET"
                    required
                    v-model="reward.ticket"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    autofocus
                    label="NAME"
                    required
                    v-model="reward.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    label="POINT"
                    required
                    v-model="reward.point"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="9">
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

        <!-- Upload Images -->
        <v-col cols="12" md="6">
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
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        {{ reward }}
        <!-- IMAGES PREVIEW -->
        <v-col cols="12" v-if="reward.url">
          <v-card flat>
            <v-toolbar flat dense>
              <div class="title">IMAGES PREVIEW</div>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  v-for="(item, i) in reward.url"
                  :key="i"
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
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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
        console.log("item", item);

        if (item.size <= 2000000) {
          this.reward.files.push(item);
          this.reward.url.push({ url: URL.createObjectURL(item) });
        } else {
          this.reward.files = [];
          this.reward.url = [];
        }
      });

      // console.log("url", this.reward.url);
      // console.log("files", this.reward.files);
    },
  },
};
</script>

<style lang="scss" scoped></style>
