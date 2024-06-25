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
        // { text: "หน้าแรก", icon: "mdi-home", link: "/management" },
        {
          text: "จัดการข้อมูลกิจกรรม",
          icon: "mdi-database-cog",
          link: "/management/activity",
        },
        {
          text: "จัดการข้อมูลข่าวสาร",
          icon: "mdi-database-cog",
          link: "/management/new",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
