<template>
  <div>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            autofocus
            ref="identifier"
            prepend-icon="mdi-account"
            label="EMAIL / USERNAME"
            v-model="user.identifier"
            type="text"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            prepend-icon="mdi-lock"
            v-model="user.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="PASSWORD"
            @click:append="showPassword = !showPassword"
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
