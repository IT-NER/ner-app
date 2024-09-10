<template>
  <div>
    <v-card flat>
      <v-alert color="success" dark tile> ไฮไลท์ </v-alert>

      <v-card-actions v-if="items.length > 0">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-carousel
                cycle
                show-arrows-on-hover
                hide-delimiter-background
                hide-delimiters
                height="auto"
              >
                <v-carousel-item
                  v-for="(item, i) in items"
                  :key="i"
                  :src="`/uploads/content/${item.ContentCoverImg.name}`"
                  target="_blank"
                  :href="`/intranet/${item.id}`"
                  width="100vw"
                  :aspect-ratio="16 / 9"
                >
                  <template v-slot:default>
                    <v-alert text prominent>
                      <v-container fluid>
                        <v-row>
                          <v-col cols="12">
                            <h1>
                              {{ item.title }}
                            </h1>
                            <h3>
                              {{ $moment(item.createdAt).format("ll") }}
                            </h3>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-alert>
                  </template>
                </v-carousel-item>
              </v-carousel>
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
        .get("/api/content/publish/banner")
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
