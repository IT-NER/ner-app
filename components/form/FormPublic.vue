<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          label="ทิคเก็ท"
          prepend-icon="mdi-ticket"
          hide-details
          v-model="publish.ticket"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-switch
          label="เปิดสาธารณะ"
          prepend-icon="mdi-earth"
          hide-details
          v-model="publish.publish"
          inset
        ></v-switch>
      </v-col>
      <v-col cols="12" md="3">
        <v-switch
          label="กำหนดเวลาเผยแพร่"
          prepend-icon="mdi-timer-sand"
          hide-details
          v-model="publish.timed"
          inset
        ></v-switch>
      </v-col>
    </v-row>

    <!-- datetime -->
    <v-row>
      <!-- publish.dateStart -->
      <v-col cols="12" md="3" v-if="publish.timed">
        <v-dialog
          ref="dateStartModal"
          v-model="publish.dateStartModal"
          :return-value.sync="publish.dateStart"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="วันที่เริ่ม"
              hide-details
              v-model="publish.dateStart"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="publish.dateStart" scrollable locale="th">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="publish.dateStartModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateStartModal.save(publish.dateStart)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>

      <!-- publish.timeStart -->
      <v-col cols="12" md="3" v-if="publish.timed">
        <v-dialog
          ref="timeStartModal"
          v-model="publish.timeStartModal"
          :return-value.sync="publish.timeStart"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="เวลาเริ่ม"
              hide-details
              v-model="publish.timeStart"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="publish.timeStart"
            scrollable
            locale="th"
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="publish.timeStartModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.timeStartModal.save(publish.timeStart)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>

      <!-- publish.dateEnd -->
      <v-col cols="12" md="3" v-if="publish.timed">
        <v-dialog
          ref="dateEndModal"
          v-model="publish.dateEndModal"
          :return-value.sync="publish.dateEnd"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="วันที่สิ้นสุด"
              hide-details
              v-model="publish.dateEnd"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="publish.dateEnd"
            scrollable
            locale="th"
            :min="publish.dateStart"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="publish.dateEndModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateEndModal.save(publish.dateEnd)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>

      <!-- publish.timeEnd -->
      <v-col cols="12" md="3" v-if="publish.timed">
        <v-dialog
          ref="timeEndModal"
          v-model="publish.timeEndModal"
          :return-value.sync="publish.timeEnd"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="เวลาสิ้นสุด"
              hide-details
              v-model="publish.timeEnd"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="publish.timeEnd"
            scrollable
            locale="th"
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="publish.timeEndModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.timeEndModal.save(publish.timeEnd)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="12">
        <v-textarea
          label="หมายเหตุ"
          prepend-icon="mdi-note-edit"
          hide-details
          v-model="publish.remark"
          required
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["publish", "contents"],

  methods: {
    async getContent(item) {
      console.log("item", item);

      if (!item) {
        this.publish.contentId = null;
        this.publish.Content = null;
        return;
      }

      let Content = await Object.assign({}, item);
      this.publish.contentId = Content.id;
      this.publish.Content = Content;

      console.log("publish", this.publish);
      this.$emit("update:publish", this.publish);
    },
  },
};
</script>

<style lang="scss" scoped></style>
