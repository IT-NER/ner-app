<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            label="ทิคเก็ท"
            required
            v-model="item.ticket"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="CODE"
            v-model="item.code"
            required
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="พอยท์"
            required
            v-model="item.point"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-switch
            label="label"
            v-model="item.active"
            inset
            class="float-end"
            @click="$emit('updateActive')"
          >
            <template v-slot:label>
              <span v-if="item.active"> เปิดใช้งาน </span>
              <span v-else> ปิดใช้งาน </span>
            </template>
          </v-switch>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            autofocus
            label="NAME"
            required
            v-model="item.name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-textarea
            label="DESCRIPTION"
            required
            v-model="item.description"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss" scoped></style>
