<template>
  <div>
    <menu-user v-if="showMenuUser" />
    <menu-admin v-if="showMenuAdmin" />
  </div>
</template>

<script>
import MenuAdmin from "./MenuAdmin.vue";
import MenuUser from "./MenuUser.vue";
export default {
  components: { MenuAdmin, MenuUser },
  data() {
    return {
      user: null,
    };
  },

  created() {
    this.main();
  },

  computed: {
    showMenuAdmin() {
      let data = false;
      if (this.user.Role.id > 1) {
        data = true;
      }
      return data;
    },
    showMenuUser() {
      let data = false;
      if (this.user.Role.id == 1) {
        data = true;
      }
      return data;
    },
  },

  methods: {
    async main() {
      this.getUser();
    },
    async getUser() {
      this.user = this.$auth.$storage.getCookie("user");
    },
  },
};
</script>

<style lang="scss" scoped></style>
