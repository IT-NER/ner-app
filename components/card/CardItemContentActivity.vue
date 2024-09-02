<template>
  <div>
    <v-card flat>
      <v-alert color="success" dark tile> กิจกรรม </v-alert>
      <v-card-actions v-if="items.length > 0">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="3" sm="4" v-for="(item, i) in items" :key="i">
              <!-- <v-toolbar dense flat dark>
                <v-spacer></v-spacer>
                {{ $moment(item.createdAt).format("ll") }}
              </v-toolbar> -->

              <v-card :href="`/${item.id}`" target="_blank" tile>
                <v-card-actions>
                  <v-carousel
                    cycle
                    hide-delimiter-background
                    hide-delimiters
                    :show-arrows="false"
                    height="auto"
                  >
                    <v-carousel-item
                      v-for="(list, i) in item.ContentImg"
                      :key="i"
                      :src="list.url"
                      :aspect-ratio="16 / 9"
                      width="100vw"
                    >
                      <template v-slot:default>
                        <v-alert text prominent dark dense>
                          <v-container fluid>
                            <v-row>
                              <v-col cols="12" md="12" class="text-right">
                                <h5>
                                  {{ $moment(item.createdAt).format("ll") }}
                                </h5>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-alert>
                      </template>
                    </v-carousel-item>
                  </v-carousel>
                </v-card-actions>
                <!-- <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <small>
                    {{ $moment(item.createdAt).format("ll") }}
                  </small>
                </v-card-actions> -->
                <v-divider></v-divider>
                <v-card-text>
                  <h3
                    class="d-inline-block text-truncate"
                    style="max-width: 150px"
                  >
                    หัวข้อ : {{ item.title }}
                  </h3>
                  <br />
                  <h4
                    class="d-inline-block text-truncate"
                    style="max-width: 150px"
                  >
                    คำอธิบาย : {{ item.description }}
                  </h4>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>

      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          COMING SOON
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      this.items = await this.$axios
        .get("/api/content/publish/activity")
        .then((res) => {
          let items = [];
          res.data.forEach((e) => {
            if (e.contentCoverImgId) {
              items.push(e);
            }
          });
          return items;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>
