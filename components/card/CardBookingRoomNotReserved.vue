<template>
  <div>
    <v-data-table
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
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      headers: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
        },
        {
          text: "ห้องประชุม",
          value: "name",
          align: "start",
          sortable: false,
        },
        {
          text: "หัวข้อ",
          value: "bookingName",
          align: "start",
          sortable: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
