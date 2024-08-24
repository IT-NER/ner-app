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
          <v-card color="success" dark tile @click="viewItem(item)">
            <v-card-title dark>
              {{ item.name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-progress-linear
              v-if="user"
              :value="percen(item)"
              height="20"
              striped
              dark
              :color="progressColor(item)"
            >
              <template v-slot:default>
                <strong>{{ Math.ceil(percen(item)) }}%</strong>
              </template>
            </v-progress-linear>
          </v-card>

          <v-card @click="viewItem(item)" color="black" tile>
            <v-card-actions>
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
            </v-card-actions>
          </v-card>

          <v-card color="success" dark tile @click="viewItem(item)">
            <v-card-actions v-if="user">
              <v-spacer></v-spacer>
              ใช้ {{ item.point }} พอยท์
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
      // console.log("item", item);

      let color = "deep-orange";
      let data = Number((this.user.point / item.point) * 100);
      if (data >= 100) {
        color = "light-green darken-4";
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
