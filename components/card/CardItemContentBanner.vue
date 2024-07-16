<template>
  <div>
    <v-card flat>
      <v-card-title> แบนเนอร์ </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-for="(item, i) in items" :key="i">
        <v-row>
          <v-col cols="12" md="9">
            <h2>
              {{ item.title }}
            </h2>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn
              color="success"
              class="float-right"
              :to="`/${item.ticket}`"
              target="_blank"
            >
              {{ item.point }} พอยท์
            </v-btn>
          </v-col>
          <v-col>
            <v-card class="mx-auto" width="600" flat>
              <v-card-actions>
                <v-carousel
                  cycle
                  width="600"
                  height="auto"
                  hide-delimiter-background
                  show-arrows-on-hover
                >
                  <v-carousel-item
                    v-for="(list, y) in item.ContentImg"
                    :key="y"
                  >
                    <v-img
                      :src="`/uploads/content/${list.name}`"
                      class="grey lighten-2"
                      width="600"
                      height="auto"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
      this.items = await this.$axios
        .post("/api/content/ids", {
          data: this.contentIds,
        })
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
