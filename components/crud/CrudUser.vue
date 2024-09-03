<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-card flat>
      <v-card-title>
        ผู้ใช้งาน
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete
                :items="departments"
                v-model="filter.departmentId"
                item-text="name"
                item-value="id"
                label="ฝ่าย"
                clearable
                hide-details
                multiple
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="positions"
                v-model="filter.positionId"
                item-text="name"
                item-value="id"
                label="ตำแหน่ง"
                clearable
                hide-details
                multiple
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="getUser">
          <v-icon>mdi-magnify</v-icon>
          ค้นหา
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" @click="addItem">
          <v-icon>mdi-plus</v-icon>
          เพิ่ม
        </v-btn>
        <v-btn outlined color="primary" @click="refresh">
          <v-icon>mdi-refresh</v-icon>
          รีเฟรซ
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="ค้นหา"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
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
        <!-- <template v-slot:item.date="{ item }">
          {{ $moment(item.createdAt).format("ll") }}
        </template> -->

        <template v-slot:item.editPassword="{ item }">
          <v-btn outlined color="warning" @click="editPassword(item)">
            <v-icon>mdi-pencil-lock</v-icon>
            แก้ไขรหัสผ่าน
          </v-btn>
        </template>
        <template v-slot:item.active="{ item }">
          <v-chip label :color="getColorActive(item.active)">
            <span v-if="item.active"> เปิด </span>
            <span v-else> ปิด </span>
          </v-chip>
        </template>
        <template v-slot:item.edit="{ item }">
          <v-btn outlined color="warning" @click="editItem(item)">
            <v-icon>mdi-pencil</v-icon>
            แก้ไข
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      transition="slide-y-reverse-transition"
      width="800"
    >
      <form @submit.prevent="save">
        <v-card>
          <v-card-title>
            {{ title }}
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false"> mdi-close </v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <form-user :user.sync="user" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="success" type="submit">
              <v-icon>mdi-content-save</v-icon>
              บันทึก
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <!-- editPassword -->
    <v-dialog
      v-model="dialogNewPassword"
      persistent
      width="300"
      transition="slide-y-reverse-transition"
    >
      <form @submit.prevent="updatePassword">
        <v-card>
          <v-card-title>
            แก้ไขรหัสผ่าน
            <v-spacer></v-spacer>
            <v-icon @click="dialogNewPassword = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="รหัสผ่านใหม่"
                    v-model="user.newPassword"
                    hide-details
                    required
                    autofocus
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="success" type="submit">
              <v-icon>mdi-content-save</v-icon>
              บันทึก
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import FormUser from "~/components/form/FormUser.vue";

export default {
  components: { FormUser },

  data() {
    return {
      search: null,
      dialog: false,
      dialogNewPassword: false,
      overlay: false,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        // { text: "วันที่", value: "date", sortable: false },
        { text: "ชื่อ", value: "fname", sortable: false },
        { text: "นามสกุล", value: "lname", sortable: false },
        { text: "ฝ่าย", value: "Department.name", sortable: false },
        { text: "ตำแหน่ง", value: "Position.name", sortable: false },
        { text: "USERNAME", value: "username", sortable: false },
        { text: "EMAIL", value: "email", sortable: false },
        { text: "พอยท์", value: "point", align: "end", sortable: false },
        {
          text: "สถานะการใช้งาน",
          value: "active",
          align: "center",
          sortable: false,
        },
        {
          text: "แก้ไขรหัสผ่าน",
          value: "editPassword",
          align: "center",
          sortable: false,
        },
        { text: "แก้ไข", value: "edit", align: "center", sortable: false },
      ],

      items: [],
      user: {
        id: null,
        email: null,
        username: null,
        password: null,
        lname: null,
        fname: null,
        active: true,
        point: 0,
        img: null,
        buttonLinkId: null,
        departmentId: null,
        positionId: null,
        roleId: null,

        ButtonLink: [],
        Department: [],
        Position: [],
        Role: [],
        Booking: [],
        Content: [],
        Reward: [],
        PointReceived: [],
        PointPay: [],
        PointReceivedPay: [],

        newPassword: null,
      },

      departments: [],
      positions: [],

      filter: {
        departmentId: [],
        positionId: [1, 2, 3],
      },
    };
  },

  created() {
    this.getUser();
    this.getDepartment();
    this.getPosition();
  },

  computed: {
    title() {
      let data = "เพิ่ม";
      if (this.user.id > 0) {
        data = "แก้ไข";
      }
      return data;
    },
  },

  methods: {
    getColorActive(active) {
      let data = "success";
      if (!active) {
        data = "error";
      }
      return data;
    },
    async refresh() {
      this.filter.departmentId = [];
      this.filter.positionId = [1, 2, 3];
      await this.getUser();
    },

    async editPassword(item) {
      // // console.log(item);
      this.dialogNewPassword = true;
      this.user = item;
    },

    async updatePassword() {
      await this.$axios
        .put("/api/user/update-password/" + Number(this.user.id), {
          data: this.user,
        })
        .then(async (res) => {
          // // console.log("res", res.data);
          this.dialogNewPassword = false;
          await this.alertSuccess();
          await this.getUser();
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },

    async getDepartment() {
      this.departments = await this.$axios
        .get("/api/department")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },

    async getPosition() {
      this.positions = await this.$axios
        .get("/api/position")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },

    async save() {
      // // console.log("user", this.user);
      // return;

      this.dialog = false;
      this.overlay = true;

      let success = false;

      if (this.user.id) {
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
          // // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // // console.log("err", err);
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
          // // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // // console.log("err", err);
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
        .post("/api/admin/user/filter", {
          data: this.filter,
        })
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
  },
};
</script>
