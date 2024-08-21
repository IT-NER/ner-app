<template>
  <div>
    <v-card flat width="100vw" class="mx-auto">
      <v-carousel
        cycle
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
        height="auto"
      >
        <v-carousel-item
          v-for="(list, i) in item.ContentImg"
          :key="i"
          :src="`/uploads/content/${list.name}`"
          :aspect-ratio="16 / 9"
        >
        </v-carousel-item>
      </v-carousel>
    </v-card>

    <v-card flat width="100vw" class="mx-auto">
      <v-card-actions>
        <v-spacer></v-spacer>
        {{ $moment(item.createdAt).format("ll") }}
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-title>
        {{ item.title }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h3>{{ item.description }}</h3>
            </v-col>
            <v-col cols="12">
              <p>{{ item.detail }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss" scoped></style>
