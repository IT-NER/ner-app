<template>
  <div>
    <v-card flat>
      <v-card-actions v-if="item.ContentImg">
        <v-card class="mx-auto" flat>
          <v-carousel
            cycle
            hide-delimiter-background
            hide-delimiters
            show-arrows-on-hover
            height="auto"
          >
            <v-carousel-item
              v-for="(list, i) in item.ContentImg"
              :key="i"
              :src="`/uploads/content/${list.name}`"
            >
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions flat>
        จำนวน {{ item.point }} พอยท์
        <v-spacer></v-spacer>
        วันที่สร้าง : {{ $moment(item.createdAt).format("ll") }}
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1>{{ item.title }}</h1>
            </v-col>
            <v-col cols="12">
              <h2>{{ item.description }}</h2>
            </v-col>
            <v-col cols="12">
              <h3>{{ item.detail }}</h3>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["id"],

  data() {
    return {
      item: {
        id: null,
        start: null,
        end: null,
        timed: null,
        publish: null,
        ticket: null,
        code: null,
        title: null,
        description: null,
        detail: null,
        point: null,
        contentStatusId: null,
        contentTypeId: null,
        userId: null,
        contentCoverImgId: null,
        active: null,
        ContentStatus: [],
        ContentType: [],
        User: [],
        ContentCoverImg: [],
        ContentImg: [],
        PointReceived: [],
      },
    };
  },

  created() {
    this.getItem();
  },
  watch: {
    id(val) {
      if (val) {
        this.getItem();
      }
    },
  },
  methods: {
    async getItem() {
      this.item = await this.$axios
        .get("/api/admin/content/" + this.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
