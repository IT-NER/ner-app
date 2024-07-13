<template>
  <div>
    <v-card>
      <v-card-title elevation="0">
        {{ title }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title elevation="0">
        <v-text-field v-model="search" label="ค้นหา"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="addItem"> เพิ่ม </v-btn>
        <v-btn color="primary" @click="getContentByContentTypeId">
          รีเฟรช
        </v-btn>
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
        <template v-slot:item.status="{ item }">
          <v-chip label dark color="grey" v-if="item.ContentStatus.id == 1">
            {{ item.ContentStatus.name }}
          </v-chip>
          <v-chip label dark color="warning" v-if="item.ContentStatus.id == 2">
            {{ item.ContentStatus.name }}
          </v-chip>
          <v-chip label dark color="success" v-if="item.ContentStatus.id == 3">
            {{ item.ContentStatus.name }}
          </v-chip>
          <v-chip label dark color="error" v-if="item.ContentStatus.id == 4">
            {{ item.ContentStatus.name }}
          </v-chip>
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
        { text: "TITLE", value: "title" },
        { text: "POINT", value: "point" },
        { text: "STATUS", value: "status" },
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
        contentStatusId: 1,
        active: true,
      },
    };
  },

  created() {
    this.getUser();
    this.getContentByContentTypeId();
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.getContentByContentTypeId();
      }
    },
  },

  methods: {
    async getContentByContentTypeId() {
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
      return user.id;
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
