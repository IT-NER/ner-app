<template>
  <div>
    <form @submit.prevent="save">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-btn dark large color="warning" @click="goToActivity">
              <v-icon class="mr-2">mdi-arrow-left</v-icon>
              กลับหน้าหลัก
            </v-btn>
            <v-btn dark large color="success" class="float-right" type="submit">
              <v-icon class="mr-2">mdi-content-save</v-icon>
              บันทึก
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-alert text prominent type="success" icon="mdi-track-light">
              <div class="title">เลขที่เอกสาร : {{ activity.code }}</div>
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              autofocus
              label="START"
              type="datetime-local"
              hide-details
              required
              v-model="activity.start"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              label="END"
              type="datetime-local"
              hide-details
              required
              v-model="activity.end"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-switch
              label="SHOW"
              type="datetime-local"
              hide-details
              inset
              color="success"
              class="float-right"
              v-model="activity.show"
            ></v-switch>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="TITLE"
              prepend-icon="mdi-format-title"
              hide-details
              required
              v-model="activity.title"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="SUB TITLE"
              prepend-icon="mdi-file-tree"
              hide-details
              required
              v-model="activity.subTitle"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="DISCRIPTION"
              prepend-icon="mdi-details"
              hide-details
              v-model="activity.description"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-file-input
              name="file"
              type="file"
              label="IMAGES"
              counter
              multiple
              show-size
              v-model="files"
              @change="handleFiles"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-container>
    </form>

    <v-row v-if="activity.ActivityImg.length > 0">
      <v-col cols="12">
        <v-alert text prominent type="success" icon="mdi-file-image-plus">
          <div class="title">รูปภาพ</div>
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3" v-for="(item, i) in activity.ActivityImg" :key="i">
        <v-card>
          <v-card-actions justify-center>
            <v-img width="100px" height="150px" :src="item.url" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "management",
  data() {
    return {
      activity: {
        id: null,
        code: null,
        start: null,
        end: null,
        show: null,
        title: null,
        subTitle: null,
        description: null,
        active: true,
        ActivityImg: [],
      },

      files: [],
    };
  },

  created() {
    this.getActivityById();
  },

  methods: {
    async save() {
      console.log("activity", this.activity);

      if (this.files.length > 0) {
      }
      let activity = this.createActivity();
    },

    async createActivity() {
      let activity = await this.$axios
        .post("/api/activity")
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });

      return activity;
    },

    async getActivityById() {
      let activity = await this.$axios
        .get("/api/activity/" + this.$route.params.id)
        .then((res) => {
          //   res.data.forEach((e) => {
          //     e.ActivityImg.forEach((item) => {
          //       item["url"] = require("../../../uploads/activity/" + item.name);
          //     });
          //   });
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          // console.log("err", err);
        });

      this.$nextTick(() => {
        this.activity = activity;
      });
    },

    async goToActivity() {
      this.$router.push("/management/activity");
    },

    async handleFiles(event) {
      let result = await event.filter(
        (item) => item.type == "image/jpeg" && item.size <= 2000000
      );
      this.files = await result;
    },

    async uploadFiles() {
      // console.log("files", this.files);

      this.formData = new FormData();
      this.files.forEach((file) => {
        this.formData.append("files", file);
      });

      await this.uploads();
      await this.createActivityImg();
      this.$emit("getActivityById", this.activity);
    },

    async uploads() {
      this.filesUpload = await this.$axios
        .post("/api/activityImg/uploads", this.formData, {})
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async createActivityImg() {
      await this.$axios
        .post("/api/activityImg", {
          data: {
            files: this.filesUpload,
            activityId: this.activity.id,
          },
        })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
