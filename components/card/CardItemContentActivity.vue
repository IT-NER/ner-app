<template>
  <div>
    <v-card flat>
      <v-card-title> กิจกรรม </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-carousel cycle show-arrows-on-hover height="auto">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="`/uploads/content/${item.ContentCoverImg.name}`"
            target="_blank"
            :href="`/${item.ticket}`"
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

      <v-card-text v-if="items.length == 0">
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
        .get("/api/content/banner/publish")
        .then((res) => {
          console.log("banner", res.data);
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>
