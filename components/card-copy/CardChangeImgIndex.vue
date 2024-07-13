<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="2" v-for="(item, i) in items" :key="i">
          <v-card tile elevation="0">
            <!-- <v-toolbar dense elevation="0">
            <v-spacer></v-spacer>

          </v-toolbar> -->
            <v-row>
              <v-col>
                <v-btn
                  class="float-right"
                  color="success"
                  @click="setImgIndex(item)"
                  >เลือก</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
          <v-divider></v-divider>
          <v-card tile @click="viewImg(item)">
            <v-card-actions>
              <v-img
                :src="`/uploads/content/${item.name}`"
                height="auto"
                width="200px"
                class="mx-auto"
              >
              </v-img>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="dialogViewImg"
      transition="dialog-transition"
      max-width="600px"
    >
      <v-card>
        <v-card-actions>
          <v-img
            :src="imgUrl"
            max-height="100vh"
            width="300"
            class="mx-auto"
          ></v-img>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FormUser from "../form/FormUser.vue";
export default {
  components: { FormUser },
  props: [
    "items",
    "closeDialog",
    "alertError",
    "alertSuccess",
    "getContentByTicket",
  ],
  data() {
    return {
      headers: [
        { text: "ลำดับ", value: "no" },
        { text: "รูปภาพ", value: "img" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      imgUrl: null,
      dialogViewImg: false,
    };
  },

  methods: {
    viewImg(item) {
      let url = "/uploads/content/" + item.name;
      this.imgUrl = url;
      this.dialogViewImg = true;
    },

    async setImgIndex(item) {
      console.log("item", item);
      let itemImg = Object.assign({}, item);

      let ContentImg = await this.$axios
        .post("/api/contentImg/setImgIndex", {
          data: itemImg,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      if (!ContentImg) {
        this.$emit("alertError");
      }
      this.$emit("getContentByTicket");
      this.$emit("alertSuccess");

      // this.items.ContentImg = ContentImg;
      // this.$emit("update:items", this.items);
    },
  },
};
</script>

<style>
.v-image__image {
  background-size: 100% auto;
}
</style>
