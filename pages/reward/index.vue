<template>
  <div>
    <v-card flat>
      <v-card-title elevation="0">
        {{ title }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title elevation="0">
        <v-text-field v-model="search" label="ค้นหา"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn outlined color="success" @click="addItem"> เพิ่ม </v-btn>
        <v-btn outlined color="primary" @click="getReward"> รีเฟรช </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="rewards"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn outlined color="warning" @click="editItem(item)">
            แก้ไข
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "REWARD",
      search: null,

      headers: [
        { text: "ลำดับ", value: "no", align: "center", sortable: false },
        { text: "ทิคเก็ท", value: "ticket" },
        { text: "CODE", value: "code" },
        { text: "NAME", value: "name" },
        { text: "DESCRIPTION", value: "description" },
        { text: "พอยท์", value: "point" },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],
      rewards: [],
      reward: {
        id: null,
        ticket: null,
        code: null,
        name: null,
        description: null,
        point: null,
        active: true,
        userId: null,
        User: null,
        RewardImg: [],
      },
    };
  },

  created() {
    this.getUser();
    this.getReward();
  },

  methods: {
    async getReward() {
      this.rewards = await this.$axios
        .get("/api/reward")
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async addItem() {
      let reward = await this.create();
      if (!reward) {
        this.alertError();
        return;
      }
      this.$router.push("/reward/" + reward.ticket);
    },

    async create() {
      let reward = await this.$axios
        .post("/api/reward", {
          data: this.reward,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });
      return reward;
    },

    async getUser() {
      let user = this.$auth.$storage.getCookie("user");
      this.reward.userId = user.id;
    },

    async editItem(item) {
      this.$router.push("/reward/" + item.ticket);
    },

    async alertError() {
      this.$swal.fire({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>
