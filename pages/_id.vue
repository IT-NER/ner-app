<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <card-view-content-by-id :id.sync="$route.params.id" />
        </v-col>
        <v-col cols="12">
          <card-button-received-point :id.sync="$route.params.id" />
        </v-col>
      </v-row>
    </v-container>

    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import CardViewContentById from "~/components/card/CardViewContentById.vue";
import CardButtonReceivedPoint from "~/components/card/CardButtonReceivedPoint.vue";
export default {
  layout: "blankLayout",
  components: { CardViewContentById, CardButtonReceivedPoint },
};
</script>

<style lang="scss" scoped></style>
