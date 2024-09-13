<template>
  <div>
    <v-expansion-panels flat>
      <v-expansion-panel
        v-for="(item, i) in items"
        :key="i"
        v-show="showItem(item)"
      >
        <v-divider></v-divider>
        <v-expansion-panel-header>
          {{ item.name }}
          <span class="ml-2 error--text">
            ({{ item.Booking.length }} รอบ)
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card v-for="(list, y) in item.Booking" :key="y" flat>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="12">
                  <span class="ml-2 error--text"> ({{ y + 1 }}) </span>
                  {{ list.name }}
                </v-col>
                <v-col cols="12" md="4">
                  <v-icon class="mr-2" color="primary">mdi-account</v-icon>
                  {{ list.User.fname }} {{ list.User.lname }}
                </v-col>
                <v-col cols="12" md="4">
                  <v-icon class="mr-2" color="success">mdi-play</v-icon>
                  {{ $moment(list.start).format("LLLL") }} น.
                </v-col>
                <v-col cols="12" md="4">
                  <v-icon class="mr-2" color="error">mdi-stop</v-icon>
                  {{ $moment(list.end).format("LLLL") }} น.
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: ["items", "item"],

  methods: {
    showItem(item) {
      console.log("item", item);
      let count = 0;
      if (item.Booking.length > 0) {
        count = item.Booking.length;
      }
      return count;
    },
  },
};
</script>

<style lang="scss" scoped></style>
