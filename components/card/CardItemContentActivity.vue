<template>
  <div>
    <v-card flat>
      <v-card-title> กิจกรรม </v-card-title>
      <v-divider></v-divider>
      <v-card-actions :v-if="show">
        <v-row>
          <v-col cols="12" md="3" v-for="(item, i) in items" :key="i">
            <v-card
              class="mx-auto"
              max-width="500"
              hover
              target="_blank"
              :href="`/${item.ticket}`"
            >
              <v-card-actions>
                <v-img
                  v-for="(list, i) in item.ContentImg"
                  :key="i"
                  :src="`/uploads/content/${list.name}`"
                  height="150"
                  v-show="list.index"
                ></v-img>
              </v-card-actions>

              <v-divider></v-divider>

              <v-card-text>
                <div class="title">{{ item.title }}</div>
                <div class="subtitle-1 text-truncate">
                  {{ item.description }}
                </div>
                <div class="subtitle-2 text-truncate">{{ item.detail }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-actions>

      <v-card-text v-if="!show">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          COMING SOON
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["contentIds"],

  data() {
    return {
      items: [],
      show: false,
    };
  },

  watch: {
    contentIds(val) {
      if (val) {
        this.getContentByIds();
      }
    },
  },

  created() {
    this.getContentByIds();
  },

  methods: {
    async getContentByIds() {
      if (this.contentIds.length == 0) {
        this.show = false;
      } else {
        this.show = true;
      }

      this.items = await this.$axios
        .post("/api/content/ids", {
          data: this.contentIds,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>
