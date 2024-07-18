<template>
  <div>
    <v-card flat>
      <v-card-title> ข่าวสาร </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        v-if="show"
        :headers="headers"
        :items="items"
        hide-default-footer
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.type="{ item }">
          {{ item.description }}
        </template>
        <template v-slot:item.detail="{ item }">
          <span class="d-inline-block text-truncate" style="max-width: 300px">
            {{ item.detail }}
          </span>
        </template>
        <template v-slot:item.publish="{ item }">
          {{ $moment(item.start).format("ll") }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="success" target="_blank" :href="`/${item.ticket}`">
            <v-icon class="mr-2">mdi-eye</v-icon>
            เปิดดู
          </v-btn>
        </template>
      </v-data-table>

      <v-card-text v-if="!show">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          COMING SOON
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["contentIds"],

  data() {
    return {
      items: [],
      show: false,
      headers: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
        },
        {
          text: "รายละเอียด",
          value: "detail",
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
          text: "เปิด",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
    };
  },

  watch: {
    contentIds(val) {
      if (val) {
        this.getContentByIds();
      }
    },
  },

  created() {
    this.getContentByIds();
  },

  methods: {
    async getContentByIds() {
      if (this.contentIds.length == 0) {
        this.show = false;
      } else {
        this.show = true;
      }

      this.items = await this.$axios
        .post("/api/content/ids", {
          data: this.contentIds,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>
