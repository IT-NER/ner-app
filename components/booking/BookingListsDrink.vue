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
          <tr v-for="(item, i) in drinks" :key="i">
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
  props: ["BookingDrink"],
  data() {
    return {
      drinks: [],
    };
  },

  async created() {
    await this.getBookingDrinkById();
  },

  watch: {
    BookingDrink(val) {
      if (val) {
        this.getBookingDrinkById();
      }
    },
  },

  methods: {
    async getBookingDrinkById() {
      let drinks = [];
      this.BookingDrink.forEach(async (e) => {
        let drink = await this.$axios
          .get("/api/drink/" + parseInt(e))
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log("err", err);
          });

        drinks.push(drink);
      });

      this.drinks = drinks;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>