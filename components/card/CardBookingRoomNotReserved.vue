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
                <v-icon color="success">mdi-account-star</v-icon>
                {{ list.chairman }}
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

    <!-- <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-0"
      hide-default-footer
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.bookingName="{ item }">
        <v-card v-for="(list, i) in item.Booking" flat>
          <div>
            <v-divider></v-divider>
          </div>
          <div class="title">{{ list.name }}</div>
          <div class="subtitle-2">
            <v-icon color="success">mdi-play</v-icon>
            {{ $moment(list.start).format("l LT") }}
          </div>
          <div class="subtitle-2">
            <v-icon color="error">mdi-stop</v-icon
            >{{ $moment(list.end).format("l LT") }}
          </div>
        </v-card>
      </template>
    </v-data-table> -->
  </div>
</template>

<script>
export default {
  props: ["items"],
};
</script>

<style lang="scss" scoped></style>
