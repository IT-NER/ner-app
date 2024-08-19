<template>
  <div>
    <!-- {{ items }} -->

    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h3>IMAGES PREVIEW</h3>
        </v-col>
        <v-col
          cols="12"
          md="2"
          sm="3"
          xs="4"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-card>
            <v-card-actions>
              <v-img :src="item.url" width="300px" height="auto">
                <template v-slot:default>
                  <!-- <v-container fluid> -->
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                        x-small
                        fab
                        color="warning"
                        class="float-right"
                        @click.stop="removeItem(item)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <!-- </v-container> -->
                </template>
              </v-img>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["files"],

  computed: {
    items() {
      if (this.files.length == 0) {
        return [];
      }
      let data = [];
      this.files.forEach((e) => {
        let url = URL.createObjectURL(e);
        data.push({ url: url });
      });

      return data;
    },
  },

  methods: {
    removeItem(item) {
      console.log("item", item);
      let index = this.items.indexOf(item);
      this.files.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
