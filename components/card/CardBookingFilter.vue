<template>
  <div>
    <v-card flat>
      <v-card-title>
        ค้นหา
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="$emit('refresh')">
          <v-icon>mdi-refresh</v-icon>
          รีเฟรซ
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <!-- filter.dateStart -->
          <v-col cols="12" md="3">
            <v-dialog
              ref="dateStartModal"
              v-model="filter.dateStartModal"
              :return-value.sync="filter.dateStart"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="วันที่เริ่ม"
                  hide-details
                  v-model="filter.dateStart"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="filter.dateStart" scrollable locale="th">
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="filter.dateStartModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="
                    $refs.dateStartModal.save(filter.dateStart),
                      (filter.dateEnd = filter.dateStart)
                  "
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <!-- filter.timeStart -->
          <v-col cols="12" md="3">
            <v-dialog
              ref="timeStartModal"
              v-model="filter.timeStartModal"
              :return-value.sync="filter.timeStart"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="เวลาเริ่ม"
                  hide-details
                  v-model="filter.timeStart"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="filter.timeStart"
                scrollable
                locale="th"
                format="24hr"
              >
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="filter.timeStartModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="$refs.timeStartModal.save(filter.timeStart)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>

          <!-- filter.dateEnd -->
          <v-col cols="12" md="3">
            <v-dialog
              ref="dateEndModal"
              v-model="filter.dateEndModal"
              :return-value.sync="filter.dateEnd"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="วันที่สิ้นสุด"
                  hide-details
                  v-model="filter.dateEnd"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.dateEnd"
                scrollable
                locale="th"
                :min="filter.dateStart"
              >
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="filter.dateEndModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="$refs.dateEndModal.save(filter.dateEnd)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <!-- filter.timeEnd -->
          <v-col cols="12" md="3">
            <v-dialog
              ref="timeEndModal"
              v-model="filter.timeEndModal"
              :return-value.sync="filter.timeEnd"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="เวลาสิ้นสุด"
                  hide-details
                  v-model="filter.timeEnd"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="filter.timeEnd"
                scrollable
                locale="th"
                format="24hr"
              >
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="filter.timeEndModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  outlined
                  text
                  color="primary"
                  @click="$refs.timeEndModal.save(filter.timeEnd)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="3">
            <v-select
              :items="itemsRoom"
              item-text="name"
              item-value="id"
              v-model="filter.roomId"
              label="ห้องประชุม"
              hide-details
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              :items="itemsMeetingType"
              item-text="name"
              item-value="id"
              v-model="filter.meetingTypeId"
              label="ประเภท"
              hide-details
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              :items="itemsStatus"
              item-text="name"
              item-value="id"
              v-model="filter.statusId"
              label="สถานะ"
              hide-details
              clearable
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="$emit('getItems')">
          <v-icon>mdi-magnify</v-icon>
          ค้นหา
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["filter", "itemsRoom", "itemsMeetingType", "itemsStatus"],
};
</script>

<style lang="scss" scoped></style>
