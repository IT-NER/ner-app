<template>
  <div>
    <v-card flat>
      <v-card-title>
        <v-spacer></v-spacer>
        ลิ้งค์ภายใน
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>
    <v-divider></v-divider>
    <div v-if="items.length > 0">
      <v-card flat v-for="(item, i) in items" :key="i">
        <v-card-actions>
          <v-btn
            small
            block
            text
            color="success"
            :href="item.url"
            target="_blank"
          >
            {{ item.name }}
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
      </v-card>
    </div>

    <div v-else>
      <v-card flat>
        <v-card-text>
          <v-alert text prominent type="error" icon="mdi-cloud-alert">
            COMING SOON
          </v-alert>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      this.items = await this.$axios
        .get("/api/admin/button-link-active")
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
