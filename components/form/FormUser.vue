<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-switch
            prepend-icon="mdi-account"
            label="USER ACTIVE"
            inset
            v-model="user.active"
          ></v-switch>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            autofocus
            label="FIRSTNAME"
            prepend-icon="mdi-account-cog"
            required
            hide-details
            v-model="user.fname"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="LASTNAME"
            prepend-icon="mdi-account-cog"
            required
            hide-details
            v-model="user.lname"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="12">
          <v-text-field
            prepend-icon="mdi-account"
            label="USERNAME"
            required
            hide-details
            v-model="user.username"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="12">
          <v-text-field
            prepend-icon="mdi-email"
            label="EMAIL"
            type="email"
            required
            hide-details
            v-model="user.email"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" sm="12">
          <v-select
            prepend-icon="mdi-account"
            :items="departments"
            item-text="name"
            item-value="id"
            v-model="user.departmentId"
            label="DEPARTMENT"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6" sm="12">
          <v-select
            prepend-icon="mdi-account"
            :items="positions"
            item-text="name"
            item-value="id"
            v-model="user.positionId"
            label="POSITION"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6" sm="12">
          <v-select
            prepend-icon="mdi-account"
            :items="roles"
            item-text="name"
            item-value="id"
            v-model="user.roleId"
            label="ROLE"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" sm="12" v-if="user.id > 0">
          <v-text-field
            prepend-icon="mdi-star"
            label="พอยท์"
            type="text"
            hide-details
            disabled
            v-model="user.point"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["user"],

  data() {
    return {
      departments: [],
      positions: [],
      roles: [],
    };
  },

  created() {
    this.getDepartment();
    this.getPosition();
    this.getRole();
  },

  methods: {
    async getDepartment() {
      this.departments = await this.$axios
        .get("/api/department")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },
    async getRole() {
      this.roles = await this.$axios
        .get("/api/role")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },

    async getPosition() {
      this.positions = await this.$axios
        .get("/api/position")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
