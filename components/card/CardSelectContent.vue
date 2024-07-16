<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field label="ค้นหา" v-model="search"></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="contents"
      item-key="id"
      :search="search"
      elevation-0
    >
      <template v-slot:item.no="{ item, index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="success" @click="selectedItem(item)"> เลือก </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["content", "contentId", "dialog", "closeDialog"],
  data() {
    return {
      contents: [],
      headers: [
        { text: "ลำดับ", value: "no" },
        { text: "TICKET", value: "ticket" },
        { text: "เนื้อหา", value: "title" },
        { text: "ประเภท", value: "ContentType.name" },
        { text: "ACTIONS", value: "actions", sortable: false },
      ],
      items: [],
      search: "",
      contentSelected: null,
    };
  },

  watch: {
    dialog(val) {
      if (val) {
        this.getContentByStatusId();
      }
    },
  },

  created() {
    this.getContentByStatusId();
  },

  methods: {
    async main() {},

    async selectedItem(item) {
      console.log("item", item);
      let itemContent = Object.assign({}, item);
      this.$emit("update:content", itemContent);
      this.$emit("update:contentId", itemContent.id);
      this.$emit("closeDialog");
    },

    async getContentByStatusId() {
      let items = await this.$axios
        .get("/api/content/status/" + 1)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      if (!items) {
        return;
      }

      this.contents = await items;
    },
  },
};
</script>
