<template>
  <div>
    <v-card flat>
      <v-divider></v-divider>
      <v-card-title>
        รายชื่อพนักงาน
        <span class="ml-2 success--text">
          <small>(รับพอยท์แล้ว)</small>
        </span>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="addItem">
          <v-icon>mdi-plus</v-icon>
          เพิ่มรายชื่อ
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title>
        <v-text-field
          label="ค้นหา"
          v-model="search1"
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :search="search1"
        :headers="headers1"
        :items="item.PointReceived"
        elevation-0
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.date="{ item }">
          {{ $moment(item.createdAt).format("lll") }} น.
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      max-width="800"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          รายชื่อพนักงาน
          <span class="ml-2 error--text">
            <small>(ยังไม่รับพอยท์)</small>
          </span>
          <v-spacer></v-spacer>
          <v-icon @click="closeDialog">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title>
          <v-text-field
            label="ค้นหา"
            v-model="search2"
            hide-details
            clearable
          ></v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          v-model="selected"
          item-key="id"
          :search="search2"
          :headers="headers2"
          :items="item.UserNotReceived"
          :items-per-page="-1"
          elevation-0
          show-select
          height="400"
          fixed-header
          hide-default-footer
        >
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.date="{ item }">
            {{ $moment(item.createdAt).format("lll") }} น.
          </template>
        </v-data-table>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" outlined @click="addPoint">
            <v-icon> mdi-plus </v-icon>
            บันทึก
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["id"],

  data() {
    return {
      sortBy: "id",
      sortDesc: true,

      item: {
        PointReceived: [],
      },
      dialog: false,

      search1: null,
      headers1: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "วันที่ได้รับ",
          value: "date",
          align: "start",
          sortable: false,
        },
        {
          text: "ชื่อ",
          value: "User.fname",
          align: "start",
          sortable: false,
        },
        {
          text: "นามสกุล",
          value: "User.lname",
          align: "start",
          sortable: false,
        },
        {
          text: "ฝ่าย",
          value: "User.Department.name",
          align: "start",
          sortable: false,
        },
      ],

      search2: null,
      headers2: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "ชื่อ",
          value: "fname",
          align: "start",
          sortable: false,
        },
        {
          text: "นามสกุล",
          value: "lname",
          align: "start",
          sortable: false,
        },
        {
          text: "ฝ่าย",
          value: "Department.name",
          align: "start",
          sortable: false,
        },
      ],

      selected: [],
    };
  },
  watch: {
    dialog(val) {
      if (val) {
        this.getItem();
      } else {
        this.getItem();
      }
    },
  },
  created() {
    this.getItem();
  },
  methods: {
    async addPoint() {
      // console.log("seleceted", this.selected);
      if (!this.selected.length) {
        this.alertNotSelected();
        return;
      }
      let userIds = [];
      this.selected.forEach((e) => {
        userIds.push(e.id);
      });
      let items = {
        contentId: this.item.id,
        userIds: userIds,
      };
      this.item = await this.$axios
        .post("/api/admin/point/received", {
          data: items,
        })
        .then((res) => {
          this.search2 = null;
          this.getItem();
          this.alertSuccess();
          return res.data;
        })
        .catch((err) => {
          return null;
        });
    },

    async alertNotSelected() {
      this.$swal.fire({
        type: "warning",
        title: "ไม่มีข้อมูล",
        text: "กรุณาเลือกรายชื่อพนักงาน",
      });
    },

    async closeDialog() {
      this.dialog = false;
    },
    async getItem() {
      this.item = await this.$axios
        .get("/api/admin/content/" + this.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });
    },
    async addItem() {
      this.dialog = true;
    },

    deleteItem(item) {
      console.log("item", item);
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
