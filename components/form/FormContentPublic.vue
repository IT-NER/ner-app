<template>
  <div>
    <v-row>
      <v-col cols="12" md="2">
        <v-text-field
          label="ทิคเก็ท"
          hide-details
          v-model="contentPublic.ticket"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-switch
          label="เปิดสาธารณะ"
          hide-details
          v-model="contentPublic.public"
          inset
        ></v-switch>
      </v-col>
      <v-col cols="12" md="2">
        <v-switch
          label="กำหนดเวลาเผยแพร่"
          hide-details
          v-model="contentPublic.timed"
          inset
        ></v-switch>
      </v-col>

      <v-col cols="12" md="3" v-if="contentPublic.timed">
        <v-text-field
          label="เริ่ม"
          hide-details
          v-model="contentPublic.start"
          type="datetime-local"
          :required="contentPublic.timed"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" v-if="contentPublic.timed">
        <v-text-field
          label="สิ้นสุด"
          hide-details
          v-model="contentPublic.end"
          type="datetime-local"
          :required="contentPublic.timed"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-autocomplete
          label="เนื้อหา"
          hide-details
          auto-select-first
          :items="contents"
          item-text="name"
          item-value="id"
          v-model="contentPublic.contentId"
          required
          return-object
          clearable
          @change="getContent"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea
          label="หมายเหตุ"
          hide-details
          v-model="contentPublic.remark"
          required
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["contentPublic", "contents"],

  methods: {
    async getContent(item) {
      console.log("item", item);

      if (!item) {
        this.contentPublic.contentId = null;
        this.contentPublic.Content = null;
        return;
      }

      let Content = await Object.assign({}, item);
      this.contentPublic.contentId = Content.id;
      this.contentPublic.Content = Content;

      console.log("contentPublic", this.contentPublic);
      this.$emit("update:contentPublic", this.contentPublic);
    },
  },
};
</script>

<style lang="scss" scoped></style>
