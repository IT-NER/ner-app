<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            label="TICKET"
            v-model="item.ticket"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-switch label="TIMED" v-model="item.timed" inset></v-switch>
        </v-col>
        <v-col cols="12" md="3">
          <v-switch label="PUBLISH" v-model="item.publish" inset></v-switch>
        </v-col>
        <v-col cols="12" md="3" v-if="item.timed">
          <v-text-field
            label="START"
            v-model="item.start"
            type="date"
            :required="item.timed"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" v-if="item.timed">
          <v-text-field
            label="END"
            v-model="item.end"
            type="date"
            :required="item.timed"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
            label="REMARK"
            v-model="item.remark"
            required
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
