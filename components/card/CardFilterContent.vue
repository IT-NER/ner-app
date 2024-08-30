<template>
  <div>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              label="สถานะ"
              v-model="item.contentStatusId"
              :items="itemsContentStatus"
              item-text="name"
              item-value="id"
              multiple
              clearable
              @change="$emit('getItems')"
            ></v-select>
          </v-col>

          <!-- item.start -->
          <v-col cols="12" md="3">
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
          <!-- item.end -->
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
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined color="primary" @click="$emit('getItems')">
        <v-icon> mdi-magnify </v-icon>
        ค้นหา
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  props: ["item"],

  data() {
    return {
      dateStartModal: false,
      dateEndModal: false,
      itemsContentStatus: [],
    };
  },

  created() {
    this.getItemsContentStatus();
  },
  methods: {
    async getItemsContentStatus() {
      this.itemsContentStatus = await this.$axios
        .get("/api/contentStatus")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return [];
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
