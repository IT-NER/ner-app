<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          label="ค้นหา"
          v-model="search"
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :items-per-page="-1"
        :headers="headers"
        :items="items"
        :search="search"
        class="elevation-0"
        v-model="selected"
        hide-default-footer
        show-select
        fixed-header
        height="400"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
      </v-data-table>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="save"> บันทึก </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["search", "selected"],
  data() {
    return {
      items: [],
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
      //   selected: [],
      //   search: null,
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      this.items = await this.$axios
        .get("/api/user")
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
