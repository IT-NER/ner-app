<template>
  <div>
    <v-card flat>
      <v-card-title> IMAGES </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="reward.RewardImg.length > 0">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="2"
              v-for="(item, i) in reward.RewardImg"
              :key="i"
              :v-if="item"
              class="text-center"
            >
              <v-row>
                <v-col cols="12" class="text-right">
                  <v-icon @click="delImg(item)">mdi-close</v-icon>
                </v-col>
              </v-row>
              <v-card flat>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <nuxt-img :src="`../${item.url}`" width="200" height="auto" />
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          ยังไม่มีรูปภาพ
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["reward"],

  data() {
    return {
      showImg: false,
    };
  },

  methods: {
    async delImg(item) {
      console.log("item", item);
      await this.delRewardImgById(item);
      await this.getRewardById();
      await this.alertSuccess();
    },

    async delRewardImgById(item) {
      let reward = await this.$axios.delete("/api/rewardImg/" + item.id);
    },
    async getRewardById() {
      let reward = await this.$axios.get("/api/reward/" + this.reward.id);
      this.$emit("update:reward", reward.data);
    },
    async alertSuccess() {
      await this.$swal.fire({
        position: "top-end",
        type: "success",
        title: "บันทึก เรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
