<template>
  <div>
    <v-card flat>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-avatar size="100">
          <v-img
            v-if="!user.img"
            src="https://investor.nerubber.com/themes/default/assets/static/images/logo-stroke.png"
          />
          <v-img v-else :src="`/uploads/profile/${user.img}`" />
        </v-avatar>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        <h3>{{ user.fname }} {{ user.lname }}</h3>
        <h3>{{ user.Department.name }}</h3>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },

  methods: {
    async getUser() {
      this.user = this.$auth.$storage.getCookie("user");
      // console.log("user", this.user);
    },
  },
  created() {
    this.getUser();
  },
};
</script>
