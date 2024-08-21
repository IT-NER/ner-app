<template>
  <div>
    <v-card>
      <v-card-title>
        แลกของรางวัล
        <v-spacer></v-spacer>
        <v-btn color="warning" outlined @click="goToIndex">
          <v-icon class="mr-2"> mdi-reply </v-icon>
          กลับหน้าหลัก
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text> asd </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    async goToIndex() {
      this.$router.push("/redeems");
    },
  },
};
</script>

<style lang="scss" scoped></style>
