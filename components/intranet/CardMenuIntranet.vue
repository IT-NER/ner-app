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
        { text: "หน้าแรก", icon: "mdi-home", link: "/" },
        { text: "ระบบจองห้องประชุม", icon: "mdi-calendar", link: "/booking" },
        { text: "จัดการข้อมูล", icon: "mdi-database-cog", link: "/management" },
        { text: "ตั้งค่าระบบ", icon: "mdi-cog", link: "/setting" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
