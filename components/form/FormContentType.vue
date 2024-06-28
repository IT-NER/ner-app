<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่อประเภทคอนเทนต์"
            prepend-icon="mdi-list-status"
            required
            v-model="contentType.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["contentType"],
};
</script>

<style lang="scss" scoped></style>
