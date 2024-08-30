<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            autofocus
            label="ชื่อห้องประชุม"
            prepend-icon="mdi-map-marker"
            required
            hide-details
            v-model="room.name"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            prepend-icon="mdi-cog"
            label="จำนวนที่นั่ง"
            ref="quantity"
            type="number"
            hide-details
            v-model="room.quantity"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-row justify="space-around">
            <v-color-picker
              dot-size="25"
              hide-canvas
              hide-mode-switch
              mode="hexa"
              show-swatches
              swatches-max-height="200"
              v-model="room.color"
            ></v-color-picker>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["room"],
};
</script>

<style lang="scss" scoped></style>
