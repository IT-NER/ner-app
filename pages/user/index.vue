<template>
  <div>
    <crud-user />
  </div>
</template>

<script>
import CrudUser from "~/components/crud/CrudUser.vue";
export default {
  components: { CrudUser },
  layout: "defaultLayout",
};
</script>

<style lang="scss" scoped></style>
