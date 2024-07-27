<template>
  <div>
    <v-card flat>
      <v-card-title elevation="0">
        {{ title }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title elevation="0">
        <v-text-field v-model="search" label="ค้นหา"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" @click="addItem"> เพิ่ม </v-btn>
        <v-btn outlined color="primary" @click="getContent"> รีเฟรช </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :content="content"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn outlined color="warning" @click="editItem(item)">
            แก้ไข
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "ป้ายประกาศ",
      search: null,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ป้ายประกาศ", value: "ticket" },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],
      contents: [],
      content: {
        id: null,
        ticket: null,
        code: null,
        title: null,
        description: null,
        detail: null,
        point: null,
        userId: null,
        contentTypeId: null,
        contentStatusId: null,
        active: null,
        ContentStatus: null,
        ContentType: null,
        User: null,
        ContentImg: null,
        PointPay: null,
        PointReceived: null,
      },
    };
  },

  created() {
    this.getContent();
  },

  methods: {
    async addItem() {
      await this.setItemDefault();
      let ticket = await this.create();
    },
    async create() {
      let content = await this.$axios.post("/api/content", {
        data: this.content,
      });

      console.log("content", content);
    },

    async getContent() {
      this.content = await this.$axios.get("/api/content/banner");
    },

    async setItemDefault() {
      this.user = this.$auth.$storage.getCookie("user");

      this.content.id = null;
      this.content.ticket = null;
      this.content.code = null;
      this.content.description = null;
      this.content.detail = null;
      this.content.point = 0;
      this.content.userId = this.user.id;
      this.content.contentTypeId = 1;
      this.content.contentStatusId = 1;
      this.content.active = true;
    },

    async getUser() {
      this.user = this.$auth.$storage.getCookie("user");
      this.content.userId = this.user.id;
    },

    async editItem(item) {
      this.content = await Object.assign({}, item);
      this.dialog = true;
    },
  },
};
</script>
