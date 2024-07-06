<template>
  <div>
    <v-card>
      <v-card-title elevation="0">
        {{ title }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title elevation="0">
        <v-text-field v-model="search" label="ค้นหา"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="addItem"> เพิ่ม </v-btn>
        <v-btn color="primary" @click="getContentByContentTypeId">
          รีเฟรช
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="contents"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.public="{ item }">
          <v-btn color="success" @click="addPublicItem(item)">
            <v-icon class="mr-2">mdi-bell-plus</v-icon>
            ประชาสัมพันธ์
          </v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="warning" @click="editItem(item)"> แก้ไข </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title> PUBLIC BANNER </v-card-title>
      <v-divider></v-divider>
      <!-- TablePublicLists -->
      <table-public-lists
        :publics.sync="publics"
        :dialog.sync="dialog"
        :itemPublic.sync="itemPublic"
      />
    </v-card>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      max-width="800px"
      transition="slide-y-reverse-transition"
    >
      <form @submit.prevent="save">
        <v-card>
          <v-card-title>
            PUBLIC
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <form-public :item.sync="itemPublic" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit"> บันทึก </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import FormPublic from "~/components/form/FormPublic.vue";
import TablePublicLists from "~/components/table/TablePublicLists.vue";
export default {
  components: { TablePublicLists, FormPublic },
  layout: "defaultLayout",
  data() {
    return {
      title: "BANNER",
      search: null,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "TICKET", value: "ticket" },
        { text: "CODE", value: "code" },
        { text: "TITLE", value: "title" },
        { text: "DESCRIPTION", value: "description" },
        { text: "POINT", value: "point" },
        { text: "STATUS", value: "ContentStatus.name" },
        { text: "PUBLIC", value: "public", align: "center", sortable: false },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],
      contents: [],
      content: {
        id: null,
        ticket: null,
        code: null,
        title: null,
        description: null,
        detail: null,
        point: null,
        userId: null,
        contentTypeId: 1,
        contentStatusId: 1,
        active: true,
      },

      publics: [],
      itemPublic: {
        id: null,
        start: null,
        end: null,
        timed: true,
        name: null,
        active: true,
        publish: true,
        Content: [],
        contentId: null,
      },

      dialog: false,
    };
  },

  created() {
    this.getUser();
    this.getContentByContentTypeId();
    this.getPublicByContentTypeId();
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.getContentByContentTypeId();
      }
    },
  },

  methods: {
    async save() {
      console.log("itemPublic", this.itemPublic);

      let itemPublic = null;
      if (this.itemPublic.id == null) {
        itemPublic = await this.createPublic();
      } else {
        itemPublic = await this.updatePublic();
      }
      console.log("itemPublic", itemPublic);

      if (!itemPublic) {
        this.alertError();
        return;
      }

      await this.updateContentStatus(2);
      await this.getContentByContentTypeId();
      await this.getPublicByContentTypeId();
      await this.alertSuccess();
      this.dialog = false;
    },

    async updateContentStatus() {
      this.content.contentStatusId = 2;

      let content = await this.$axios
        .put("/api/content/" + this.content.id, {
          data: this.content,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      return content;
    },

    async createPublic() {
      let itemPublic = await this.$axios
        .post("/api/public", {
          data: this.itemPublic,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });

      return itemPublic;
    },

    async updatePublic() {
      let itemPublic = await this.$axios
        .put("/api/public/" + this.itemPublic.id, {
          data: this.itemPublic,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });

      return itemPublic;
    },

    async updateContentStatusById(item) {
      let content = await this.$axios
        .put("/api/content/content-status/" + this.content.id, {
          data: this.content,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });

      return itemPublic;
    },

    async getPublicByContentTypeId() {
      this.publics = await this.$axios
        .get("/api/public/content-type/" + this.content.contentTypeId)
        .then((res) => {
          console.log("publics", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });
    },

    async addPublicItem(item) {
      this.itemPublic.start = null;
      this.itemPublic.end = null;
      this.itemPublic.timed = true;
      this.itemPublic.name = null;
      this.itemPublic.active = true;
      this.itemPublic.publish = true;
      this.itemPublic.Content = [];
      this.itemPublic.contentId = item.id;

      this.content = await Object.assign({}, item);
      this.dialog = true;
    },

    async getContentByContentTypeId() {
      this.contents = await this.$axios
        .get("/api/content/content-type/" + this.content.contentTypeId)
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async addItem() {
      let banner = await this.create();
      if (!banner) {
        this.alertError();
        return;
      }
      this.$router.push("/public/banner/" + banner.ticket);
    },

    async create() {
      let banner = await this.$axios
        .post("/api/content", {
          data: this.content,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return banner;
    },

    async getUser() {
      let user = this.$auth.$storage.getCookie("user");
      this.content.userId = user.id;
    },

    async editItem(item) {
      this.$router.push("/public/banner/" + item.ticket);
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
  },
};
</script>
