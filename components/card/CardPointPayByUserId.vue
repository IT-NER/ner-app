<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="elevation-0"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.date="{ item }">
        {{ $moment(item.createdAt).format("lll") }} น.
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip label :color="getColorStatus(item.pointPayStatusId)">
          {{ item.PointPayStatus.name }}
        </v-chip>
      </template>
      <template v-slot:item.approveDate="{ item }">
        <span v-if="item.approveDate">
          {{ $moment(item.approveDate).format("lll") }} น.
        </span>
      </template>
      <template v-slot:item.cancel="{ item }">
        <v-btn
          :disabled="item.pointPayStatusId > 1"
          color="error"
          outlined
          @click="$emit('cancel', item)"
        >
          <v-icon>mdi-cancel</v-icon>
          ยกเลิก
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "no",
        },
        {
          text: "วันที่ขอแลก",
          align: "start",
          sortable: false,
          value: "date",
        },
        {
          text: "สถานะ",
          align: "center",
          sortable: false,
          value: "status",
        },
        {
          text: "วันที่ อนุมัติ/ไม่อนุมัติ/ยกเลิก",
          align: "start",
          sortable: false,
          value: "approveDate",
        },
        {
          text: "ยกเลิก",
          align: "center",
          sortable: false,
          value: "cancel",
        },
      ],
      sortBy: "id",
      sortDesc: true,
    };
  },

  methods: {
    getColorStatus(id) {
      let data = "warning";
      if (id == 2) {
        data = "success";
      } else if (id == 3) {
        data = "error";
      }
      if (id == 4) {
        data = "gray";
      }
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
