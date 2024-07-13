<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-alert text prominent type="error" icon="mdi-star">
            <h1 class="title">กิจกรรม</h1>
          </v-alert>
        </v-col>
        <v-col cols="12" md="3" v-for="(items, i) in itemsActivity" :key="i">
          <v-card tile>
            <v-toolbar dense dark color="error" elevation="0" tile>
              {{ items.Content.title }}
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <img
                width="100"
                :src="`/uploads/content/${item.name}`"
                v-for="(item, i) in items.Content.ContentImg"
                :key="i"
                :v-if="item.index"
              />
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                class="float-right"
                :to="`/content/${items.Content.ticket}`"
                target="_blank"
              >
                <v-icon class="mr-2"> mdi-star </v-icon>
                <span>
                  {{ items.Content.point }}
                </span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["itemsActivity"],

  data() {
    return {
      imgUrl: [],
    };
  },

  methods: {
    getImgIndex() {},
  },
};
</script>

<style lang="scss" scoped></style>
