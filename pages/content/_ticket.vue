<template>
  <div>
    <!-- {{ $route.params.ticket }}
    {{ content }} -->

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-carousel
            cycle
            hide-delimiter-background
            show-arrows-on-hover
            :aspect-ratio="16 / 9"
          >
            <v-carousel-item v-for="(item, i) in content.ContentImg" :key="i">
              <v-card flat>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <img :src="`/uploads/content/${item.name}`" width="auto" />
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-col>

        <v-col cols="12">
          <div class="display-1">{{ content.title }}</div>
        </v-col>
        <v-col cols="12">
          <div class="subtitle-1">{{ content.description }}</div>
        </v-col>
        <v-col cols="12">
          <div class="subtitle-2">{{ content.detail }}</div>
        </v-col>
      </v-row>

      <v-card flat>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large color="success">
            รับ
            {{ content.point }}
            พอยท์
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "blankLayout",

  data() {
    return {
      content: {
        ContentImg: [],
      },
    };
  },

  created() {
    this.getContentByTicket();
  },

  methods: {
    async getContentByTicket() {
      let ticket = await this.$route.params.ticket;

      let content = await this.$axios
        .get("/api/content/ticket/" + ticket)
        .then((res) => {
          // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
          return false;
        });

      if (!content) {
        this.$router.push("/");
      }

      this.content = await content;
    },
  },
};
</script>

<style lang="scss" scoped></style>
