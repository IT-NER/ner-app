<template>
  <div>
    <v-card flat>
      <v-card-title>
        รถ
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="addItem">
          <v-icon>mdi-plus</v-icon>
          เพิ่ม
        </v-btn>
        <v-btn color="primary" outlined @click="refresh">
          <v-icon>mdi-refresh</v-icon>
          รีเฟรช
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <v-text-field
          label="ค้นหา"
          prepend-icon="mdi-magnify"
          v-model="search"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-data-table :headers="headers" :items="items" :search="search">
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.edit="{ item }">
          <v-btn color="warning" outlined @click="editItem(item)">
            <v-icon>mdi-pencil</v-icon>
            แก้ไข
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      width="1000"
      transition="dialog-transition"
    >
      <form @submit.prevent="save">
        <v-card>
          <v-card-title>
            {{ title }}
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <form-car
              :item.sync="item"
              :itemsCarType.sync="itemsCarType"
              :itemsCarBrand.sync="itemsCarBrand"
              :itemsCarModel.sync="itemsCarModel"
              :itemsCarColor.sync="itemsCarColor"
              :itemsProvince.sync="itemsProvince"
              :file.sync="file"
              :files.sync="files"
              @getCarModel="getCarModel"
            />
            <!-- </v-card-text>
          <v-divider></v-divider>
          <v-card-text> -->
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card flat v-if="item.img">
                    <v-card-text>
                      <v-img :src="item.img" />
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-container fluid :v-show="item.CarImg">
                    <v-row>
                      <v-col cols="3" v-for="(list, i) in item.CarImg" :key="i">
                        <v-card>
                          <v-card-actions>
                            <v-img :src="list.url" :aspect-ratio="16 / 9" />
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" outlined type="submit">
              <v-icon>mdi-content-save</v-icon>
              บันทึก
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import FormCar from "~/components/form/FormCar.vue";

export default {
  components: { FormCar },
  data() {
    return {
      dialog: false,
      search: null,
      items: [],
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ทะเบียน", value: "name" },
        // { text: "ทะเบียน", value: "reg" },
        // { text: "จังหวัด", value: "Province.name" },
        { text: "ประเภทรถ", value: "CarType.name" },
        { text: "ยี่ห้อรถ", value: "CarBrand.name" },
        { text: "รุ่นรถ", value: "CarModel.name" },
        { text: "สีรถ", value: "CarColor.name" },
        { text: "แก้ไข", value: "edit", align: "center", sortable: false },
      ],
      item: {
        id: null,
        name: null,
        reg: null,
        mileage: null,
        qty: null,
        active: null,
        img: null,
        remark: null,
        carTypeId: null,
        carBrandId: null,
        carModelId: null,
        carColorId: null,
        provinceId: null,

        CarType: [],
        CarBrand: [],
        CarModel: [],
        Province: [],
        CarColor: [],
        CarImg: [],
      },

      itemsCarType: [],
      itemsCarBrand: [],
      itemsCarModel: [],
      itemsCarColor: [],
      itemsProvince: [],

      file: null,
      files: [],
    };
  },

  computed: {
    title() {
      let data = "เพิ่ม";
      if (this.item.id > 0) {
        data = "แก้ไข";
      }
      return data;
    },
  },

  created() {
    this.getCarType();
    this.getCarBrand();
    this.getCarColor();
    this.getProvince();
    this.getItems();
  },
  methods: {
    async addItem() {
      this.item.id = null;
      this.item.name = null;
      this.item.reg = null;
      this.item.mileage = null;
      this.item.qty = null;
      this.item.active = true;
      this.item.remark = null;
      this.item.img = null;
      this.item.carTypeId = null;
      this.item.carBrandId = null;
      this.item.carModelId = null;
      this.item.carColorId = null;
      this.item.provinceId = null;
      this.item.CarType = [];
      this.item.CarBrand = [];
      this.item.CarModel = [];
      this.item.Province = [];
      this.item.CarColor = [];
      this.item.CarImg = [];

      this.file = null;
      this.files = [];
      this.dialog = true;
    },

    async save() {
      console.log("item", this.item);
      console.log("file", this.file);
      console.log("files", this.files);

      if (this.item.id > 0) {
        this.item = await this.update();
      } else {
        this.item = await this.create();
      }

      if (!this.item) {
        this.alertError();
        return;
      }

      if (this.file) {
        this.item = await this.upload();
      }
      if (this.files) {
        this.item = await this.uploads();
      }

      // this.dialog = false;
      await this.getItems();
      await this.alertSuccess();
      this.file = null;
      this.files = [];
    },
    async upload() {
      let formData = new FormData();
      formData.append("id", Number(this.item.id));
      formData.append("file", this.file);

      let data = await this.$axios
        .post("/api/admin/car/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });
      return data;
    },

    async uploads() {
      let formData = new FormData();
      formData.append("id", Number(this.item.id));
      this.files.forEach((e) => {
        formData.append("files", e);
      });

      let data = await this.$axios
        .post("/api/admin/car/uploads", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });

      return data;
    },

    async create() {
      let data = await this.$axios
        .post("/api/admin/car", {
          data: this.item,
        })
        .then(async (res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });
      return data;
    },

    async update() {
      let data = await this.$axios
        .put("/api/admin/car/" + this.item.id, {
          data: this.item,
        })
        .then(async (res) => {
          return res.data;
        })
        .catch((err) => {
          return null;
        });
      return data;
    },

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
      });
    },
    async alertSuccess() {
      this.$swal.fire({
        position: "top-end",
        type: "success",
        title: "บันทึก เรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async getItems() {
      this.items = await this.$axios
        .get("/api/admin/car")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
    async refresh() {
      this.getItems();
    },
    async editItem(item) {
      console.log("item", item);

      let data = await Object.assign({}, item);
      this.item = await data;
      await this.getCarModel();
      this.dialog = true;
    },

    async getProvinceById() {
      this.itemProvince = await this.$axios
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
