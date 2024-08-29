<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-select
            label="ชื่อยี่ห้อรถ"
            :required="item.carBrandId"
            hide-details
            autofocus
            :items="itemsCarBrand"
            item-text="name"
            item-value="id"
            v-model="item.carBrandId"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="ชื่อรุ่นรถ"
            required
            hide-details
            v-model="item.name"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      itemsCarBrand: [],
    };
  },
  created() {
    this.getItemsCarBrand();
  },
  methods: {
    async getItemsCarBrand() {
      this.itemsCarBrand = await this.$axios
        .get("/api/admin/car-brand")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
