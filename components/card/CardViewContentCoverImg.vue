<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" v-if="item.ContentCoverImg">
          <v-card>
            <v-card-actions>
              <v-img
                :src="item.ContentCoverImg.url"
                width="640"
                height="auto"
              />
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" v-else>
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
