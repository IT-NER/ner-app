<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่อเครื่องดื่ม"
            prepend-icon="mdi-coffee"
            required
            hide-details
            v-model="drink.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["drink"],
};
</script>

<style lang="scss" scoped></style>
