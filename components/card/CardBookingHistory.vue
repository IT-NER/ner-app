<template>
  <div>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-title> ประวัติการจอง </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="items">
        <v-data-table :headers="headers" :items="items" class="elevation-0">
          <template v-slot:item.no="{ item, index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.name="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:item.author="{ item }">
            {{ item.User.fname }} {{ item.User.lname }}
          </template>
          <template v-slot:item.room="{ item }">
            <v-chip label :color="item.Room.color" dark>
              {{ item.Room.name }}
            </v-chip>
          </template>
          <template v-slot:item.start="{ item }">
            <span>
              {{ $moment(item.start).add(543, "year").format("LLLL") }} น.</span
            >
          </template>
          <template v-slot:item.end="{ item }">
            <span>
              {{ $moment(item.end).add(543, "year").format("LLLL") }} น.</span
            >
          </template>
          <template v-slot:item.type="{ item }">
            <v-chip label color="success" dark v-if="item.meetingTypeId > 1">
              {{ item.MeetingType.name }}
            </v-chip>
            <v-chip label color="error" dark v-else>
              {{ item.MeetingType.name }}
            </v-chip>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip label color="warning" dark v-if="item.statusId == 1">
              {{ item.Status.name }}
            </v-chip>
            <v-chip label color="success" dark v-if="item.statusId == 2">
              {{ item.Status.name }}
            </v-chip>
            <v-chip label color="error" dark v-if="item.statusId == 3">
              {{ item.Status.name }}
            </v-chip>
          </template>
          <template v-slot:item.edit="{ item }">
            <v-btn
              :disabled="item.statusId > 1"
              outlined
              color="warning"
              @click="$emit('editItem', item)"
            >
              แก้ไข
            </v-btn>
          </template>
          <template v-slot:item.cancel="{ item }">
            <v-btn
              :disabled="item.statusId > 1"
              outlined
              color="error"
              @click="$emit('cancelItem', item)"
            >
              ยกเลิก
            </v-btn>
          </template>
          <template v-slot:item.view="{ item }">
            <v-btn outlined color="primary" @click="$emit('viewItem', item)">
              รายละเอียด
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          ไม่มีรายการจอง
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["items", "item", "headers"],
};
</script>

<style lang="scss" scoped></style>
