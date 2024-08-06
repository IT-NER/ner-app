<template>
  <div>
    <v-card>
      <v-card-title elevation="0">
        {{ title }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-btn outlined color="success" @click="addItem"> เพิ่ม </v-btn>
        <v-btn outlined color="primary" @click="getItems"> รีเฟรช </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="ค้นหา"
          hide-details
        ></v-text-field>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip label color="gray" dark v-if="item.contentStatusId == 1">
            {{ item.ContentStatus.name }}
          </v-chip>
          <v-chip label color="success" dark v-if="item.contentStatusId == 2">
            {{ item.ContentStatus.name }}
          </v-chip>
          <v-chip label color="error" dark v-if="item.contentStatusId == 3">
            {{ item.ContentStatus.name }}
          </v-chip>
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
      title: "BANNER",
      search: null,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ทิคเก็ท", value: "ticket" },
        { text: "TITLE", value: "title" },
        { text: "พอยท์", value: "point" },
        { text: "สถานะ", value: "status" },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],

      items: [],
      item: {
        id: null,
        ticket: null,
        code: null,
        title: null,
        description: null,
        detail: null,
        point: null,
        userId: null,
        contentTypeId: 1,
        contentStatusId: 1,
        active: true,
      },
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    async setItemDefault() {
      this.item.id = null;
      this.item.start = this.$moment().format("YYYY-MM-DDT00:00");
      this.item.end = this.$moment().format("YYYY-MM-DDT00:00");
      this.item.ticket = null;
      this.item.code = null;
      this.item.title = null;
      this.item.description = null;
      this.item.detail = null;
      this.item.point = null;
      this.item.userId = null;
      this.item.contentTypeId = 1;
      this.item.contentStatusId = 1;
      this.item.active = true;
    },

    async getItems() {
      this.items = await this.$axios
        .get("/api/content/contentType/" + this.item.contentTypeId)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async addItem() {
      await this.setItemDefault();
      await this.getUser();
      await this.create();
    },

    async create() {
      await this.$axios
        .post("/api/content", {
          data: this.item,
        })
        .then((res) => {
          this.$router.push("/content/banner/" + res.data.ticket);
        })
        .catch((err) => {
          this.alertError();
          return;
        });
    },

    async getUser() {
      let user = await this.$auth.$storage.getCookie("user");
      this.item.userId = await user.id;
    },

    async editItem(item) {
      this.$router.push("/content/banner/" + item.ticket);
    },

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
      });
    },

    async alertSuccess() {
      this.$swal.fire({
        position: "top-end",
        type: "success",
        title: "บันทึก เรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>
