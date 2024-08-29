<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            label="ประเภทรถ"
            required
            hide-details
            autofocus
            :items="itemsCarType"
            item-text="name"
            item-value="id"
            v-model="item.carTypeId"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            label="ยี่ห้อรถ"
            required
            hide-details
            :items="itemsCarBrand"
            item-text="name"
            item-value="id"
            v-model="item.carBrandId"
            @change="getCarModel"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            label="รุ่นรถ"
            required
            hide-details
            :items="itemsCarModel"
            item-text="name"
            item-value="id"
            v-model="item.carModelId"
            :disabled="!itemsCarModel.length"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            label="ทะเบียนรถ"
            hide-details
            readonly
            v-model="regName"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="ทะเบียน (อักษรย่อ)"
            required
            hide-details
            v-model="item.reg_txt"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="ทะเบียน (ตัวเลข)"
            required
            hide-details
            v-model="item.reg_no"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            label="ทะเบียน (จังหวัด)"
            required
            hide-details
            :items="itemsProvince"
            item-text="name"
            item-value="id"
            v-model="item.provinceId"
            @change="getProvinceById"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="เลขไมล์"
            hide-details
            v-model="item.mileage"
            type="number"
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
      itemsCarType: [],
      itemsCarBrand: [],
      itemsCarModel: [],
      itemsProvince: [],
      province: {
        name: null,
      },
    };
  },
  created() {
    this.getCarType();
    this.getCarBrand();
    this.getProvince();
  },
  computed: {
    regName() {
      if (!this.item.provinceId) {
        this.province.name = null;
      }
      let data =
        this.item.reg_txt + "-" + this.item.reg_no + "-" + this.province.name;
      this.item.name = data;
      return data;
    },
  },
  methods: {
    async getProvinceById() {
      this.province = await this.$axios
        .get("/api/admin/province/" + this.item.provinceId)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });
    },

    async getProvince() {
      this.itemsProvince = await this.$axios
        .get("/api/admin/province")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async getCarModel() {
      this.itemsCarModel = await this.$axios
        .get("/api/admin/car-model/brand/" + this.item.carBrandId)
        .then((res) => {
          if (!res.data.length) {
            this.item.carModelId = null;
          }
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async getCarBrand() {
      this.itemsCarBrand = await this.$axios
        .get("/api/admin/car-brand")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async getCarType() {
      this.itemsCarType = await this.$axios
        .get("/api/admin/car-type")
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
