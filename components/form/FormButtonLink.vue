<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-switch
            label="สถานะการใช้งาน"
            inset
            hide-details
            class="float-right"
            v-model="item.active"
          ></v-switch>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="ชื่อปุ่ม"
            required
            hide-details
            autofocus
            v-model="item.name"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="ลิ้งค์"
            required
            hide-details
            v-model="item.url"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="หมายเหตุ"
            required
            hide-details
            v-model="item.remark"
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
