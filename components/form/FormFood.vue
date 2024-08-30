<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่ออาหาร"
            prepend-icon="mdi-food"
            required
            hide-details
            v-model="food.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["food"],
};
</script>

<style lang="scss" scoped></style>
