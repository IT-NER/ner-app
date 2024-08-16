<template>
  <div>
    <v-card flat>
      <v-card-title> กิจกรรม </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="items.length > 0">
        <v-container>
          <v-row>
            <v-col cols="12" md="3" v-for="(item, i) in items" :key="i">
              <v-card :href="`/${item.id}`" target="_blank">
                <v-card-actions>
                  <v-img
                    :src="`/uploads/content/${item.ContentCoverImg.name}`"
                  ></v-img>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-title>
                  {{ item.title }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

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
