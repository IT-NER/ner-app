<template>
  <div>
    <v-card flat>
      <v-card-title> Link </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="addItem">
          <v-icon>mdi-plus</v-icon>
          เพิ่ม
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-data-table :headers="headers" :items="items">
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.link="{ item }">
          <a :href="item.url" target="blank">
            {{ item.url }}
          </a>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip color="success" label v-if="item.active"> เปิด </v-chip>
          <v-chip color="error" label v-else> ปิด </v-chip>
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
            <form-button-link :item="item" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" outlined type="submit"> บันทึก </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import FormButtonLink from "~/components/form/FormButtonLink.vue";
export default {
  components: { FormButtonLink },
  data() {
    return {
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "ชื่อปุ่ม",
          value: "name",
          align: "start",
          sortable: false,
        },
        {
          text: "ลิ้งค์",
          value: "link",
          align: "start",
          sortable: false,
        },
        {
          text: "สถานะการใช้งาน",
          value: "status",
          align: "center",
          sortable: false,
        },
        {
          text: "หมายเหตุ",
          value: "remark",
          align: "start",
          sortable: false,
        },
        { text: "แก้ไข", value: "edit", align: "center", sortable: false },
      ],
      items: [],
      dialog: false,
      item: {
        id: 0,
        name: null,
        url: null,
        remark: null,
        active: true,
        User: [],
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
    async editItem(item) {
      let date = await Object.assign({}, item);
      this.item = await date;

      // console.log("item", this.item);
      this.dialog = true;
    },
    async save() {
      // console.log("item", this.item);
      if (this.item.id > 0) {
        this.update();
        return;
      }
      this.create();
    },

    async create() {
      await this.$axios
        .post("/api/admin/button-link", {
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
        .put("/api/admin/button-link/" + this.item.id, {
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
    async addItem() {
      this.item.id = 0;
      this.item.name = null;
      this.item.url = null;
      this.item.remark = null;
      this.item.active = true;
      // console.log("item", this.item);
      this.dialog = true;
    },
    async getItems() {
      this.items = await this.$axios
        .get("/api/admin/button-link")
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
