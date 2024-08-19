<template>
  <div>
    {{ item }}
    {{ items }}

    <v-container fluid :v-show="showItems">
      <v-row>
        <v-col cols="12">
          <h3>IMAGES PREVIEW</h3>
        </v-col>
        <v-col cols="12" md="2" sm="3" v-for="(item, i) in items" :key="i">
          <v-card>
            <v-card-actions>
              <v-img :src="item.url" height="auto">
                <template v-slot:default>
                  <v-container fluid>
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
                  </v-container>
                </template>
              </v-img>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid :v-show="!showItems">
      <v-row>
        <v-col cols="12">
          <h3>IMAGES PREVIEW</h3>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-actions>
              <v-img :src="item" width="1920" height="1080">
                <template v-slot:default>
                  <v-container fluid>
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
                  </v-container>
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
  props: ["files", "file"],

  computed: {
    showItems() {
      let data = Boolean();
      if (this.files) {
        data = true;
      } else {
        data = false;
      }
      return data;
    },
    items() {
      console.log("files", this.files);

      let data = [];
      if (this.files) {
        this.files.forEach((e) => {
          let url = URL.createObjectURL(e);
          data.push({ url: url });
        });
      } else {
        data = [];
      }
      return data;
    },

    item() {
      console.log("file", typeof this.file);

      if (!this.file) {
        return null;
      }
      let data = URL.createObjectURL(this.file);
      console.log("data", data);

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
