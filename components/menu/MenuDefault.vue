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
          name: "ผู้ใช้งาน",
          icon: "mdi-account",
          link: "/user",
        },

        {
          name: "ประชาสัมพันธ์",
          icon: "mdi-earth",
          lists: [
            {
              name: "รายการประชาสัมพันธ์",
              icon: "mdi-earth",
              link: "/content",
            },
            {
              name: "แลกของรางวัล",
              icon: "mdi-earth",
              link: "/redeem",
            },
            {
              name: "รับพอยท์",
              icon: "mdi-earth",
              link: "/point/received",
            },
            {
              name: "จ่ายพอยท์",
              icon: "mdi-earth",
              link: "/point/pay",
            },
            {
              name: "ของรางวัล",
              icon: "mdi-earth",
              link: "/reward",
            },
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
          ],
        },
        {
          name: "ตั้งค่า",
          icon: "mdi-cog",
          link: "",
          lists: [
            {
              name: "ผู้ใช้งาน",
              icon: "mdi-cog",
              link: "/setting/user",
            },
            {
              name: "จองห้องประชุม",
              icon: "mdi-cog",
              link: "/setting/booking",
            },
            {
              name: "ประชาสัมพันธ์",
              icon: "mdi-cog",
              link: "/setting/content",
            },
          ],
        },
        // {
        //   name: "จองห้องประชุม",
        //   icon: "mdi-calendar",
        //   link: "",
        //   lists: [
        //     {
        //       name: "ปฏิทิน",
        //       icon: "mdi-calendar",
        //       link: "/booking/booking-calendar",
        //     },
        //     {
        //       name: "ประวัติการจอง",
        //       icon: "mdi-calendar",
        //       link: "/booking/booking-lists",
        //     },
        //     {
        //       name: "รายการจอง (ทั้งหมด)",
        //       icon: "mdi-calendar",
        //       link: "/booking/booking-lists-all",
        //     },
        //   ],
        // },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
