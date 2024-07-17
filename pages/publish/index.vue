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
        <v-btn color="primary" @click="getPublish"> รีเฟรช </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="publishs"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.start="{ item }">
          <span v-if="item.start">
            {{ $moment(item.start).format("lll") }}
          </span>
        </template>
        <template v-slot:item.end="{ item }">
          <span v-if="item.end">
            {{ $moment(item.end).format("lll") }}
          </span>
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
      title: "รายการประชาสัมพันธ์",

      search: null,
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ทิคเก็ท", value: "ticket" },
        { text: "เนื้อหา", value: "Content.title" },
        { text: "ประเภท", value: "Content.ContentType.name" },
        { text: "เริ่ม", value: "start" },
        { text: "สิ้นสุด", value: "end" },

        { text: "หมายเหตุ", value: "remark" },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],

      publishs: [],
      publish: {
        id: null,
        ticket: null,
        start: null,
        end: null,
        timed: true,
        remark: null,
        active: true,
        publish: true,
        Content: [],
        contentId: null,
        User: [],
        userId: null,
      },
    };
  },

  created() {
    this.getPublish();
  },

  methods: {
    async getUser() {
      let user = this.$auth.$storage.getCookie("user");
      return user.id;
    },

    async editItem(item) {
      this.publish = Object.assign({}, item);
      this.$router.push("/publish/" + this.publish.ticket);
    },

    async getPublish() {
      this.publishs = await this.$axios
        .get("/api/publish")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },

    async addItem() {
      this.publish.userId = await this.getUser();
      console.log("publish", this.publish);

      let ticket = await this.$axios
        .post("/api/publish", {
          data: this.publish,
        })
        .then((res) => {
          return res.data.ticket;
        })
        .catch((err) => {
          return false;
        });

      if (!ticket) {
        this.alertError();
        return;
      }

      this.$router.push("/publish/" + ticket);
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

<style lang="scss" scoped></style>
