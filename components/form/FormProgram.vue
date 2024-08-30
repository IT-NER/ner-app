<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่อโปรแกรม"
            prepend-icon="mdi-car-esp"
            required
            hide-details
            v-model="program.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["program"],
};
</script>

<style lang="scss" scoped></style>
