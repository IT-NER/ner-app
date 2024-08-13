<template>
  <div>
    <v-card flat>
      <v-card-title> อินทราเน็ต : บริษัท นอร์ทอีส รับเบอร์ </v-card-title>
      <v-divider></v-divider>
      <v-card-actions v-for="(item, i) in items" :key="i">
        <!-- <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          width="100%"
          max-height="628"
        >
          <v-carousel-item
            v-for="(list, y) in item.ContentImg"
            :key="y"
            :src="`/uploads/content/${list.name}`"
            target="_blank"
            :href="`/${item.ticket}`"
          >
          </v-carousel-item>
        </v-carousel> -->
      </v-card-actions>

      <!-- <v-card-text v-if="!show">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          COMING SOON
        </v-alert>
      </v-card-text> -->
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
