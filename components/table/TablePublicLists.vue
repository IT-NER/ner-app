<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="content"
      :search="search"
      class="elevation-0"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.start="{ item }">
        <span v-if="item.timed">
          {{ $moment(item.start).format("LL") }}
        </span>
      </template>
      <template v-slot:item.end="{ item }">
        <span v-if="item.timed">
          {{ $moment(item.end).format("LL") }}
        </span>
      </template>
      <template v-slot:item.timed="{ item }">
        <span v-if="item.timed"> อัตโนมัติ </span>
        <span v-else> กำหนดเอง </span>
      </template>
      <template v-slot:item.content="{ item }">
        <span v-if="item.content"> อยู่ระหว่างประชาสัมพันธ์ </span>
        <span v-else> ปิด </span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn outlined color="warning" @click="editItem(item)"> แก้ไข </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["content", "dialog", "itemContent"],

  data() {
    return {
      search: null,
      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "หัวข้อ / เรื่อง", value: "Content.title" },
        { text: "เริ่ม", value: "start" },
        { text: "สิ้นสุด", value: "end" },
        { text: "กำหนดเวลา (ประชาสัมพันธ์)", value: "timed" },
        { text: "พอยท์", value: "Content.point" },
        {
          text: "เปิด (สาธารณะ)",
          value: "content",
          align: "center",
          sortable: false,
        },
        { text: "ACIONS", value: "actions", align: "center", sortable: false },
      ],
    };
  },

  methods: {
    async editItem(item) {
      let itemContent = await Object.assign({}, item);
      itemContent.start = this.$moment(item.start).format("YYYY-MM-DD");
      itemContent.end = this.$moment(item.end).format("YYYY-MM-DD");

      this.$emit("update:itemContent", itemContent);
      this.$emit("update:dialog", true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
