<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-alert text prominent type="warning" icon="mdi-star">
            <h1 class="title">แบนเนอร์</h1>
          </v-alert>
        </v-col>
        <v-col cols="12" md="12" v-for="(items, i) in itemsBanner" :key="i">
          <v-carousel hide-delimiters>
            <v-carousel-item
              v-for="(item, i) in items.Content.ContentImg"
              :key="i"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <v-img
                :src="`/uploads/content/${item.name}`"
                class="v-responsive"
              >
                <v-row>
                  <v-col>
                    <v-btn
                      color="success"
                      class="float-right"
                      :to="`/content/${items.Content.ticket}`"
                      target="_blank"
                    >
                      <v-icon class="mr-2"> mdi-star </v-icon>
                      <span>
                        {{ items.Content.point }}
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["itemsBanner"],

  data() {
    return {
      bannerImgs: [],
    };
  },

  methods: {
    name() {},
  },
};
</script>

<style lang="scss" scoped></style>
