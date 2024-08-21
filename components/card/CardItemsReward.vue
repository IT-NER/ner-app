<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-toolbar color="black" dark>
            {{ item.name }}
          </v-toolbar>
          <v-card @click="viewItem(item)" tile>
            <v-card-text>
              <v-carousel
                cycle
                hide-delimiter-background
                hide-delimiters
                :show-arrows="false"
                height="auto"
              >
                <v-carousel-item
                  v-for="(list, i) in item.RewardImg"
                  :key="i"
                  :src="list.url"
                  width="100vw"
                  :aspect-ratio="16 / 9"
                >
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions v-if="user">
              <v-progress-linear
                :value="percen(item)"
                height="25"
                :color="progressColor(item)"
                dark
              >
                <template v-slot:default>
                  <strong>{{ Math.ceil(percen(item)) }}%</strong>
                </template>
              </v-progress-linear>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-actions v-if="user">
              <v-spacer></v-spacer>
              แลกใช้ {{ item.point }} พอยท์
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["items", "user"],

  methods: {
    progressColor(item) {
      console.log("item", item);

      let color = "warning";
      let data = Number((this.user.point / item.point) * 100);
      if (data >= 100) {
        color = "success";
      }
      return color;
    },

    percen(item) {
      let data = Number((this.user.point / item.point) * 100);
      console.log("data", data);
      if (data >= 100) {
        data = 100;
      }

      return data;
    },

    viewItem(item) {
      this.$router.push("/redeem/" + item.id);
    },
  },
};
</script>
