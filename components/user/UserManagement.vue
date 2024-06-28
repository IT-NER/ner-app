<template>
  <div>
    <v-card flat>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-toolbar dense flat>
        <v-spacer></v-spacer>
        <v-btn color="success" dark @click="addItem" class="float-right">
          <v-icon class="mr-2">mdi-database-plus</v-icon>
          <span>เพิ่ม</span>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          :items-per-page="-1"
          :sort-by="['id']"
          :sort-desc="[true]"
          class="elevation-1"
        >
          <template v-slot:item.index="{ item, index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.status="{ item }">
            <v-switch
              color="success"
              inset
              dense
              hide-details
              v-model="item.status"
              readonly
            ></v-switch>
          </template>
          <template v-slot:item.name="{ item }">
            <span class="mr-2">{{ item.fname }}</span>
            <span>{{ item.lname }}</span>
          </template>
          <template v-slot:item.editPassword="{ item }">
            <v-btn color="warning" small @click="editPassword(item)">
              <v-icon class="mr-auto"> mdi-pencil-lock-outline </v-icon>
              <small>แก้ไขรหัสผ่าน</small>
            </v-btn>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn color="warning" small @click="editItem(item)">
              <v-icon class="mr-auto"> mdi-database-edit </v-icon>
              <small>แก้ไข</small>
            </v-btn>
            <v-btn color="error" small @click="deleteUser(item)">
              <v-icon class="mr-auto"> mdi-database-minus </v-icon>
              <small>ลบ</small>
            </v-btn>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="getRole"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" persistent over-flow="auto" max-width="800">
      <form @submit.prevent="save">
        <v-card>
          <v-toolbar elevation="0" :color="formColor" dark dense>
            <span>
              <v-icon x-large>{{ iconTitle }}</v-icon>
            </span>
            <span class="mr-3">{{ formTitle }}</span>
            <v-spacer></v-spacer>
            <v-icon @click="closeDailog">mdi-close</v-icon>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-container fluid>
              <v-row v-if="editedIndex > -1">
                <v-col cols="12">
                  <v-switch
                    prepend-icon="mdi-account"
                    label="สถานะผู้ใช้"
                    ref="status"
                    inset
                    dense
                    hide-details
                    v-model="editedItem.status"
                  ></v-switch>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <v-text-field
                    autofocus
                    prepend-icon="mdi-email"
                    label="EMAIL"
                    ref="email"
                    type="email"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="editedItem.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <v-text-field
                    prepend-icon="mdi-account"
                    label="USERNAME"
                    ref="username"
                    type="username"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="editedItem.username"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="editedIndex == -1">
                <v-col cols="12" md="6" sm="12">
                  <v-text-field
                    prepend-icon="mdi-lock"
                    label="PASSWORD"
                    ref="password"
                    type="text"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="editedItem.password"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <v-text-field
                    prepend-icon="mdi-card-account-details"
                    label="ชื่อ"
                    ref="fname"
                    type="text"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="editedItem.fname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <v-text-field
                    prepend-icon="mdi-card-account-details"
                    label="นามสกุล"
                    type="text"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="editedItem.lname"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <v-select
                    prepend-icon="mdi-clipboard-account-outline"
                    label="แผนก"
                    ref="Department"
                    :items="Department"
                    item-text="name"
                    item-value="id"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="editedItem.departmentId"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <v-select
                    prepend-icon="mdi-clipboard-account-outline"
                    label="ตำแหน่ง"
                    ref="Position"
                    :items="Position"
                    item-text="name"
                    item-value="id"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="editedItem.positionId"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <v-select
                    prepend-icon="mdi-clipboard-account-outline"
                    label="สิทธิ์"
                    ref="Role"
                    :items="Role"
                    item-text="name"
                    item-value="id"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="editedItem.roleId"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="formColor" type="submit">
              <v-icon>mdi-content-save</v-icon>
              <span> บันทึก </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" max-width="290" persistent>
      <v-card>
        <v-card-title class="text-h5">
          บันทึก ?
          <v-spacer></v-spacer>
          <v-icon @click="dialogConfirm = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text> กดปุ่ม 'ยืนยัน' เพื่อบันทึก </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn ref="btnConfirm" color="success" @click="saveConfirm">
            ยืนยัน
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmEditPassword" max-width="290" persistent>
      <v-card>
        <v-card-title class="text-h5">
          บันทึก ?
          <v-spacer></v-spacer>
          <v-icon @click="dialogConfirmEditPassword = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text> กดปุ่ม 'ยืนยัน' เพื่อบันทึก </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn ref="btnConfirm" color="success" @click="updatePassword">
            ยืนยัน
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogEditPassword"
      persistent
      over-flow="auto"
      max-width="500"
    >
      <form @submit.prevent="confirmUpdatePassword">
        <v-card>
          <v-toolbar elevation="0" color="warning" dark dense>
            <span>
              <v-icon x-large> mdi-pencil-lock-outline </v-icon>
            </span>
            <span class="mr-3"> แก้ไขรหัสผ่าน </span>
            <v-spacer></v-spacer>
            <v-icon @click="closeDailogEditPassword">mdi-close</v-icon>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    autofocus
                    prepend-icon="mdi-lock"
                    label="PASSWORD"
                    ref="password"
                    type="text"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="newPassword"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" type="submit">
              <v-icon>mdi-content-save</v-icon>
              <span> บันทึก </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: null,
      dialogEditPassword: false,
      dialogConfirmEditPassword: false,
      dialogConfirm: false,
      search: "",
      Overlay: false,
      title: "สิทธิ์การใช้งาน",
      dialog: false,
      headers: [
        { text: "ลำดับ", value: "index", align: "center" },
        { text: "Email", value: "email" },
        { text: "Username", value: "username" },
        { text: "ชื่อ - นามสกุล", value: "name" },
        { text: "แผนก", value: "Department.name" },
        { text: "ตำแหน่ง", value: "Position.name" },
        { text: "สิทธิ์", value: "Role.name" },
        { text: "สถานะ", value: "status", align: "center" },
        {
          text: "แก้ไขรหัสผ่าน",
          value: "editPassword",
          align: "center",
          sortable: false,
        },
        {
          text: "ACTIONS",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        id: null,
        email: null,
        username: null,
        password: null,
        lname: null,
        fname: null,
        status: null,
        departmentId: null,
        positionId: 1,
        roleId: 1,
        Department: null,
        Position: null,
        Role: null,
        Booking: null,
        createdAt: null,
        updatedAt: null,
      },
      defaultItem: {
        id: null,
        email: null,
        username: null,
        password: null,
        lname: null,
        fname: null,
        status: 1,
        departmentId: null,
        positionId: 1,
        roleId: 1,
        Department: null,
        Position: null,
        Role: null,
        Booking: null,
        createdAt: null,
        updatedAt: null,
      },

      Department: null,
      Position: null,
      Role: null,
    };
  },

  computed: {
    formColor() {
      return this.editedIndex === -1 ? "success" : "warning";
    },
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่ม" : "แก้ไข";
    },
    iconTitle() {
      return this.editedIndex === -1
        ? "mdi-database-plus"
        : "mdi-database-edit";
    },
  },

  watch: {
    dialog(val) {
      val || this.closeDailog();
    },
  },

  created() {
    this.getRole();
    this.getDepartment();
    this.getPosition();
    this.getUser();
  },

  methods: {
    async updatePassword() {
      this.editedItem["newPassword"] = this.newPassword;

      let updatePassword = await this.$axios
        .put("/api/user/update-password/" + this.editedItem.id, {
          data: this.editedItem,
        })
        .then((res) => {
          // // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // // console.log("err", err);
          return false;
        });

      if (updatePassword) {
        this.closeDailogConfirmEditPassword();
        this.closeDailogEditPassword();
        this.getUser();
        this.alertSuccess();
      } else {
        this.closeDailogConfirmEditPassword();
        this.closeDailogEditPassword();
        this.getUser();
        this.alertError();
      }
    },

    async editPassword(item) {
      console.log(item);
      this.newPassword = null;
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = await Object.assign({}, item);
      this.openDailogEditPassword();
    },

    async confirmUpdatePassword() {
      // console.log("editedItem", this.editedItem);
      // console.log("newPassword", this.newPassword);
      this.openDailogConfirmEditPassword();
    },

    async openDailogEditPassword() {
      this.dialogEditPassword = true;
    },
    async closeDailogEditPassword() {
      this.dialogEditPassword = false;
    },
    async openDailogConfirmEditPassword() {
      this.dialogConfirmEditPassword = true;
    },
    async closeDailogConfirmEditPassword() {
      this.dialogConfirmEditPassword = false;
    },

    async getUser() {
      this.users = await this.$axios
        .get("/api/user")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },
    async getDepartment() {
      this.Department = await this.$axios
        .get("/api/department")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },
    async getPosition() {
      this.Position = await this.$axios
        .get("/api/position")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },
    async getRole() {
      this.Role = await this.$axios
        .get("/api/role")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },
    async getUser() {
      this.users = await this.$axios
        .get("/api/user")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },

    async addItem() {
      this.$nextTick(() => {
        this.openDialog();
      });
    },

    async editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = await Object.assign({}, item);
      this.openDialog();
    },

    async deleteUser(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);

      let delateConfirm = await this.deleteConfirm();

      if (delateConfirm) {
        let user = await this.$axios.delete("/api/user/" + this.editedItem.id);

        if (user) {
          this.setItemDefault();
          this.alertSuccess();
          this.getUser();
        } else {
          this.alertError();
          return;
        }
      } else {
        this.setItemDefault();
      }
    },

    deleteConfirm() {
      let deleteConfirm = this.$swal
        .fire({
          title: "ลบข้อมูล ?",
          text: "กดปุ่ม 'ยืนยัน' เพื่อลบข้อมูล",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        })
        .then(async (res) => {
          return res.value;
        });

      return deleteConfirm;
    },

    async openDialog() {
      this.dialog = true;
    },

    async closeDailog() {
      this.setItemDefault();
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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

    async opensOverlay() {
      this.overlay = true;
    },
    async closeOverlay() {
      this.overlay = false;
    },

    async setItemDefault() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },

    async createUser() {
      let createUser = await this.$axios
        .post("/api/user", {
          data: this.editedItem,
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

    async updateUser() {
      let updateUser = await this.$axios
        .put("/api/user/" + this.editedItem.id, {
          data: this.editedItem,
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

    async openDialogConfirm() {
      this.dialogConfirm = true;
    },
    async closeDialogConfirm() {
      this.dialogConfirm = false;
    },

    async save(e) {
      e.preventDefault();

      this.openDialogConfirm();
    },

    async saveConfirm() {
      this.opensOverlay();

      let user = false;

      if (this.editedIndex > -1) {
        user = await this.updateUser();
      } else {
        user = await this.createUser();
      }

      if (user) {
        await this.closeOverlay();
        await this.closeDialogConfirm();
        await this.closeDailog();
        await this.getUser();
        await this.alertSuccess();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
