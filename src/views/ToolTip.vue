<script setup lang="ts">
import CustomToolTip from "@/components/CustomToolTip.vue";
</script>

<template lang="pug">
#table-section.table-section
  .table-item(v-for="item in 40")
    custom-tool-tip.left-top(:is-click="true")
      template(v-slot:item="")
        .table-item--name In publishing and graphic design, Lorem ipsum {{ item }}
      template(v-slot:content="")
        .table-item--name {{ item }}.{{ " In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available." }}
</template>

<style scoped lang="scss">
.table {
  &-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &-item {
    display: flex;
    justify-content: center;
    &--name {
      font-size: 18px;
      color: black;
    }
  }
}
</style>
