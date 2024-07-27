<template>
  <div>
    <!-- datetime -->

    <v-card flat>
      <v-divider></v-divider>
      <v-toolbar dense flat> กำหนดการประชุม </v-toolbar>
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
                  outlined
                  text
                  color="primary"
                  @click="item.dateStartModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="
                    $refs.dateStartModal.save(item.dateStart),
                      $emit('getItemsRoom'),
                      $emit('setDateEnd')
                  "
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
                  outlined
                  text
                  color="primary"
                  @click="item.timeStartModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="
                    $refs.timeStartModal.save(item.timeStart),
                      $emit('getItemsRoom')
                  "
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
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="item.dateEndModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="
                    $refs.dateEndModal.save(item.dateEnd), $emit('getItemsRoom')
                  "
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
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="item.timeEndModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="
                    $refs.timeEndModal.save(item.timeEnd), $emit('getItemsRoom')
                  "
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
        <v-btn outlined outlined color="primary" @click="$emit('getItemsRoom')">
          ค้นหา
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-title>
        ห้องประชุม <span class="ml-2 red--text">(ติดจอง)</span>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-divider></v-divider>
      <!-- CardBookingRoomDisable -->
      <card-booking-room-disable
        :items.sync="itemsRoomDisable"
        :item.sync="item"
      />
      <v-divider></v-divider>

      <v-divider v-if="itemsRoomEnable.length > 0"></v-divider>

      <v-toolbar dense flat>
        ห้องประชุม
        <span class="ml-2 success--text">(ที่ว่าง)</span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- {{ item.roomId }} -->
      <v-card-text v-if="itemsRoomEnable.length > 0">
        <v-radio-group v-model="item.roomId" row hide-details>
          <v-col cols="12" md="3" v-for="(list, i) in itemsRoomEnable" :key="i">
            <v-radio
              :value="list.id"
              :color="list.color"
              :required="item.roomId == null"
            >
              <template v-slot:label>
                <v-chip label :color="list.color" dark>
                  {{ list.name }}
                  <small class="ml-2 mt-1">
                    (จำนวน {{ list.quantity }} ที่นั่ง)
                  </small>
                </v-chip>
              </template>
            </v-radio>
          </v-col>
        </v-radio-group>
      </v-card-text>
      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          กรุณาระบุกำหนดการประชุมก่อน
        </v-alert>
      </v-card-text>
      <v-divider></v-divider>

      <v-toolbar dense flat> ประเภทการประชุม </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-radio-group v-model="item.meetingTypeId" row hide-details>
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
        <v-toolbar dense flat> รายละเอียดการประชุมออนไลน์ </v-toolbar>
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
      <v-toolbar dense flat> รายละเอียด </v-toolbar>
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
      <v-toolbar dense flat> อุปกรณ์ / อาหาร / เครื่องดื่ม </v-toolbar>
      <v-divider></v-divider>
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
      <v-toolbar dense flat> หมายเหตุ </v-toolbar>
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
import CardBookingRoomDisable from "~/components/card/CardBookingRoomDisable.vue";
export default {
  components: { CardBookingRoomDisable },
  props: [
    "item",
    "items",
    "itemsMeetingType",
    "itemsBookingStatus",
    "itemsDevice",
    "itemsFood",
    "itemsDrink",
    "itemsProgram",
    "itemsRoomEnable",
    "itemsRoomDisable",
    "getItemsRoom",
  ],
};
</script>

<style lang="scss" scoped></style>
