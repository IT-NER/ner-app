<template>
  <div>
    <v-card flat>
      <v-card-title>
        รุ่นรถ
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
      max-width="500px"
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
            <form-car-model :item.sync="item" />
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
import FormCarModel from "~/components/form/FormCarModel.vue";

export default {
  components: { FormCarModel },
  data() {
    return {
      dialog: false,
      search: null,
      items: [],
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ชื่อยี่ห้อรถ", value: "CarBrand.name" },
        { text: "ชื่อรุ่นรถ", value: "name" },
        { text: "แก้ไข", value: "edit", align: "center", sortable: false },
      ],
      item: {
        id: null,
        name: null,
        carBrandId: 1,
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
      if (this.item.id > 0) {
        this.update();
        return;
      }
      this.create();
    },
    async create() {
      await this.$axios
        .post("/api/admin/car-model", {
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
        .put("/api/admin/car-model/" + this.item.id, {
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
        .get("/api/admin/car-model")
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
      this.item.carBrandId = 1;

      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
