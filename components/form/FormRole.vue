<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่อสิทธิ์การใช้งาน"
            prepend-icon="mdi-shield-check"
            required
            hide-details
            v-model="role.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["role"],
};
</script>

<style lang="scss" scoped></style>
