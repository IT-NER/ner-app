<template>
  <div>
    <v-divider></v-divider>
    <v-card>
      <v-card-title v-if="$refs.calendar">
        {{ $refs.calendar.title }}
        <v-spacer></v-spacer>

        <v-btn outlined color="success" @click="$emit('addItem')">
          <v-icon> mdi-calendar-plus</v-icon>
          จองห้องประชุม
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn outlined color="primary" @click="setToday"> Today </v-btn>

        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="primary" v-bind="attrs" v-on="on">
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
            <v-sheet height="auto">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="items"
                :type="type"
                @click:event="$emit('viewItem', $event.event)"
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
import CardBookingListDay from "./CardBookingListDay.vue";
export default {
  components: {
    CardBookingListDay,
  },
  props: ["items", "item", "dateFocus"],

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

  watch: {
    focus(val) {
      this.$emit("update:dateFocus", val);
    },
  },
  methods: {
    viewDay({ date }) {
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
    async showEvent({ event }) {
      let item = await Object.assign({}, event);
      this.$emit("update:item", item);
      this.$emit("viewItem");
    },
  },
};
</script>
