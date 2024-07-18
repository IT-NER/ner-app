<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          label="ทิคเก็ท"
          prepend-icon="mdi-ticket"
          hide-details
          v-model="content.ticket"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-switch
          label="เปิดสาธารณะ"
          prepend-icon="mdi-earth"
          hide-details
          v-model="content.content"
          inset
        ></v-switch>
      </v-col>
      <v-col cols="12" md="3">
        <v-switch
          label="กำหนดเวลาเผยแพร่"
          prepend-icon="mdi-timer-sand"
          hide-details
          v-model="content.timed"
          inset
        ></v-switch>
      </v-col>
    </v-row>

    <!-- datetime -->
    <v-row>
      <!-- content.dateStart -->
      <v-col cols="12" md="3" v-if="content.timed">
        <v-dialog
          ref="dateStartModal"
          v-model="content.dateStartModal"
          :return-value.sync="content.dateStart"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="วันที่เริ่ม"
              hide-details
              v-model="content.dateStart"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="content.dateStart" scrollable locale="th">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="content.dateStartModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateStartModal.save(content.dateStart)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>

      <!-- content.timeStart -->
      <v-col cols="12" md="3" v-if="content.timed">
        <v-dialog
          ref="timeStartModal"
          v-model="content.timeStartModal"
          :return-value.sync="content.timeStart"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="เวลาเริ่ม"
              hide-details
              v-model="content.timeStart"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="content.timeStart"
            scrollable
            locale="th"
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="content.timeStartModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.timeStartModal.save(content.timeStart)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>

      <!-- content.dateEnd -->
      <v-col cols="12" md="3" v-if="content.timed">
        <v-dialog
          ref="dateEndModal"
          v-model="content.dateEndModal"
          :return-value.sync="content.dateEnd"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="วันที่สิ้นสุด"
              hide-details
              v-model="content.dateEnd"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="content.dateEnd"
            scrollable
            locale="th"
            :min="content.dateStart"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="content.dateEndModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateEndModal.save(content.dateEnd)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>

      <!-- content.timeEnd -->
      <v-col cols="12" md="3" v-if="content.timed">
        <v-dialog
          ref="timeEndModal"
          v-model="content.timeEndModal"
          :return-value.sync="content.timeEnd"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="เวลาสิ้นสุด"
              hide-details
              v-model="content.timeEnd"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="content.timeEnd"
            scrollable
            locale="th"
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="content.timeEndModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.timeEndModal.save(content.timeEnd)"
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
          v-model="content.remark"
          required
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["content", "contents"],

  methods: {
    async getContent(item) {
      console.log("item", item);

      if (!item) {
        this.content.contentId = null;
        this.content.Content = null;
        return;
      }

      let Content = await Object.assign({}, item);
      this.content.contentId = Content.id;
      this.content.Content = Content;

      console.log("content", this.content);
      this.$emit("update:content", this.content);
    },
  },
};
</script>

<style lang="scss" scoped></style>
