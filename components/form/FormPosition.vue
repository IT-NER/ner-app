<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่อตำแหน่ง"
            prepend-icon="mdi-shield-account"
            required
            v-model="position.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["position"],
};
</script>

<style lang="scss" scoped></style>
