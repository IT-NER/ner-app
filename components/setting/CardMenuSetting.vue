<template>
  <div>
    <v-card flat>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="success">
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
        // { text: "หน้าแรก", icon: "mdi-home", link: "/setting" },
        {
          text: "ตั้งค่าผู้ใช้งาน",
          icon: "mdi-account-cog",
          link: "/setting/user",
        },
        {
          text: "ตั้งค่าระบบจองห้องประชุม",
          icon: "mdi-calendar-edit",
          link: "/setting/booking",
        },
        {
          text: "ตั้งค่าระบบสะสมพอยท์",
          icon: "mdi-star-cog",
          link: "/setting/content",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
