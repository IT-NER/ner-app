<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่อฝ่าย"
            prepend-icon="mdi-account-group"
            required
            hide-details
            v-model="department.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["department"],
};
</script>

<style lang="scss" scoped></style>
