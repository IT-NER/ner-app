<template>
  <div>
    <v-card flat>
      <v-list nav dense>
        <v-list-item-group color="success">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
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
      selectedItem: 0,
      items: [
        { text: "กลับหน้าหลัก", icon: "mdi-arrow-left-circle", link: "/" },
        {
          text: "โปรไฟล์",
          icon: "mdi-card-account-details",
          link: "/user/profile",
        },
        {
          text: "พอยท์",
          icon: "mdi-star",
          link: "/user/point",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
