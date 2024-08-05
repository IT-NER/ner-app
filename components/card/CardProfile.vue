<template>
  <div>
    <v-card flat>
      <v-card-title>
        โปรไฟล์
        <v-spacer></v-spacer>
        <v-btn outlined color="warning"> แก้ไขรหัสผ่าน </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-card flat>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-avatar size="300px">
                  <v-img
                    v-if="!user.img"
                    src="https://investor.nerubber.com/themes/default/assets/static/images/logo-stroke.png"
                  />
                  <v-img v-else :src="`/uploads/profile/${user.img}`" />
                </v-avatar>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-divider></v-divider>
              <v-toolbar dense flat> อัพโหลดรูปภาพ </v-toolbar>
              <v-divider></v-divider>
              <v-card-actions>
                <v-file-input
                  type="file"
                  accept="image/jpeg, image/png"
                  show-size
                  v-model="file"
                  @change="handleFiles"
                  clearable
                ></v-file-input>
              </v-card-actions>
              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      user: {},
    };
  },

  methods: {
    async handleFiles(e) {
      console.log("e", e);
      if (!e) {
        return;
      }
      if (
        e.size < 2000000 &&
        (e.type == "image/jpeg" || e.type == "image/png")
      ) {
        this.file = await Object.assign({}, e.File);
      } else {
        this.file = null;
      }
    },
    async getUser() {
      this.user = this.$auth.$storage.getCookie("user");
      // console.log("user", this.user);
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped></style>
