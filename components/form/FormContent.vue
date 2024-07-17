<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          label="ทิคเก็ท"
          hide-details
          v-model="content.ticket"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="CODE"
          hide-details
          v-model="content.code"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" v-if="content.PublishStatus">
        <v-text-field
          label="STATUS"
          hide-details
          v-model="content.PublishStatus.name"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          autofocus
          label="พอยท์"
          hide-details
          v-model="content.point"
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
          label="TITLE"
          hide-details
          v-model="content.title"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field
          label="DESCRIPTION"
          hide-details
          v-model="content.description"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea
          label="DETAILS"
          hide-details
          v-model="content.detail"
          auto-grow
          required
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["content"],
};
</script>

<style lang="scss" scoped></style>
