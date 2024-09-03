<template>
  <div>
    <v-card>
      <v-card-title>
        เครื่องดื่ม
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="ค้นหา"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn outlined color="success" @click="addItem">
          <v-icon>mdi-plus</v-icon>
          เพิ่ม
        </v-btn>

        <v-btn outlined color="primary" @click="getDrink">
          <v-icon>mdi-refresh</v-icon>
          รีเฟรช
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-0"
        :search="search"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn outlined color="warning" @click="editItem(item)">
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
      transition="slide-y-reverse-transition"
      width="500"
    >
      <form @submit.prevent="save">
        <v-card>
          <v-card-title>
            {{ title }}
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="dialog = false">
                  mdi-close
                </v-icon>
              </template>
              <div class="title">ปิด</div>
            </v-tooltip>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <form-drink :drink.sync="drink" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="success" type="submit">
              <v-icon>mdi-content-save</v-icon>
              บันทึก
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import FormDrink from "~/components/form/FormDrink.vue";

export default {
  components: { FormDrink },

  data() {
    return {
      search: null,
      dialog: false,
      overlay: false,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "เครื่องดื่ม", value: "name" },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],
      items: [],
      drink: {
        id: null,
        name: null,
      },
    };
  },

  created() {
    this.getDrink();
  },

  computed: {
    title() {
      let data = "เพิ่ม";
      if (this.drink.id > 0) {
        data = "แก้ไข";
      }
      return data;
    },
  },

  methods: {
    async save() {
      this.dialog = false;
      this.overlay = true;

      let success = false;

      if (this.drink.id > 0) {
        success = await this.update();
      } else {
        success = await this.create();
      }

      if (success) {
        this.overlay = false;
        this.alertSuccess();
      } else {
        this.alertError();
      }

      await this.getDrink();
      await this.setItemDefault();
    },

    async setItemDefault() {
      this.drink.id = null;
      this.drink.name = null;
    },

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
        timer: 1500,
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

    async create() {
      let createDrink = await this.$axios
        .post("/api/drink", {
          data: this.drink,
        })
        .then((res) => {
          // // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // // console.log("err", err);
          return false;
        });

      return createDrink;
    },

    async update() {
      let updateDrink = await this.$axios
        .put("/api/drink/" + this.drink.id, {
          data: this.drink,
        })
        .then((res) => {
          // // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // // console.log("err", err);
          return false;
        });

      return updateDrink;
    },

    async addItem() {
      await this.setItemDefault();
      this.dialog = true;
    },

    async editItem(item) {
      this.drink = await Object.assign({}, item);
      this.dialog = true;
    },

    async getDrink() {
      this.items = await this.$axios
        .get("/api/drink")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
  },
};
</script>
