<template>
  <div>
    <v-card flat style="margin-bottom: 75px">
      <v-card-title>
        รายการจองห้องประชุม
        <v-spacer></v-spacer>
        <v-btn outlined color="success" @click="$emit('addItem')">
          จองห้องประชุม
        </v-btn>
      </v-card-title>
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
            <span> {{ $moment(item.start).format("LLLL") }} น.</span>
          </template>
          <template v-slot:item.end="{ item }">
            <span> {{ $moment(item.end).format("LLLL") }} น.</span>
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
            <v-chip label dark color="warning" v-if="item.statusId == 1">
              รออนุมัติ
            </v-chip>
            <v-chip label dark color="success" v-if="item.statusId == 2">
              อนุมัติ
            </v-chip>
            <v-chip label dark color="error" v-if="item.statusId == 3">
              ยกเลิก
            </v-chip>
          </template>
          <template v-slot:item.edit="{ item }">
            <v-btn
              outlined
              color="warning"
              @click="$emit('editItem', item)"
              :disabled="item.statusId > 2"
            >
              แก้ไข
            </v-btn>
          </template>
          <template v-slot:item.view="{ item }">
            <v-btn outlined color="primary" @click="$emit('viewItem', item)">
              รายละเอียด
            </v-btn>
          </template>
          <template v-slot:item.cancel="{ item }">
            <v-btn
              outlined
              color="error"
              :disabled="item.statusId > 2"
              @click="$emit('cancelItem', item)"
            >
              ไม่อนุมัติ
            </v-btn>
          </template>
          <template v-slot:item.approve="{ item }">
            <v-btn
              outlined
              color="success"
              :disabled="item.statusId > 1"
              @click="$emit('approveItem', item)"
            >
              อนุมัติ
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
  props: ["items", "item", "headers", "search"],
};
</script>

<style lang="scss" scoped></style>
