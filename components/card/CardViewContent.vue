<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <div class="title">TICKET</div>
        <div class="subtitle-1">
          {{ content.ticket }}
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="title">CODE</div>
        <div class="subtitle-1">
          {{ content.code }}
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="title">ประเภท</div>
        <div class="subtitle-1">{{ content.ContentType.name }}</div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="title">พอยท์</div>
        <div class="subtitle-1">{{ content.point }} แต้ม</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <div class="title">หัวข้อ</div>
        <div class="subtitle-1">
          {{ content.title }}
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="title">คำอธิบาย</div>
        <div class="subtitle-1">
          {{ content.description }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="12">
        <div class="title">เนื้อหา</div>
        <div class="subtitle-1">
          {{ content.detail }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <div class="title">รูปภาพ</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="2" v-for="(item, i) in content.ContentImg" :key="i">
        <a @click="viewImg(item)">
          <v-img
            :src="`/uploads/content/${item.name}`"
            :aspect-ratio="16 / 9"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </a>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      width="1000"
      height="auto"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-actions>
          <v-carousel v-model="imgIndex" hide-delimiters>
            <v-carousel-item
              v-for="(item, i) in content.ContentImg"
              :key="i"
              :aspect-ratio="16 / 9"
              :src="`/uploads/content/${item.name}`"
            >
            </v-carousel-item>
          </v-carousel>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["contentId", "content"],
  data() {
    return {
      dialog: false,
      imgIndex: 0,
    };
  },
  watch: {
    contentId(val) {
      if (val) {
        this.getContentById();
      }
    },
  },

  methods: {
    async viewImg(item) {
      console.log("item", item);
      let index = this.content.ContentImg.indexOf(item);
      this.imgIndex = await index;
      this.dialog = true;
    },
    async getContentById() {
      let item = await this.$axios
        .get("/api/content/" + this.contentId)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return false;
        });

      if (!item) {
        return;
      }

      this.$emit("update:content", item);
      this.$emit("update:contentId", item.id);
    },
  },
};
</script>
