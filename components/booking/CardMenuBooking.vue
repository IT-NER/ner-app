<template>
  <div>
    <v-card flat>
      <v-list nav dense>
        <v-list-item-group color="success">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
            @click="test(item)"
            v-model="selectedItem"
          >
            <v-list-item-icon>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: {
        text: "กลับหน้าหลัก",
        icon: "mdi-arrow-left-circle",
        link: "/",
      },
      items: [
        { text: "กลับหน้าหลัก", icon: "mdi-arrow-left-circle", link: "/" },
        {
          text: "หน้าแรก",
          icon: "mdi-home",
          link: "/booking/booking-calendar",
        },
        {
          text: "ประวัติการจองห้องประชุม",
          icon: "mdi-history",
          link: "/booking/booking-lists",
        },
        {
          text: "รายการจองห้องประชุม",
          icon: "mdi-clipboard-text-clock",
          link: "/booking/booking-lists-all",
        },
      ],
    };
  },

  methods: {
    test(item) {
      console.log("item", item);
      console.log("selectedItem", this.selectedItem);
    },
  },
};
</script>

<style lang="scss" scoped></style>
