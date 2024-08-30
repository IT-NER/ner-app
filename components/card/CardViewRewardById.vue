<template>
  <div>
    <v-card flat>
      <v-card-actions v-if="item.RewardImg">
        <v-card class="mx-auto" flat>
          <v-carousel
            cycle
            hide-delimiter-background
            hide-delimiters
            show-arrows-on-hover
            width="854"
            height="auto"
          >
            <v-carousel-item
              v-for="(list, i) in item.RewardImg"
              :key="i"
              :src="`/uploads/reward/${list.name}`"
            >
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions flat>
        จำนวน {{ item.point }} พอยท์
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1>{{ item.name }}</h1>
            </v-col>
            <v-col cols="12">
              <h3>{{ item.description }}</h3>
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
      item: {},
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
        .get("/api/admin/reward/" + this.id)
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
