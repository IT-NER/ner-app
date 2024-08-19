<template>
  <div>
    <v-card tile>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="refresh">
          <v-icon class="mr-2"> mdi-refresh </v-icon>
          รีเฟรช
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <!-- CardFilterContent -->
      <card-filter-content :item.sync="filter" @getItems="getItems" />
      <v-divider></v-divider>
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-btn outlined color="success" @click="addItem">
          <v-icon class="mr-2"> mdi-plus </v-icon>
          เพิ่ม
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-toolbar elevation="0">
        <v-text-field
          v-model="search"
          label="ค้นหา"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.title="{ item }">
          {{ item.title }}
          <span class="error--text" v-if="!item.title"> ไม่ได้ระบุ </span>
        </template>

        <template v-slot:item.dateStart="{ item }">
          <span v-if="item.start">
            {{ $moment(item.start).format("LLLL") }} น.
          </span>
          <span v-else> - </span>
        </template>
        <template v-slot:item.dateEnd="{ item }">
          <span v-if="item.end">
            {{ $moment(item.end).format("LLLL") }} น.
          </span>
          <span v-else> - </span>
        </template>
        <template v-slot:item.timed="{ item }">
          <v-chip color="primary" label v-if="item.timed">
            <v-icon class="mr-2">mdi-refresh-auto</v-icon>
            กำหนดช่วงเวลา
          </v-chip>
          <v-chip color="error" label v-else>
            <v-icon class="mr-2">mdi-gesture-double-tap</v-icon>
            ไม่กำหนดช่วงเวลา
          </v-chip>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip label color="gray" dark v-if="item.contentStatusId == 1">
            <v-icon class="mr-2">mdi-file-document-edit</v-icon>
            {{ item.ContentStatus.name }}
          </v-chip>
          <v-chip label color="success" dark v-if="item.contentStatusId == 2">
            <v-icon class="mr-2">mdi-earth</v-icon>
            {{ item.ContentStatus.name }}
          </v-chip>
          <v-chip label color="error" dark v-if="item.contentStatusId == 3">
            <v-icon class="mr-2">mdi-earth-off</v-icon>
            {{ item.ContentStatus.name }}
          </v-chip>
        </template>
        <template v-slot:item.edit="{ item }">
          <v-btn outlined color="warning" @click="editItem(item)">
            <v-icon class="mr-2"> mdi-pencil </v-icon>
            แก้ไข
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CardFilterContent from "~/components/card/CardFilterContent.vue";

export default {
  components: { CardFilterContent },
  data() {
    return {
      filter: {
        start: this.$moment(new Date()).format("YYYY-MM-DD"),
        end: this.$moment(new Date()).add(1, "day").format("YYYY-MM-DD"),
        contentStatusId: [1, 2, 3],
      },
      title: "ข่าวสาร",
      search: null,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "หัวข้อ",
          value: "title",
          align: "start",
          sortable: false,
          width: 300,
        },
        { text: "พอยท์", value: "point", align: "center", sortable: false },
        {
          text: "เริ่ม",
          value: "dateStart",
          align: "start",
          sortable: false,
          width: 200,
        },
        {
          text: "สิ้นสุด",
          value: "dateEnd",
          align: "start",
          sortable: false,
          width: 200,
        },
        {
          text: "การเผยแพร่",
          value: "timed",
          align: "center",
          sortable: false,
        },
        { text: "สถานะ", value: "status", align: "center", sortable: false },
        { text: "แก้ไข", value: "edit", align: "center", sortable: false },
      ],

      items: [],
      item: {
        id: null,
        start: null,
        end: null,
        timed: null,
        publish: null,
        ticket: null,
        code: null,
        title: null,
        description: null,
        detail: null,
        point: 0,
        contentStatusId: null,
        contentTypeId: null,
        userId: null,
        contentCoverImgId: null,
        active: true,
      },
    };
  },

  created() {
    this.main();
  },

  methods: {
    async main() {
      await this.updateContentTimeOut();
      await this.getItems();
    },

    async updateContentTimeOut() {
      await this.$axios
        .get("/api/admin/content/update/timeout")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async refresh() {
      this.filter.start = this.$moment().format("YYYY-MM-DD");
      this.filter.end = this.$moment().add(1, "day").format("YYYY-MM-DD");
      this.filter.contentStatusId = [1, 2, 3];

      await this.getItems();
    },
    async getItems() {
      this.items = await this.$axios
        .post("/api/admin/content/filter/news", {
          data: this.filter,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async addItem() {
      await this.getUser();
      await this.create();
    },

    async create() {
      this.item.start = this.$moment().format("YYYY-MM-DD 00:00");
      this.item.end = this.$moment().add(1, "days").format("YYYY-MM-DD 00:00");

      await this.$axios
        .post("/api/admin/content/create/news", {
          data: this.item,
        })
        .then((res) => {
          console.log("res", res.data);

          this.$router.push("/content/news/" + res.data.id);
        })
        .catch((err) => {
          this.alertError();
        });
    },

    async getUser() {
      let user = await this.$auth.$storage.getCookie("user");
      this.item.userId = await user.id;
    },

    async editItem(item) {
      this.$router.push("/content/news/" + item.id);
    },

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
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
