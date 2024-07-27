<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่อสถานะคอนเทนต์"
            prepend-icon="mdi-list-status"
            required
            v-model="contentStatus.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["contentStatus"],
};
</script>

<style lang="scss" scoped></style>
