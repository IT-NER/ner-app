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
        <v-btn color="success" @click="addItem"> เพิ่ม </v-btn>
        <v-btn color="primary" @click="getContent"> รีเฟรช </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="contents"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="warning" @click="editItem(item)"> แก้ไข </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "ACTIVITY",
      search: null,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ทิคเก็ท", value: "ticket" },
        { text: "CODE", value: "code" },
        { text: "TITLE", value: "title" },
        { text: "DESCRIPTION", value: "description" },
        { text: "POINT", value: "point" },
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
        contentTypeId: 2,
        contentstatusId: 1,
        active: true,
      },
    };
  },

  created() {
    this.getUser();
    this.getContent();
  },

  methods: {
    async getContent() {
      this.contents = await this.$axios
        .get("/api/content/content-type/" + this.content.contentTypeId)
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async addItem() {
      let activity = await this.create();
      if (!activity) {
        this.alertError();
        return;
      }
      this.$router.push("/content/activity/" + activity.ticket);
    },

    async create() {
      let activity = await this.$axios
        .post("/api/content", {
          data: this.content,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return activity;
    },

    async getUser() {
      let user = this.$auth.$storage.getCookie("user");
      this.content.userId = user.id;
    },

    async editItem(item) {
      this.$router.push("/content/activity/" + item.ticket);
    },

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>
