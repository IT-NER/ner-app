<template>
  <div>
    <v-card flat>
      <v-card-title> ห้องประชุม </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" v-for="(item, i) in items" :key="i">
            <v-chip label :color="item.color" dark>
              {{ item.name }}
              ({{ item.quantity }} ที่นั่ง)
            </v-chip>
          </v-col>
        </v-row>
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
    this.main();
  },
  methods: {
    async main() {
      this.items = await this.getItems();
    },
    async getItems() {
      let items = await this.$axios
        .get("/api/room")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return items;
    },
  },
};
</script>

<style lang="scss" scoped></style>
