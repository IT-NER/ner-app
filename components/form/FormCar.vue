<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3">
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
        <v-col cols="12" md="3">
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
        <v-col cols="12" md="3">
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
        <v-col cols="12" md="3">
          <v-autocomplete
            label="สีรถ"
            required
            hide-details
            :items="itemsCarColor"
            item-text="name"
            item-value="id"
            v-model="item.carColorId"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            label="ทะเบียนรถ"
            hide-details
            readonly
            disabled
            v-model="regName"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="ทะเบียน (อักษรย่อ)"
            required
            hide-details
            v-model="item.reg_txt"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="ทะเบียน (ตัวเลข)"
            required
            hide-details
            v-model="item.reg_no"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
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
        <v-col cols="12" md="3">
          <v-text-field
            label="เลขไมล์"
            hide-details
            v-model="item.mileage"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-file-input
            label="รูปภาพหน้าปก"
            accept="image/jpeg, image/png"
            prepend-inner-icon="mdi-cloud-upload"
            clearable
            v-model="item.file"
            @change="handleFile"
          ></v-file-input>
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input
            label="รูปภาพรถ"
            accept="image/jpeg, image/png"
            prepend-inner-icon="mdi-cloud-upload"
            clearable
            multiple
            v-model="item.files"
            @change="handleFiles"
          ></v-file-input>
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
      itemsCarColor: [],
      itemsProvince: [],
      province: {
        name: null,
      },
    };
  },
  created() {
    this.getCarType();
    this.getCarBrand();
    this.getCarColor();
    this.getProvince();
  },
  computed: {
    regName() {
      let txt1 = "";
      let txt2 = "";
      let txt3 = "";
      if (this.item.reg_txt) {
        txt1 = this.item.reg_txt;
      }
      if (this.item.reg_no) {
        txt2 = this.item.reg_no;
      }
      if (this.item.provinceId) {
        txt3 = this.province.name;
      }
      let data = txt1 + "-" + txt2 + "-" + txt3;
      this.item.name = data;
      return data;
    },
  },
  methods: {
    async handleFile(e) {
      console.log("e", e);

      if (!e) {
        return;
      }

      let size = await this.checkSize(e);
      let type = await this.checkType(e);

      if (!size) {
        this.item.file = null;
      }
      if (!type) {
        this.item.file = null;
      }
    },
    async handleFiles(e) {
      if (!e) {
        return;
      }

      this.item.files.forEach(async (e) => {
        let size = await this.checkSize(e);
        let type = await this.checkType(e);

        let index = this.item.files.indexOf(e);
        if (!size) {
          this.item.files.splice(index, 1);
        }
        if (!type) {
          this.item.files.splice(index, 1);
        }
      });
    },

    async checkSize(item) {
      let data = false;
      if (item.size <= 3000000) {
        data = true;
      }
      return data;
    },
    async checkType(item) {
      let data = false;
      if (item.type == "image/jpeg") {
        data = true;
      }
      if (item.type == "image/png") {
        data = true;
      }
      return data;
    },
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
    async getCarColor() {
      this.itemsCarColor = await this.$axios
        .get("/api/admin/car-color-asc")
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
