<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-switch
            label="กำหนดเวลา (ประชาสัมพันธ์)"
            v-model="item.timed"
          ></v-switch>
        </v-col>
        <v-col cols="12" md="6">
          <v-switch label="เปิด (สาธารณะ)" v-model="item.publish"></v-switch>
        </v-col>
        <v-col cols="12" md="6" v-if="item.timed">
          <v-text-field
            label="เริ่ม"
            v-model="item.start"
            type="date"
            :required="item.timed"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" v-if="item.timed">
          <v-text-field
            label="ถึง"
            v-model="item.end"
            type="date"
            :required="item.timed"
          ></v-text-field>
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
