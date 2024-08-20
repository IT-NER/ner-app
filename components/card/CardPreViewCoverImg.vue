<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h3>IMAGES PREVIEW</h3>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-actions>
              <v-img :src="item">
                <template v-slot:default>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          x-small
                          fab
                          color="warning"
                          class="float-right"
                          @click.stop="removeItem"
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
  props: ["file"],

  computed: {
    item() {
      if (!this.file) {
        return null;
      }
      let data = URL.createObjectURL(this.file);
      console.log("data", data);

      return data;
    },
  },

  methods: {
    removeItem() {
      this.$emit("update:file", null);
    },
  },
};
</script>

<style lang="scss" scoped></style>
