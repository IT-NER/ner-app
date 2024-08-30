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
        <form-content :content.sync="content" />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-title> อัพโหลดรูปภาพ </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-file-input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                counter
                multiple
                show-size
                v-model="files"
                @change="handleFiles"
                clearable
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ButtonBackToIndexPage from "~/components/button/ButtonBackToIndexPage.vue";
import ButtonSave from "~/components/button/ButtonSave.vue";
import FormContent from "../form/FormContent.vue";
export default {
  components: { ButtonSave, ButtonBackToIndexPage, FormContent },
  props: ["title", "path", "content", "files"],

  methods: {
    async handleFiles(e) {
      if (!e) {
        this.$emit("update:files", []);
        return;
      }

      let result = await this.validateFiles(e);
      console.log("result", result);
      if (result.length == 0) {
        this.$emit("update:files", []);
      }

      this.$emit("update:files", result);
    },

    async validateFiles(e) {
      let result = await e.filter(
        (item) =>
          (item.size <= 2500000 && item.type == "image/jpeg") ||
          (item.size <= 2500000 && item.type == "image/png")
      );
      return result;
    },
  },
};
</script>
