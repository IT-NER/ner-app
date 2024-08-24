<template>
  <div>
    <v-card flat>
      <v-card-title>
        ข้อมูลโปรไฟล์
        <v-spacer></v-spacer>
        <v-btn color="warning" outlined @click="editPassword">
          แก้ไขรหัสผ่าน
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <td width="20%" class="text-right">
                  <h3>ชื่อ</h3>
                </td>
                <td>
                  <h3>{{ item.fname }} {{ item.lname }}</h3>
                </td>
              </tr>
              <tr>
                <td width="20%" class="text-right">
                  <h3>ฝ่าย</h3>
                </td>
                <td>
                  <h3>
                    {{ item.Department.name }}
                  </h3>
                </td>
              </tr>
              <tr>
                <td width="20%" class="text-right">
                  <h3>พอยท์</h3>
                </td>
                <td>
                  <h3>
                    {{ item.point }}
                    <v-icon class="mt-n3">mdi-star</v-icon>
                  </h3>
                </td>
              </tr>
            </thead>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="dialog"
      max-width="300"
      persistent
      transition="dialog-transition"
    >
      <form @submit.prevent="resetPassword">
        <v-card>
          <v-card-title>
            แก้ไขรหัสผ่าน
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              label="รหัสผ่านใหม่"
              v-model="newPassword"
              hide-details
              autofocus
              required
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" outlined type="submit">บันทึก</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
      newPassword: null,
    };
  },
  watch: {
    dialog(val) {
      if (val) {
        this.newPassword = null;
      }
    },
  },
  methods: {
    async editPassword() {
      this.dialog = true;
      this.newPassword = null;
    },
    async resetPassword() {
      let item = {
        id: this.item.id,
        newPassword: this.newPassword,
      };

      await this.$axios
        .post("/api/user/reset-password", {
          data: item,
        })
        .then((res) => {
          this.dialog = false;
          this.alertSuccess();
          this.$emit("getItem");
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
