<template>
  <div>
    <v-card flat>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-2" color="warning" to="/content/public/management">
          กลับหน้าหลัก
        </v-btn>
        <v-btn color="primary" type="submit"> บันทึก </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title> ประชาสัมพันธ์ </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <form-content-public
          :contentPublic.sync="contentPublic"
          :contents.sync="contents"
        />
      </v-card-text>
    </v-card>

    <v-divider></v-divider>
  </div>
</template>

<script>
import FormContentPublic from "../form/FormContentPublic.vue";
export default {
  components: { FormContentPublic },
  props: ["contentPublic", "contents"],
};
</script>

<style lang="scss" scoped></style>
