<template>
  <div>
    <v-expansion-panels flat>
      <v-expansion-panel v-for="(item, i) in items" :key="i">
        <v-divider></v-divider>
        <v-expansion-panel-header>
          {{ item.name }}
          <span class="ml-2 error--text">
            ทั้งหมด {{ item.Booking.length }} รอบ
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card v-for="(list, y) in item.Booking" :key="y" flat>
            <v-divider></v-divider>
            <v-card-text>
              <div class="title">
                {{ list.name }}
              </div>
              <div class="subtitle-2">
                <v-icon color="success">mdi-account</v-icon>
                {{ list.User.fname }} {{ list.User.lname }}
              </div>
              <div class="subtitle-2">
                <v-icon color="success">mdi-play</v-icon>
                {{ $moment(list.start).format("l LT") }}
              </div>
              <div class="subtitle-2">
                <v-icon color="error">mdi-stop</v-icon
                >{{ $moment(list.end).format("l LT") }}
              </div>
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
};
</script>

<style lang="scss" scoped></style>
