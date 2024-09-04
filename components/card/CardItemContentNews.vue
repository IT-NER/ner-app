<template>
  <div>
    <v-card flat>
      <v-alert color="success" dark tile> ข่าวสาร </v-alert>
      <v-card-text v-if="items.length > 0">
        <v-data-table :headers="headers" :items="items">
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.publish="{ item }">
            <span v-if="item.start">
              {{ $moment(item.start).format("ll") }}
            </span>
            <span v-else>
              {{ $moment(item.createdAt).format("ll") }}
            </span>
          </template>
          <template v-slot:item.detail="{ item }">
            <v-btn
              outlined
              color="success"
              target="_blank"
              :href="`/${item.id}`"
            >
              <v-icon>mdi-eye</v-icon>
              รายละเอียด
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          COMING SOON
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      headers: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
        },
        {
          text: "หัวข้อ",
          value: "title",
          align: "start",
          sortable: false,
        },
        {
          text: "คำอธิบาย",
          value: "description",
          align: "start",
          sortable: false,
        },
        {
          text: "ประกาศเมื่อ",
          value: "publish",
          align: "center",
          sortable: false,
          width: 100,
        },
        {
          text: "รายละเอียด",
          value: "detail",
          align: "center",
          sortable: false,
        },
      ],
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      this.items = await this.$axios
        .get("/api/content/publish/news")
        .then((res) => {
          // let items = [];
          // res.data.forEach((e) => {
          //   if (e.contentCoverImgId) {
          //     items.push(e);
          //   }
          // });
          // return items;
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>
