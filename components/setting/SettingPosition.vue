<template>
  <div>
    <v-dialog v-model="dialog" persistent over-flow="auto" max-width="500">
      <form @submit.prevent="save">
        <v-card>
          <v-toolbar elevation="0" :color="formColor" dark dense>
            <span>
              <v-icon x-large>{{ iconTitle }}</v-icon>
            </span>
            <span class="mr-3">{{ formTitle }}</span>
            <!-- <span>{{ title }}</span> -->
            <v-spacer></v-spacer>
            <v-icon @click="closeDailog">mdi-close</v-icon>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    autofocus
                    prepend-icon="mdi-cog"
                    label="ตำแหน่ง"
                    ref="position"
                    type="text"
                    outlined
                    dense
                    hide-details
                    required
                    v-model="editedItem.name"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined :color="formColor" type="submit">
              <v-icon>mdi-content-save</v-icon>
              <span> บันทึก </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-btn
            outlined
            color="success"
            dark
            @click="addItem"
            class="float-right"
          >
            <v-icon>mdi-database-plus</v-icon>
            <span>เพิ่ม</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="positions"
                :search="search"
                :sort-by="['id']"
                sort-desc
                elevation-0
              >
                <template v-slot:item.index="{ item, index }">
                  {{ index + 1 }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn outlined color="warning" small @click="editItem(item)">
                    <v-icon class="mr-auto"> mdi-database-edit </v-icon>
                    <small>แก้ไข</small>
                  </v-btn>
                  <v-btn
                    outlined
                    color="error"
                    small
                    @click="deletePosition(item)"
                  >
                    <v-icon class="mr-auto"> mdi-database-minus </v-icon>
                    <small>ลบ</small>
                  </v-btn>

                  <!-- <v-icon color="warning" class="mx-3" @click="editItem(item)">
                    mdi-database-edit
                  </v-icon>

                  <v-icon
                    color="error"
                    class="mx-3"
                    @click="deletePosition(item)"
                  >
                    mdi-database-remove
                  </v-icon> -->
                </template>
                <template v-slot:no-data>
                  <v-btn outlined color="primary" @click="getPosition">
                    Reset
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
    Overlay: false,
    title: "ตำแหน่ง",
    dialog: false,
    headers: [
      { text: "ลำดับ", value: "index", align: "center" },
      { text: "ชื่อตำแหน่ง", value: "name" },
      {
        text: "ACTIONS",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    positions: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      name: null,
    },
    defaultItem: {
      id: null,
      name: null,
    },
  }),

  computed: {
    formColor() {
      return this.editedIndex === -1 ? "success" : "warning";
    },
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่ม" : "แก้ไข";
    },
    iconTitle() {
      return this.editedIndex === -1
        ? "mdi-database-plus"
        : "mdi-database-edit";
    },
  },

  watch: {
    dialog(val) {
      val || this.closeDailog();
    },
  },

  created() {
    this.getPosition();
  },

  methods: {
    async getPosition() {
      this.positions = await this.$axios
        .get("/api/position")
        .then((res) => {
          // // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // // console.log("err", err);
        });
    },

    async addItem() {
      this.$nextTick(() => {
        this.openDialog();
      });
    },

    async editItem(item) {
      this.editedIndex = this.positions.indexOf(item);
      this.editedItem = await Object.assign({}, item);
      this.openDialog();
    },

    async deletePosition(item) {
      this.editedIndex = this.positions.indexOf(item);
      this.editedItem = Object.assign({}, item);

      let delateConfirm = await this.deleteConfirm();

      if (delateConfirm) {
        let position = await this.$axios.delete(
          "/api/position/" + this.editedItem.id
        );

        if (position) {
          this.setItemDefault();
          this.alertSuccess();
          this.getPosition();
        } else {
          this.alertError();
        }
      } else {
        this.setItemDefault();
      }
    },

    deleteConfirm() {
      let deleteConfirm = this.$swal
        .fire({
          title: "ลบข้อมูล ?",
          text: "กดปุ่ม 'ยืนยัน' เพื่อลบข้อมูล",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        })
        .then(async (res) => {
          return res.value;
        });

      return deleteConfirm;
    },

    async openDialog() {
      this.dialog = true;
    },

    async closeDailog() {
      this.setItemDefault();
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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

    async opensOverlay() {
      this.overlay = true;
    },
    async closeOverlay() {
      this.overlay = false;
    },

    async save(e) {
      let saveConfirm = await this.saveConfirm();
      let position = false;

      if (saveConfirm) {
        this.opensOverlay();

        if (this.editedIndex > -1) {
          position = await this.updatePosition();
        } else {
          position = await this.createPosition();
        }

        if (position) {
          await this.closeOverlay();
          await this.closeDailog();
          await this.getPosition();
          await this.alertSuccess();
        }
      }
    },

    async setItemDefault() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },

    async createPosition() {
      let createPosition = await this.$axios
        .post("/api/position", {
          data: this.editedItem,
        })
        .then((res) => {
          // // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // // console.log("err", err);
          return false;
        });

      return createPosition;
    },

    async updatePosition() {
      let updatePosition = await this.$axios
        .put("/api/position/" + this.editedItem.id, {
          data: this.editedItem,
        })
        .then((res) => {
          // // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // // console.log("err", err);
          return false;
        });

      return updatePosition;
    },

    async saveConfirm() {
      let saveConfirm = this.$swal
        .fire({
          title: "บันทึก?",
          text: "กดปุ่ม 'ยืนยัน' เพื่อบันทึก",
          type: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        })
        .then(async (res) => {
          return res.value;
        });

      return saveConfirm;
    },
  },
};
</script>

<style lang="scss" scoped></style>
