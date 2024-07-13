<template>
  <div>
    <v-card flat v-if="content">
      <v-card-title> เนื้อหา </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="2">
            <v-text-field
              label="ทิคเก็ท"
              v-model="content.ticket"
              readonly
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              label="CODE"
              v-model="content.code"
              readonly
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              label="POINT"
              v-model="content.point"
              readonly
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" v-if="content.ContentStatus">
            <v-text-field
              label="STATUS"
              v-model="content.ContentStatus.name"
              readonly
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              label="TITLE"
              v-model="content.title"
              readonly
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              label="DESCRIPTION"
              v-model="content.description"
              readonly
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea
              label="DETAILS"
              v-model="content.detail"
              readonly
              hide-details
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title> รูปภาพ </v-card-title>
      <v-divider></v-divider>
      <v-card-actions v-if="content.ContentImg.length > 0">
        <v-row>
          <v-col
            cols="12"
            md="2"
            v-for="(item, i) in content.ContentImg"
            :key="i"
          >
            <v-card flat>
              <v-card-actions>
                <v-spacer></v-spacer>
                <img :src="`/uploads/content/${item.name}`" height="100" />
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-actions>
      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          ไม่มีรูปภาพ
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["content"],
};
</script>

<style lang="scss" scoped></style>
