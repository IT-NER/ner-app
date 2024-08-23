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
          <v-img v-else :src="user.img" />
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
      user: {
        Department: {
          name: null,
        },
      },
    };
  },

  methods: {
    async getUser() {
      let user = this.$auth.$storage.getCookie("user");
      this.user = await this.$axios
        .get("/api/user/" + user.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });
    },
  },
  created() {
    this.getUser();
  },
};
</script>
