<template>
  <div>
    <v-simple-table width="100%">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ลำดับ</th>
            <th class="text-left">รายการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in foods" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: ["BookingFood"],
  data() {
    return {
      foods: [],
    };
  },

  async created() {
    await this.getBookingFoodById();
  },

  watch: {
    BookingFood(val) {
      if (val) {
        this.getBookingFoodById();
      }
    },
  },

  methods: {
    async getBookingFoodById() {
      let foods = [];
      this.BookingFood.forEach(async (e) => {
        let food = await this.$axios
          .get("/api/food/" + Number(e))
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log("err", err);
          });

        foods.push(food);
      });

      this.foods = foods;
    },
  },
};
</script>

<style lang="scss" scoped></style>
