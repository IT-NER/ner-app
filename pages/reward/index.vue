<template>
  <div>
    <v-card flat>
      <v-card-title>
        ของรางวัล
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="getItems">
          <v-icon> mdi-refresh </v-icon>
          รีเฟรช
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" @click="addItem">
          <v-icon> mdi-plus </v-icon>
          เพิ่ม
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title>
        <v-text-field
          label="ค้นหา"
          v-model="search"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
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
        <template v-slot:item.active="{ item }">
          <v-chip label color="success" v-if="item.active"> เปิดใช้งาน </v-chip>
          <v-chip label color="error" v-else> ปิดใช้งาน </v-chip>
        </template>
        <template v-slot:item.edit="{ item }">
          <v-btn outlined color="warning" @click="editItem(item)">
            <v-icon> mdi-pencil </v-icon>
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
      search: null,
      items: [],
      item: {
        id: null,
        ticket: null,
        code: null,
        name: null,
        description: null,
        point: 0,
        userId: null,
        active: true,
      },
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ชื่อ", value: "name", align: "start", sortable: false },
        { text: "ทิคเก็ท", value: "ticket", align: "start", sortable: false },
        { text: "รหัส", value: "code", align: "start", sortable: false },
        { text: "พอยท์", value: "point", align: "center", sortable: false },
        { text: "สถานะ", value: "active", align: "center", sortable: false },
        { text: "แก้ไข", value: "edit", align: "center", sortable: false },
      ],
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.items = await this.$axios
        .get("/api/admin/reward")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async editItem(item) {
      this.$router.push("/reward/" + item.id);
    },
    async addItem() {
      let user = this.$auth.$storage.getCookie("user");
      this.item.userId = Number(user.id);

      await this.$axios
        .post("/api/admin/reward", {
          data: this.item,
        })
        .then((res) => {
          this.$router.push(/reward/ + res.data.id);
        })
        .catch((err) => {
          return null;
        });
    },
    async updateActive(item) {
      await this.$axios
        .get("/api/admin/reward/update/active/" + item.id)
        .then((res) => {
          this.getItems();
          this.alertSuccess();
        })
        .catch((err) => {
          this.alertError();
        });
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

<style lang="scss" scoped></style>
