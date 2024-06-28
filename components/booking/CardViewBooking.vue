<template>
  <div>
    <v-card>
      <v-toolbar dense :color="booking.color" dark elevation="0">
        รายละเอียด
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <div class="title">ผู้จอง</div>
            <div class="sub-title">
              {{ booking.User.fname }} {{ booking.User.lname }}
            </div>
            <div class="sub-title">
              <span>
                วันที่จอง : {{ $moment(booking.createdAt).format("LL") }}
              </span>
              <br />
              <span>
                เวลา : {{ $moment(booking.createdAt).format("LT") }} น.
              </span>
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <div class="title">แผนก</div>
            <div class="sub-title">
              {{ booking.User.Department.name }}
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="12" v-if="User.Role.id >= 2">
            <div class="title">เบอร์โทรศัพท์</div>
            <div class="sub-title">
              {{ booking.authorPhoneNumber }}
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <div class="title">หัวข้อ</div>
            <div class="sub-title">
              {{ booking.name }}
            </div>
            <div class="title">ประธาน</div>
            <div class="sub-title">
              {{ booking.chairman }}
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <div class="title">ห้องประชุม</div>
            <div class="sub-title">
              {{ booking.Room.name }}
            </div>

            <div class="sub-title">ผู้เข้าร่วม : {{ booking.quantity }} คน</div>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <div class="title">เริ่ม</div>
            <div class="sub-title">
              {{ $moment(booking.start).format("LLL") }}
            </div>
            <div class="title">ถึง</div>
            <div class="sub-title">
              {{ $moment(booking.end).format("LLL") }}
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <div class="title">รูปแบบ</div>
            <div class="sub-title">
              {{ booking.MeetingType.name }}
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="12" v-if="booking.MeetingTypeId == 2">
            <div class="title">โปรแกรม</div>
            <div class="sub-title">
              {{ booking.Program.name }}
            </div>
            <div class="title">ID</div>
            <div class="sub-title">
              {{ booking.meetingId }}
            </div>
            <div class="title">PASSWORD</div>
            <div class="sub-title">
              {{ booking.meetingPassword }}
            </div>
            <div class="title">URL</div>
            <div class="sub-title">
              <a :href="booking.url" target="blank">
                {{ booking.url }}
              </a>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="title">หมายเหตุ</div>
            <div class="sub-title">
              {{ booking.description }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["booking"],

  data() {
    return {
      User: null,
    };
  },

  created() {
    this.getUser();
  },

  watch: {
    booking(val) {
      this.booking = val;
    },
  },

  methods: {
    async getUser() {
      this.User = this.$auth.$storage.getCookie("user");
    },
  },
};
</script>

<style lang="scss" scoped></style>
