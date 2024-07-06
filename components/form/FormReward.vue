<template>
  <div>
    <v-card flat>
      <v-card-title dense flat>
        <div class="title">DETAIL REWARD</div>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="2">
            <v-text-field
              label="TICKET"
              required
              v-model="reward.ticket"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              autofocus
              label="CODE"
              v-model="reward.code"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field
              label="NAME"
              required
              v-model="reward.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-text-field
              label="POINT"
              required
              v-model="reward.point"
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-textarea
              label="DESCRIPTION"
              required
              v-model="reward.description"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="12">
            <v-file-input
              prepend-icon="mdi-cloud-upload-outline"
              v-model="reward.files"
              accept="image/jpeg"
              label="UPLOADS FILE IMAGE"
              multiple
              counter
              show-size
              clearable
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["reward"],
};
</script>

<style lang="scss" scoped></style>
