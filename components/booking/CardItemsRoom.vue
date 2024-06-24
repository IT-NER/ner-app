<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-card-actions>
              <v-col cols="12">
                <v-chip
                  v-for="(item, i) in Room"
                  :key="i"
                  label
                  :color="item.color"
                  dark
                  class="ma-2"
                >
                  {{ item.name }}
                </v-chip>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["Room"],
};
</script>

<style lang="scss" scoped></style>
