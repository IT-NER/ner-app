<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            label="TICKET"
            v-model="content.ticket"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="CODE"
            v-model="content.code"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" v-if="content.ContentStatus">
          <v-text-field
            label="STATUS"
            v-model="content.ContentStatus.name"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            autofocus
            label="POINT"
            v-model="content.point"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="TITLE"
            v-model="content.title"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="DESCRIPTION"
            v-model="content.description"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
            label="DETAILS"
            v-model="content.detail"
            required
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["content"],
};
</script>

<style lang="scss" scoped></style>
