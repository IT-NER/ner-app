<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3">
          <v-autocomplete
            label="ประเภทรถ"
            dense
            required
            hide-details
            autofocus
            :items="itemsCarType"
            item-text="name"
            item-value="id"
            v-model="item.carTypeId"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="3">
          <v-autocomplete
            label="ยี่ห้อรถ"
            dense
            required
            hide-details
            :items="itemsCarBrand"
            item-text="name"
            item-value="id"
            v-model="item.carBrandId"
            @change="$emit('getCarModel')"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="3">
          <v-autocomplete
            label="รุ่นรถ"
            dense
            required
            hide-details
            :items="itemsCarModel"
            item-text="name"
            item-value="id"
            v-model="item.carModelId"
            :disabled="!itemsCarModel.length"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="3">
          <v-autocomplete
            label="สีรถ"
            dense
            required
            hide-details
            :items="itemsCarColor"
            item-text="name"
            item-value="id"
            v-model="item.carColorId"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            label="ทะเบียนรถ"
            dense
            required
            hide-details
            v-model="item.reg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-autocomplete
            label="จังหวัด"
            dense
            required
            hide-details
            :items="itemsProvince"
            item-text="name"
            item-value="id"
            v-model="item.provinceId"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            label="จำนวนที่นั่ง"
            dense
            hide-details
            v-model="item.qty"
            type="number"
            min="0"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="เลขไมล์"
            dense
            hide-details
            v-model="item.mileage"
            type="number"
            min="0"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-textarea
            label="หมายเหตุ"
            dense
            v-model="item.remark"
            hide-details
            auto-grow
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12">
                <v-file-input
                  label="รูปภาพหน้าปก"
                  dense
                  accept="image/jpeg, image/png"
                  prepend-inner-icon="mdi-cloud-upload"
                  clearable
                  hide-details
                  v-model="file"
                  @change="handleFile"
                ></v-file-input>
              </v-col>
              <v-col cols="12" md="12">
                <v-file-input
                  label="รูปภาพรถ"
                  dense
                  accept="image/jpeg, image/png"
                  prepend-inner-icon="mdi-cloud-upload"
                  clearable
                  multiple
                  hide-details
                  v-model="files"
                  @change="handleFiles"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: [
    "item",
    "itemsCarType",
    "itemsCarBrand",
    "itemsCarModel",
    "itemsCarColor",
    "itemsProvince",
    "file",
    "files",
  ],

  methods: {
    async handleFile(e) {
      console.log("e", e);

      if (!e) {
        return;
      }

      let size = await this.checkSize(e);
      let type = await this.checkType(e);

      if (!size) {
        this.file = null;
      }
      if (!type) {
        this.file = null;
      }

      this.$emit("update:file", this.file);
    },
    async handleFiles(e) {
      if (!e) {
        return;
      }

      this.files.forEach(async (e) => {
        let size = await this.checkSize(e);
        let type = await this.checkType(e);

        let index = this.files.indexOf(e);
        if (!size) {
          this.files.splice(index, 1);
        }
        if (!type) {
          this.files.splice(index, 1);
        }
      });

      this.$emit("update:files", this.files);
    },

    async checkSize(item) {
      let data = false;
      if (item.size <= 3000000) {
        data = true;
      }
      return data;
    },
    async checkType(item) {
      let data = false;
      if (item.type == "image/jpeg") {
        data = true;
      }
      if (item.type == "image/png") {
        data = true;
      }
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
