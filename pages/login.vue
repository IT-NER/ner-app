<template>
  <div>
    <v-dialog v-model="dialog" persistent width="300px">
      <form @submit.prevent="login">
        <v-card>
          <v-card-title> NER </v-card-title>
          <v-divider></v-divider>
          <login-form :user.sync="user"></login-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit"> เข้าสู่ระบบ </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import LoginForm from "~/components/LoginForm.vue";

export default {
  layout: "auth",
  components: { LoginForm },

  data() {
    return {
      dialog: false,
      user: {
        identifier: null,
        password: null,
      },
    };
  },

  created() {
    this.dialog = true;
  },

  methods: {
    async login(e) {
      e.preventDefault();

      try {
        const result = await this.$auth.loginWith("local", {
          data: this.user,
        });
        // // console.log("result", result);
        if (result) {
          await this.setStorageAndCookie(result);
          await this.$router.push("/");
        }
      } catch (err) {
        // console.log("errs", err);
        // this.aleartError();
        this.setItemDefault();
        // this.$router.push("/login");
        window.location.href = "/login";
      }
    },

    async setItemDefault() {
      this.user.identifier = null;
      this.user.password = null;
    },

    async setStorageAndCookie(res) {
      let setUniversal = await this.$auth.$storage.setUniversal(
        "user",
        res.data.user
      );
      if (setUniversal) {
        return true;
      }
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
        title: "บันทึกข้อมูล เรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>
