<template>
  <div>
    <v-card flat>
      <v-list nav dense>
        <template v-for="(item, i) in items">
          <v-list-item
            v-if="!item.lists"
            :to="item.link"
            :key="i"
            color="success"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            no-action
            :prepend-icon="item.icon"
            :key="i"
            color="success"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(list, i) in item.lists"
              :key="i"
              :to="list.link"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ list.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ list.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
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
        {
          name: "หน้าแรก",
          icon: "mdi-home",
          link: "/",
        },
        {
          name: "โปรไฟล์",
          icon: "mdi-account-edit",
          link: "/profile",
        },
        {
          name: "ผู้ใช้งาน",
          icon: "mdi-account-cog",
          link: "/user",
        },
        {
          name: "จองห้องประชุม",
          icon: "mdi-calendar",
          link: "",
          lists: [
            {
              name: "ปฏิทิน",
              icon: "mdi-calendar",
              link: "/booking/calendar",
            },
            {
              name: "ประวัติการจอง",
              icon: "mdi-calendar",
              link: "/booking/history",
            },
            {
              name: "รายการจอง (ทั้งหมด)",
              icon: "mdi-calendar",
              link: "/booking/lists-all",
            },
          ],
        },
        {
          name: "ประชาสัมพันธ์",
          icon: "mdi-earth",
          lists: [
            {
              name: "แบนเนอร์",
              icon: "mdi-earth",
              link: "/content/banner",
            },
            {
              name: "กิจกรรม",
              icon: "mdi-earth",
              link: "/content/activity",
            },
            {
              name: "ข่าวสาร",
              icon: "mdi-earth",
              link: "/content/news",
            },
            {
              name: "แลกของรางวัล",
              icon: "mdi-ribbon",
              link: "/reward",
            },
            {
              name: "รับพอยท์",
              icon: "mdi-star",
              link: "/point",
            },
          ],
        },
        {
          name: "ตั้งค่าระบบ",
          icon: "mdi-cog",
          link: "",
          lists: [
            {
              name: "ระบบ ผู้ใช้งาน",
              icon: "mdi-cog",
              link: "/setting/user",
            },
            {
              name: "ระบบ จองห้องประชุม",
              icon: "mdi-cog",
              link: "/setting/booking",
            },
            {
              name: "ระบบ ประชาสัมพันธ์",
              icon: "mdi-cog",
              link: "/setting/content",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
