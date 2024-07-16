<template>
  <div>
    <v-card flat>
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <!-- ButtonBackToIndexPage -->
        <button-back-to-index-page :path.sync="path" />
        <!-- ButtonSave -->
        <button-save />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-title> {{ title }} </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <!-- FormPublic -->
        <form-public :contentPublic.sync="contentPublic" />
      </v-card-text>
      <v-divider></v-divider>

      <v-card-title>
        เนื้อหาประชาสัมพันธ์
        <v-spacer></v-spacer>
        <v-btn color="success" @click="openDialog">
          เลือกเนื้อหาประชาสัมพันธ์
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text v-if="contentPublic.contentId">
        <!-- CardViewContent -->
        <card-view-content
          :contentId.sync="contentPublic.contentId"
          :content.sync="contentPublic.Content"
        />
      </v-card-text>
      <v-card-text v-else>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          กรุณาเลือกเนื้อหาประชาสัมพันธ์
        </v-alert>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      max-width="1000"
      transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-card-title>
          เลือกเนื้อหาประชาสัมพันธ์
          <v-spacer></v-spacer>
          <v-icon @click="closeDialog">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <!-- CardSelectContent -->
          <card-select-content
            :content.sync="contentPublic.Content"
            :contentId.sync="contentPublic.contentId"
            :dialog="dialog"
            @closeDialog="closeDialog"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ButtonBackToIndexPage from "../btn/ButtonBackToIndexPage.vue";
import ButtonSave from "../btn/ButtonSave.vue";
import FormPublic from "../form/FormPublic.vue";
import CardSelectContent from "./CardSelectContent.vue";
import CardViewContent from "./CardViewContent.vue";
export default {
  components: {
    ButtonSave,
    ButtonBackToIndexPage,
    FormPublic,
    CardViewContent,
    CardSelectContent,
  },
  props: ["title", "path", "contentPublic"],

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
