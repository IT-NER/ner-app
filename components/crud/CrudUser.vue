<template>
  <div>
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      transition="slide-y-reverse-transition"
      max-width="1024"
    >
      <form @submit.prevent="save">
        <v-card>
          <v-toolbar dense elevation="0">
            {{ title }}
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="dialog = false">
                  mdi-close
                </v-icon>
              </template>
              <div class="title">ปิด</div>
            </v-tooltip>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <form-user :user.sync="user" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="success" type="submit"> บันทึก </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-card style="margin-bottom: 300px">
      <v-card-title elevation="0">
        {{ title }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-select
              :items="departments"
              v-model="itemSearch.departmentId"
              item-text="name"
              item-value="id"
              label="ฝ่าย"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              :items="positions"
              v-model="itemSearch.positionId"
              item-text="name"
              item-value="id"
              label="ตำแหน่ง"
              clearable
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
      <v-toolbar dense elevation="0">
        <v-spacer></v-spacer>

        <v-btn outlined color="primary" @click="getUser"> ค้นหา </v-btn>

        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-title elevation-0>
        <v-text-field v-model="search" label="ค้นหา"></v-text-field>
        <v-spacer></v-spacer>

        <v-btn outlined color="success" @click="addItem"> เพิ่ม </v-btn>

        <v-btn outlined color="primary" @click="refresh"> รีเฟรซ </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-0"
        :search="search"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.fullName="{ item }">
          {{ item.fname }} {{ item.lname }}
        </template>
        <template v-slot:item.editPassword="{ item }">
          <v-btn outlined color="warning" @click="editPassword(item)">
            แก้ไขรหัสผ่าน
          </v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn outlined color="warning" @click="editItem(item)">
            แก้ไข
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialogNewPassword"
      persistent
      max-width="300"
      transition="slide-y-reverse-transition"
    >
      <form @submit.prevent="updatePassword">
        <v-card>
          <v-toolbar dense elevation="0">
            แก้ไขรหัสผ่าน
            <v-spacer></v-spacer>
            <v-icon @click="dialogNewPassword = false">mdi-close</v-icon>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              label="รหัสผ่านใหม่"
              v-model="user.newPassword"
              required
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="success" type="submit"> บันทึก </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import FormUser from "~/components/form/FormUser.vue";

export default {
  components: { FormUser },

  data() {
    return {
      title: "ผู้ใช้งาน",
      search: null,
      dialog: false,
      dialogNewPassword: false,
      overlay: false,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ชื่อ-นามสกุล", value: "fullName" },
        { text: "ฝ่าย", value: "Department.name" },
        { text: "ตำแหน่ง", value: "Position.name" },
        { text: "USERNAME", value: "username" },
        { text: "EMAIL", value: "email" },
        {
          text: "แก้ไขรหัสผ่าน",
          value: "editPassword",
          align: "center",
          sortable: false,
        },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],

      items: [],
      user: {
        id: null,
        email: null,
        username: null,
        password: null,
        lname: null,
        fname: null,
        status: null,
        departmentId: null,
        positionId: null,
        roleId: null,
        point: null,
        imgUrl: null,
        Booking: null,
        Department: null,
        Position: null,
        Role: null,
        Content: null,
        PointReceived: null,
        PointPay: null,
        PointReceivedPay: null,
        ButtonLink: null,
        buttonLinkId: null,
        newPassword: null,
      },

      departments: [],
      positions: [],

      itemSearch: {
        departmentId: null,
        positionId: null,
      },
    };
  },

  created() {
    this.getUser();
    this.getDepartment();
    this.getPosition();
  },

  methods: {
    async refresh() {
      this.itemSearch.departmentId = null;
      this.itemSearch.positionId = null;

      await this.getUser();
    },

    async editPassword(item) {
      console.log(item);
      this.dialogNewPassword = true;
      this.user = item;
    },

    async updatePassword() {
      await this.$axios
        .put("/api/user/update-password/" + Number(this.user.id), {
          data: this.user,
        })
        .then(async (res) => {
          // console.log("res", res.data);
          this.dialogNewPassword = false;
          await this.alertSuccess();
          await this.getUser();
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },

    async getDepartment() {
      this.departments = await this.$axios
        .get("/api/department")
        .then((res) => {
          // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },

    async getPosition() {
      this.positions = await this.$axios
        .get("/api/position")
        .then((res) => {
          // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },

    async save() {
      this.dialog = false;
      this.overlay = true;

      let success = false;

      if (this.user.id > 0) {
        success = await this.update();
      } else {
        success = await this.create();
      }

      if (success) {
        this.overlay = false;
        this.alertSuccess();
      } else {
        this.alertError();
      }

      await this.getUser();
      await this.setItemDefault();
    },

    async setItemDefault() {
      this.user.id = null;
      this.user.email = null;
      this.user.username = null;
      this.user.password = null;
      this.user.lname = null;
      this.user.fname = null;
      this.user.active = true;
      this.user.departmentId = null;
      this.user.positionId = null;
      this.user.roleId = null;
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

    async create() {
      let createUser = await this.$axios
        .post("/api/user", {
          data: this.user,
        })
        .then((res) => {
          // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // console.log("err", err);
          return false;
        });

      return createUser;
    },

    async update() {
      let updateUser = await this.$axios
        .put("/api/user/" + this.user.id, {
          data: this.user,
        })
        .then((res) => {
          // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // console.log("err", err);
          return false;
        });

      return updateUser;
    },

    async addItem() {
      await this.setItemDefault();
      this.dialog = true;
    },

    async editItem(item) {
      this.user = await Object.assign({}, item);
      this.dialog = true;
    },

    async getUser() {
      this.items = await this.$axios
        .post("/api/user/search", {
          data: this.itemSearch,
        })
        .then((res) => {
          // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>
