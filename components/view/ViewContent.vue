<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-carousel cycle height="628" width="1200" show-arrows-on-hover>
            <v-carousel-item
              v-for="(item, i) in imgs"
              :key="i"
              :src="`/uploads/content/${item.name}`"
            >
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>วันที่ : {{ $moment(item.createdAt).format("ll") }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>หัวข้อ : {{ item.title }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2>คำอธิบาย : {{ item.description }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2>รายละเอียด / เนื้อหา : {{ item.detail }}</h2>
        </v-col>
      </v-row>
    </v-container>
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
        active: null,
        createdAt: null,
        updatedAt: null,
      },
      imgs: [],
    };
  },

  watch: {
    id(val) {
      if (val) {
        this.main();
      }
    },
  },

  created() {
    this.main();
  },

  methods: {
    async main() {
      let item = await this.getItem();
      if (!item) {
        return;
      }
      this.item = await item;
      this.imgs = await item.ContentImg;
    },

    async getItem() {
      let item = await this.$axios
        .get("/api/content/" + Number(this.id))
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return item;
    },
  },
};
</script>

<style lang="scss" scoped></style>
