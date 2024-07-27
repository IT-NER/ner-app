<template>
  <div>
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
          <v-btn
            outlined
            ref="btnConfirm"
            color="success"
            @click="updatePassword"
          >
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
            <v-btn outlined color="warning" type="submit">
              <v-icon>mdi-content-save</v-icon>
              <span> บันทึก </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <v-card flat>
      <v-card-title>
        โปรไฟล์
        <v-spacer></v-spacer>
        <v-btn outlined color="warning" small @click="editPassword">
          <v-icon class="mr-auto"> mdi-pencil-lock-outline </v-icon>
          <small>แก้ไขรหัสผ่าน</small>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="d-flex align-center justify-center h-100">
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ user.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-card-account-details</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                >{{ user.fname }} {{ user.lname }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ user.Department.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      newPassword: null,
      user: null,
      dialog: true,
      dialogEditPassword: false,
      dialogConfirmEditPassword: false,
    };
  },

  created() {
    this.getUser();
  },

  methods: {
    async editPassword() {
      this.newPassword = null;
      //   this.editedIndex = this.users.indexOf(item);
      this.editedItem = await Object.assign({}, this.user);
      this.openDailogEditPassword();
    },

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
      this.user = this.$auth.$storage.getCookie("user");
      console.log("user", this.user);
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

<style scoped>
.headline {
  font-weight: bold;
  text-align: center;
}
</style>
