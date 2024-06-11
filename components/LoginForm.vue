<template>
  <div>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            autofocus
            ref="identifier"
            prepend-inner-icon="mdi-account"
            label="Email/Username"
            v-model="user.identifier"
            type="text"
            outlined
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            prepend-inner-icon="mdi-lock"
            v-model="user.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            @click:append="showPassword = !showPassword"
            outlined
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: ["user"],

  data() {
    return {
      showPassword: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
