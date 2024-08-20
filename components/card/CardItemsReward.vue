<template>
  <div>
    <!-- {{ items }} -->
    <v-container>
      <v-row>
        <v-col cols="12" md="3" v-for="(item, i) in items" :key="i">
          <v-card @click="viewItem(item)" tile>
            <v-card-title>
              {{ item.name }}
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-carousel
                cycle
                hide-delimiter-background
                hide-delimiters
                :show-arrows="false"
                width="300"
                height="150"
              >
                <v-carousel-item
                  v-for="(list, i) in item.RewardImg"
                  :key="i"
                  :src="list.url"
                  width="300"
                  height="150"
                >
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>

              {{ item.point }}
              <v-badge bordered color="warning" icon="mdi-star"> </v-badge>
              <span class="ml-5">พอยท์</span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["items"],
  methods: {
    viewItem(item) {
      console.log("item", item);
      this.$router.push("/redeem/" + item.id);
    },
  },
};
</script>

<style scoped>
v-card-title {
  background-color: black;
}
</style>
