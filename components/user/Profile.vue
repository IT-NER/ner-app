<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <form @submit.prevent="uploadsFile">
            <v-card flat>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-avatar size="300px">
                  <v-img
                    lazy-src="https://investor.nerubber.com/themes/default/assets/static/images/logo-stroke.png"
                    src="https://investor.nerubber.com/themes/default/assets/static/images/logo-stroke.png"
                  >
                  </v-img>
                </v-avatar>

                <v-spacer></v-spacer>
              </v-card-title>
              <v-divider></v-divider>
              <v-toolbar elevation="0">
                <input type="file" :v-model="file" @change="handleFile" />
              </v-toolbar>
              <v-divider></v-divider>
              <v-toolbar dense elevation="0">
                <v-spacer></v-spacer>
                <v-btn text color="success" type="Submit">
                  <v-icon class="mr-2">mdi-tray-arrow-up</v-icon>
                  อัพโหลดโปรไฟล์
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
            </v-card>
          </form>
        </v-col>
        <v-col cols="12" md="8">
          <v-card flat>
            <v-toolbar dense elevation="0">
              <v-spacer></v-spacer>
              <v-btn text color="warning" @click="editPassword">
                <v-icon class="mr-2"> mdi-lock </v-icon>
                แก้ไขรหัสผ่าน
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <div class="title">ชื่อ-สกุล</div>
                    <div class="sub-title">
                      {{ user.fname }} {{ user.lname }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <div class="title">ฝ่าย</div>
                    <div class="sub-title">
                      {{ user.Department.name }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <div class="title">ฝ่าย</div>
                    <div class="sub-title">
                      {{ user.Department.name }}
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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
  layout: "profile",
  data() {
    return {
      editedItem: null,
      newPassword: null,
      dialog: true,
      dialogEditPassword: false,
      dialogConfirmEditPassword: false,
      user: null,
      file: null,
    };
  },

  created() {
    this.getUser();
  },

  methods: {
    async handleFile() {},
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
        this.aleartError();
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
    async aleartError() {
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
    async getUser() {
      this.user = this.$auth.$storage.getCookie("user");
    },
  },
};
</script>

<style lang="scss" scoped></style>
