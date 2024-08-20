<template>
  <div>
    <v-card flat>
      <v-alert color="success" dark tile> ข่าวสาร </v-alert>

      <v-container fluid>
        <v-row v-if="items.length > 0">
          <v-col cols="12">
            <v-data-table :headers="headers" :items="items" hide-default-footer>
              <template v-slot:item.no="{ index }">
                {{ index + 1 }}
              </template>

              <template v-slot:item.publish="{ item }">
                {{ $moment(item.start).format("ll") }}
              </template>
              <template v-slot:item.detail="{ item }">
                <v-btn
                  outlined
                  color="success"
                  target="_blank"
                  :href="`/${item.id}`"
                >
                  <v-icon class="mr-2">mdi-eye</v-icon>
                  รายละเอียด
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col cols="12">
            <v-alert text prominent type="error" icon="mdi-cloud-alert">
              COMING SOON
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
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
          let items = [];
          res.data.forEach((e) => {
            if (e.contentCoverImgId) {
              items.push(e);
            }
          });
          return items;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>
