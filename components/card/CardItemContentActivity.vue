<template>
  <div>
    <v-card flat>
      <v-alert color="success" dark tile> กิจกรรม </v-alert>

      <v-data-iterator
        v-if="items.length > 0"
        :items="items"
        :footer-props="{
          'items-per-page-options': [4, 8, 12, -1],
        }"
        :items-per-page="8"
      >
        <template v-slot:default="props">
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="4"
                v-for="(item, i) in props.items"
                :key="i"
              >
                <v-card :href="`/${item.id}`" target="_blank" tile>
                  <v-card-actions>
                    <v-carousel
                      hide-delimiter-background
                      hide-delimiters
                      :show-arrows="false"
                      height="auto"
                    >
                      <v-carousel-item
                        :src="item.ContentCoverImg.url"
                        :aspect-ratio="16 / 9"
                        width="100vw"
                      >
                        <template v-slot:default>
                          <v-alert text prominent dense>
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
                  <v-divider></v-divider>
                  <v-card-text>
                    <h3
                      class="d-inline-block text-truncate"
                      style="max-width: 150px"
                    >
                      {{ item.title }}
                    </h3>
                    <br />
                    <h4
                      class="d-inline-block text-truncate"
                      style="max-width: 150px"
                    >
                      {{ item.description }}
                    </h4>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-data-iterator>

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
