<template>
  <div>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <div class="v-label--active">การเผยแพร่</div>
            <v-switch
              label="การเผยแพร่"
              hide-details
              v-model="item.timed"
              inset
              @click="$emit('getItems')"
            >
              <template v-slot:label>
                <!-- <span> การเผยแพร่ </span> -->
                <v-chip label color="primary" v-if="item.timed">
                  <v-icon class="mr-2"> mdi-refresh-auto </v-icon>
                  (อัตโนมัติ)
                </v-chip>
                <v-chip label color="error" v-else>
                  <v-icon class="mr-2"> mdi-gesture-double-tap </v-icon>
                  กำหนดเอง
                </v-chip>
              </template>
            </v-switch>
          </v-col>

          <v-col cols="12" md="3">
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
          <v-col cols="12" md="3" v-if="item.timed">
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
                  @click:clear="item.end = null"
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
                  @click="
                    $refs.dateStartModal.save(item.start),
                      (item.end = item.start)
                  "
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <!-- item.end -->
          <v-col cols="12" md="3" v-if="item.timed">
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
                  @click:clear="item.start = null"
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
        <v-icon class="mr-2"> mdi-magnify </v-icon>
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
