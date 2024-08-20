<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-switch
            label="กำหนดเวลาเผยแพร่"
            prepend-icon="mdi-timer-sand"
            hide-details
            v-model="item.timed"
            inset
            @click="$emit('updateTimed')"
          >
            <template v-slot:label>
              <span v-if="item.timed"> การเผยแพร่ กำหนดช่วงเวลา </span>
              <span v-else> การเผยแพร่ (ไม่กำหนดช่วงเวลา) </span>
            </template>
          </v-switch>
        </v-col>
        <v-col cols="12" md="3">
          <v-switch
            label="เปิดสาธารณะ"
            prepend-icon="mdi-earth"
            hide-details
            v-model="item.publish"
            inset
            @click="$emit('updatePublish')"
          ></v-switch>
        </v-col>
        <v-col cols="12" md="6" class="text-right">
          <v-btn
            :disabled="showBtnEnd"
            color="error"
            @click="$emit('updatePublishEnd')"
          >
            <v-icon class="mr-2"> mdi-earth-off </v-icon>
            ปิดการประชาสัมพันธ์
          </v-btn>
        </v-col>
      </v-row>

      <!-- datetime -->
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
                @click="$refs.timeEndModal.save(item.timeEnd)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            label="ทิคเก็ท"
            prepend-icon="mdi-ticket"
            hide-details
            v-model="item.ticket"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="รหัสลับ"
            prepend-icon="mdi-xml"
            hide-details
            v-model="item.code"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" v-if="item.ContentStatus">
          <v-text-field
            label="สถานะ"
            prepend-icon="mdi-list-status"
            hide-details
            v-model="item.ContentStatus.name"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="พอยท์"
            prepend-icon="mdi-star"
            hide-details
            v-model="item.point"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            label="หัวข้อ"
            prepend-icon="mdi-format-title"
            hide-details
            v-model="item.title"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            label="คำอธิบาย"
            prepend-icon="mdi-image-text"
            hide-details
            v-model="item.description"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
            label="เนื้อหา"
            prepend-icon="mdi-details"
            hide-details
            v-model="item.detail"
            auto-grow
            required
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["item"],

  computed: {
    showBtnEnd() {
      if (this.item.timed == false && this.item.publish == true) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
