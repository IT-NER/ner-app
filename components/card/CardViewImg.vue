<template>
  <div>
    <v-container fluid>
      <v-row>
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
                        @click.stop="$emit('removeItem', item)"
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
  props: ["items"],
};
</script>

<style lang="scss" scoped></style>
