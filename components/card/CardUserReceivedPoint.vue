<template>
  <div>
    <v-divider></v-divider>
    <v-card>
      <v-card-title>
        รายชื่อผู้ได้รับพอยท์

        <span class="ml-3 error--text">
          <!-- <v-icon> mdi-star </v-icon> -->
          ( {{ item.point }} พอยท์ )
        </span>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" @click="addItem">
          <v-icon class="mr-2">mdi-plus</v-icon>
          เพิ่มรายชื่อ
        </v-btn>
        <v-btn
          outlined
          color="error"
          @click="deleteItem()"
          :disabled="!selected.length"
        >
          <v-icon class="mr-2"> mdi-delete </v-icon>
          ลบ
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title>
        <v-text-field label="ค้นหา" v-model="search"></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="item.PointReceived"
          :search="search"
          item-key="id"
          show-select
          class="elevation-0"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
        >
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.date="{ item }">
            {{ $moment(item.createdAt).format("LLLL") }} น.
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      scrollable
      width="1000"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          รายชื่อพนักงาน
          <!-- <small class="ml-2 error--text"> ( ยังไม่ได้รับพอยท์ ) </small> -->
          <v-spacer></v-spacer>
          <v-icon @click="dialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <table-user-not-point-received
            :item.sync="item"
            :selectedUser.sync="selectedUser"
            :dialog.sync="dialog"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="success">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            บันทึก
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TableUserNotPointReceived from "../table/TableUserNotPointReceived.vue";
export default {
  components: { TableUserNotPointReceived },
  props: ["item"],

  data() {
    return {
      sortBy: "id",
      sortDesc: true,

      search: null,
      selected: [],
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "วันที่รับพอยท์",
          value: "date",
          align: "start",
        },
        {
          text: "ชื่อ",
          value: "User.fname",
          align: "start",
        },
        {
          text: "นามสกุล",
          value: "User.lname",
          align: "start",
        },
        {
          text: "ฝ่าย",
          value: "User.Department.name",
          align: "start",
        },
      ],

      dialog: false,
      selectedUser: [],
    };
  },

  methods: {
    async addItem() {
      this.dialog = true;
    },

    deleteItem(item) {
      console.log("item", item);
    },
  },
};
</script>

<style lang="scss" scoped></style>
