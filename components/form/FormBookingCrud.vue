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
      <v-card-title>
        ห้องประชุม
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="itemsRoom.length > 0">
        <v-row>
          <v-col
            cols="12"
            md="3"
            sm="12"
            v-for="(item, i) in itemsRoom"
            :key="i"
          >
            <v-checkbox
              v-model="item.roomId"
              :label="item.name + `  (${item.quantity}  ที่นั่ง)`"
              :color="item.color"
              :value="item.id"
              hide-details
              dense
              :disabled="!item.start"
              :required="!item.roomId"
              @change="item.color = item.color"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          กรุณา ==> ระบุกำหนดการประชุมก่อน
        </v-alert>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [
    "item",
    "itemsRoom",
    "itemsMeetingType",
    "itemsBookingStatus",
    "itemsDevice",
    "itemsFood",
    "itemsDrink",
    "getItemsRoom",
  ],
};
</script>

<style lang="scss" scoped></style>
