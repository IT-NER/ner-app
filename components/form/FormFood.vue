<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่ออาหาร"
            prepend-icon="mdi-food"
            required
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
