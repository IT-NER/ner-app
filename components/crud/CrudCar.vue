<template>
  <div>
    <v-card flat>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="refresh">
          <v-icon class="mr-2">mdi-refresh</v-icon>
          รีเฟรช
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-title>
        รถ
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="addItem">
          <v-icon class="mr-2">mdi-plus</v-icon>
          เพิ่ม
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
            <v-icon class="mr-2">mdi-pencil</v-icon>
            แก้ไข
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      width="auto"
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
            <form-car :item.sync="item" />
          </v-card-text>
          <v-divider></v-divider>
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
        { text: "ประเภทรถ", value: "CarType.name" },
        { text: "ยี่ห้อรถ", value: "CarBrand.name" },
        { text: "รุ่นรถ", value: "CarModel.name" },
        { text: "ทะเบียน", value: "name" },
        { text: "แก้ไข", value: "edit", align: "center", sortable: false },
      ],
      item: {
        id: null,
        name: null,
        req_name: null,
        reg_txt: null,
        reg_no: null,
        mileage: null,
        active: null,
        remark: null,
        carTypeId: null,
        carBrandId: null,
        carModelId: null,
        provinceId: null,
      },
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
    this.getItems();
  },
  methods: {
    async save() {
      console.log("item", this.item);
      return;

      if (this.item.id > 0) {
        this.update();
        return;
      }
      this.create();
    },
    async create() {
      await this.$axios
        .post("/api/admin/car", {
          data: this.item,
        })
        .then(async (res) => {
          this.dialog = false;
          await this.getItems();
          await this.alertSuccess();
        })
        .catch((err) => {
          this.alertError();
          return;
        });
    },

    async update() {
      await this.$axios
        .put("/api/admin/car/" + this.item.id, {
          data: this.item,
        })
        .then(async (res) => {
          this.dialog = false;
          await this.getItems();
          await this.alertSuccess();
        })
        .catch((err) => {
          this.alertError();
          return;
        });
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
      let data = await Object.assign({}, item);
      this.item = await data;
      this.dialog = true;
    },
    async addItem() {
      this.item.id = null;
      this.item.name = null;
      this.item.req_name = null;
      this.item.reg_txt = null;
      this.item.reg_no = null;
      this.item.mileage = null;
      this.item.active = true;
      this.item.remark = null;
      this.item.carTypeId = null;
      this.item.carBrandId = null;
      this.item.carModelId = null;
      this.item.provinceId = null;

      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
