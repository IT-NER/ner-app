<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ชื่ออุปกรณ์"
            prepend-icon="mdi-devices"
            required
            hide-details
            v-model="device.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["device"],
};
</script>

<style lang="scss" scoped></style>
