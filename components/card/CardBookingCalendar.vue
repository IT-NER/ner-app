<template>
  <div>
    <v-divider></v-divider>
    <v-card>
      <v-card-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
        <v-spacer></v-spacer>

        <v-btn color="success" @click="$emit('addItem')">
          <v-icon class="mr-2"> mdi-calendar-plus</v-icon>
          จองห้องประชุม
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" @click="setToday"> Today </v-btn>

        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 days</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-btn fab text small color="primary" @click="prev">
          <v-icon small> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn fab text small color="primary" @click="next">
          <v-icon small> mdi-chevron-right </v-icon>
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row class="fill-height">
          <v-col>
            <v-sheet height="500">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :items="items"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="$emit('getItems')"
                locale="TH"
              ></v-calendar>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["items", "item", "getItems", "addItem"],

  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
  }),

  created() {},

  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      // const open = () => {
      //   this.selectedEvent = event;
      //   this.selectedElement = nativeEvent.target;
      //   requestAnimationFrame(() =>
      //     requestAnimationFrame(() => (this.selectedOpen = true))
      //   );
      // };

      // if (this.selectedOpen) {
      //   this.selectedOpen = false;
      //   requestAnimationFrame(() => requestAnimationFrame(() => open()));
      // } else {
      //   open();
      // }

      nativeEvent.stopPropagation();
    },
  },
};
</script>
