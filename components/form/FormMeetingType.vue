<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่อประเภทการประชุม"
            prepend-icon="mdi-format-list-bulleted-type"
            required
            v-model="meetingType.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["meetingType"],
};
</script>

<style lang="scss" scoped></style>
