<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            label="ประเภท"
            v-model="item.contentTypeId"
            :items="itemsContentType"
            item-text="name"
            item-value="id"
            multiple
            clearable
            hide-details
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            label="สถานะ"
            v-model="item.contentStatusId"
            :items="itemsContentStatus"
            item-text="name"
            item-value="id"
            multiple
            clearable
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["item", "itemsContentType", "itemsContentStatus"],

  data() {
    return {
      dateStartModal: false,
      dateEndModal: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
