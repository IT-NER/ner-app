<template>
  <div>
    <v-card>
      <v-divider></v-divider>
      <v-card-title elevation="0">
        <v-text-field label="ค้นหา" v-model="search"></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        :search="search"
        item-key="id"
        show-select
        fixed-header
        height="500"
        :items-per-page="-1"
        hide-default-footer
        elevation-0
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["item", "selectedUser", "dialog"],
  data() {
    return {
      selected: [],
      search: null,
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        {
          text: "ชื่อ",
          value: "fname",
          align: "start",
          sortable: false,
        },
        {
          text: "นามสกุล",
          value: "lname",
          align: "start",
          sortable: false,
        },
        {
          text: "ฝ่าย",
          value: "Department.name",
          align: "start",
          sortable: false,
        },
      ],
      items: [],
    };
  },

  watch: {
    dialog(val) {
      if (val) {
        this.getItems();
      }
    },
  },
  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      this.items = await this.$axios
        .get("/api/admin/user/notPointReceived/" + this.item.id)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
