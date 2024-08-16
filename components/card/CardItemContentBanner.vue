<template>
  <div>
    <v-card flat>
      <v-card-title> อินทราเน็ต : บริษัท นอร์ทอีส รับเบอร์ </v-card-title>
      <v-divider></v-divider>
      <v-card-actions v-if="items.length > 0">
        <v-card class="mx-auto">
          <v-card-actions>
            <v-carousel cycle show-arrows-on-hover height="auto">
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="`/uploads/content/${item.ContentCoverImg.name}`"
                target="_blank"
                :href="`/${item.id}`"
                height="auto"
                width="800"
              >
                <template v-slot:default>
                  <v-banner color="black" dark>
                    <div class="title">
                      {{ item.title }}
                    </div>
                  </v-banner>
                </template>
              </v-carousel-item>
            </v-carousel>
          </v-card-actions>
        </v-card>
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
