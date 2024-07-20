<template>
  <div>
    <v-card>
      <v-card-title elevation="0">
        <div class="display-1">
          {{ title }}
        </div>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="ค้นหา"></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" v-bind="attrs" v-on="on" @click="addItem">
              เพิ่ม
            </v-btn>
          </template>
          <div class="title">เพิ่ม</div>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="primary" @click="getRoom">
              รีเฟรช
            </v-btn>
          </template>
          <div class="title">รีเฟรช</div>
        </v-tooltip>
      </v-toolbar>
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
        <template v-slot:item.color="{ item }">
          <v-chip label :color="item.color" dark>
            <v-icon> mdi-map-marker </v-icon>
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="warning"
                @click="editItem(item)"
              >
                แก้ไข
              </v-btn>
            </template>
            <span class="title"> แก้ไข </span>
          </v-tooltip>
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
          <v-card-title elevation="0">
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
            <!-- FormRoom -->
            <form-room :room.sync="room" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" type="submit" v-bind="attrs" v-on="on">
                  บันทึก
                </v-btn>
              </template>
              <div class="title">บันทึก</div>
            </v-tooltip>
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
import FormRoom from "~/components/form/FormRoom.vue";

export default {
  components: { FormRoom },

  data() {
    return {
      title: "ห้องประชุม",
      search: null,
      dialog: false,
      overlay: false,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ห้องประชุม", value: "name" },
        { text: "จำนวนที่นั่ง", value: "quantity" },
        { text: "สีห้องประชุม", value: "color", align: "center" },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],
      items: [],
      room: {
        id: null,
        name: null,
        color: null,
        quantity: null,
      },
    };
  },

  created() {
    this.getRoom();
  },

  methods: {
    async save() {
      // console.log("room", this.room);
      // return;
      // let color = await this.room.color.hexa;
      // this.room.color = await color;

      this.dialog = false;
      this.overlay = true;

      let success = false;

      if (this.room.id > 0) {
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

      await this.getRoom();
      await this.setItemDefault();
    },

    async setItemDefault() {
      this.room.id = null;
      this.room.quantity = null;
      this.room.name = null;
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
      let createRoom = await this.$axios
        .post("/api/room", {
          data: this.room,
        })
        .then((res) => {
          // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // console.log("err", err);
          return false;
        });

      return createRoom;
    },

    async update() {
      let updateRoom = await this.$axios
        .put("/api/room/" + this.room.id, {
          data: this.room,
        })
        .then((res) => {
          // console.log("res", res.data);
          return true;
        })
        .catch((err) => {
          // console.log("err", err);
          return false;
        });

      return updateRoom;
    },

    async addItem() {
      this.dialog = true;
      await this.setItemDefault();
    },

    async editItem(item) {
      this.room = await Object.assign({}, item);
      this.dialog = true;
    },

    async getRoom() {
      this.items = await this.$axios
        .get("/api/room")
        .then((res) => {
          // console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>
