<template>
  <div>
    <v-container fluid>
      <v-row v-if="item.ContentImg.length > 0">
        <v-col cols="12" md="2" v-for="(list, i) in item.ContentImg" :key="i">
          <v-card>
            <v-card-actions>
              <v-img :src="list.url" width="300" height="auto" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <v-alert text prominent type="error" icon="mdi-cloud-alert">
            กรุณาอัพโหลดรูปภาพหน้าปก
          </v-alert>
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
