<template>
  <div>
    <!-- datetime -->

    <v-card flat>
      <v-card-title> กำหนดการประชุม </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <!-- item.dateStart -->
          <v-col cols="12" md="3" v-if="item.timed">
            <v-dialog
              ref="dateStartModal"
              v-model="item.dateStartModal"
              :return-value.sync="item.dateStart"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="วันที่เริ่ม"
                  hide-details
                  v-model="item.dateStart"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="item.dateStart" scrollable locale="th">
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="item.dateStartModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dateStartModal.save(item.dateStart)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <!-- item.timeStart -->
          <v-col cols="12" md="3" v-if="item.timed">
            <v-dialog
              ref="timeStartModal"
              v-model="item.timeStartModal"
              :return-value.sync="item.timeStart"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="เวลาเริ่ม"
                  hide-details
                  v-model="item.timeStart"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="item.timeStart"
                scrollable
                locale="th"
                format="24hr"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="item.timeStartModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.timeStartModal.save(item.timeStart)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>

          <!-- item.dateEnd -->
          <v-col cols="12" md="3" v-if="item.timed">
            <v-dialog
              ref="dateEndModal"
              v-model="item.dateEndModal"
              :return-value.sync="item.dateEnd"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="วันที่สิ้นสุด"
                  hide-details
                  v-model="item.dateEnd"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="item.dateEnd"
                scrollable
                locale="th"
                :min="item.dateStart"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="item.dateEndModal = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dateEndModal.save(item.dateEnd)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <!-- item.timeEnd -->
          <v-col cols="12" md="3" v-if="item.timed">
            <v-dialog
              ref="timeEndModal"
              v-model="item.timeEndModal"
              :return-value.sync="item.timeEnd"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="เวลาสิ้นสุด"
                  hide-details
                  v-model="item.timeEnd"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="item.timeEnd"
                scrollable
                locale="th"
                format="24hr"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="item.timeEndModal = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.timeEndModal.save(item.timeEnd)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="$emit('getItemsRoom')">
          ค้นหาห้องประชุม
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-title v-if="itemsRoomNotReserved.length > 0">
        ห้องประชุม <span class="ml-2 red--text">(ติดจอง)</span>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-divider v-if="itemsRoomNotReserved.length > 0"></v-divider>
      <!-- CardBookingRoomNotReserved -->
      <card-booking-room-not-reserved
        v-if="itemsRoomNotReserved.length > 0"
        :items.sync="itemsRoomNotReserved"
      />
      <v-divider v-if="itemsRoomNotReserved.length > 0"></v-divider>

      <v-divider v-if="itemsRoom.length > 0"></v-divider>

      <v-card-title>
        ห้องประชุม
        <span class="ml-2 success--text">(ที่ว่าง)</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="itemsRoom.length > 0">
        <v-radio-group v-model="item.roomId" row>
          <v-col cols="12" md="3" v-for="(item, i) in itemsRoom" :key="i">
            <v-radio
              :label="`${item.name}  (${item.quantity} ที่นั่ง)`"
              :value="item.id"
              :color="item.color"
            ></v-radio>
          </v-col>
        </v-radio-group>
      </v-card-text>
      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          กรุณาระบุกำหนดการประชุมก่อน
        </v-alert>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-title> ประเภทการประชุม </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-radio-group v-model="item.meetingTypeId" row>
          <v-col
            cols="12"
            md="3"
            v-for="(item, i) in itemsMeetingType"
            :key="i"
          >
            <v-radio
              :label="item.name"
              :value="item.id"
              @change="$emit('setItemMeetingType')"
            ></v-radio>
          </v-col>
        </v-radio-group>
      </v-card-text>
      <v-divider></v-divider>
      <div v-if="item.meetingTypeId == 2">
        <v-card-title> รายละเอียดการประชุมออนไลน์ </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                :items="itemsProgram"
                item-text="name"
                item-value="id"
                v-model="item.programId"
                label="โปรแกรม"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="ID"
                v-model="item.meetingId"
                hide-details
                :required="item.meetingTypeId == 2"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="PASSWORD"
                v-model="item.meetingPassword"
                hide-details
                :required="item.meetingTypeId == 2"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="URL"
                v-model="item.url"
                hide-details
                :required="item.meetingTypeId == 2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
      <v-divider></v-divider>
      <v-card-title> รายละเอียด </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="หัวข้อ"
              prepend-icon="mdi-star"
              v-model="item.name"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="ประธาน"
              prepend-icon="mdi-account-star"
              v-model="item.chairman"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              label="จำนวนผู้เข้าร่วม"
              prepend-icon="mdi-account-group"
              v-model="item.quantity"
              hide-details
              required
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="เบอร์โทรสำหรับ HR ติดต่อกลับ"
              prepend-icon="mdi-phone"
              v-model="item.tel"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title> อุปกรณ์ / อาหาร / เครื่องดื่ม </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              label="อุปกรณ์"
              prepend-icon="mdi-devices"
              v-model="item.bookingDevice"
              :items="itemsDevice"
              item-text="name"
              item-value="id"
              hide-details
              chips
              multiple
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              label="อาหาร"
              prepend-icon="mdi-silverware-clean"
              v-model="item.bookingFood"
              :items="itemsFood"
              item-text="name"
              item-value="id"
              hide-details
              chips
              multiple
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              label="เครื่องดื่ม"
              prepend-icon="mdi-coffee-outline"
              v-model="item.bookingDrink"
              :items="itemsDrink"
              item-text="name"
              item-value="id"
              hide-details
              chips
              multiple
              clearable
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title> หมายเหตุ </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <v-textarea
              prepend-icon="mdi-note"
              v-model="item.description"
              hide-details
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardBookingRoomNotReserved from "~/components/card/CardBookingRoomNotReserved.vue";
export default {
  components: { CardBookingRoomNotReserved },
  props: [
    "item",
    "itemsRoom",
    "itemsMeetingType",
    "itemsBookingStatus",
    "itemsDevice",
    "itemsFood",
    "itemsDrink",
    "itemsProgram",
    "getItemsRoom",
    "itemsRoomNotReserved",
    "setItemMeetingType",
  ],
};
</script>

<style lang="scss" scoped></style>
