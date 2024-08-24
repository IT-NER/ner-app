<template>
  <div>
    <v-container fluid>
      <v-row>
        <!-- <v-col cols="12" md="3">
          <v-dialog
            ref="dateStartModal"
            v-model="dateStartModal"
            :return-value.sync="item.start"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="วันที่เริ่ม"
                hide-details
                v-model="item.start"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
              ></v-text-field>
            </template>
            <v-date-picker v-model="item.start" scrollable locale="th">
              <v-spacer></v-spacer>
              <v-btn
                outlined
                text
                color="primary"
                @click="dateStartModal = false"
              >
                Cancel
              </v-btn>
              <v-btn
                outlined
                text
                color="primary"
                @click="$refs.dateStartModal.save(item.start)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>

        <v-col cols="12" md="3">
          <v-dialog
            ref="dateEndModal"
            v-model="dateEndModal"
            :return-value.sync="item.end"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="วันที่สิ้นสุด"
                hide-details
                v-model="item.end"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="item.end"
              scrollable
              locale="th"
              :min="item.start"
            >
              <v-spacer></v-spacer>
              <v-btn
                outlined
                text
                color="primary"
                @click="dateEndModal = false"
              >
                Cancel
              </v-btn>
              <v-btn
                outlined
                text
                color="primary"
                @click="$refs.dateEndModal.save(item.end)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col> -->

        <v-col cols="12" md="6">
          <v-select
            label="ประเภท"
            v-model="item.contentTypeId"
            :items="itemsContentType"
            item-text="name"
            item-value="id"
            multiple
            clearable
            hide-details
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            label="สถานะ"
            v-model="item.contentStatusId"
            :items="itemsContentStatus"
            item-text="name"
            item-value="id"
            multiple
            clearable
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["item", "itemsContentType", "itemsContentStatus"],

  data() {
    return {
      dateStartModal: false,
      dateEndModal: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
