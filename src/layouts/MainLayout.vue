<template lang="pug">
.all-content
  page-sidebar
  .right-content
    router-view
</template>

<script lang="ts" setup>
import PageSidebar from "@/components/PageSidebar.vue";
</script>

<style lang="scss" scoped>
.all-content {
  display: flex;
  height: 100%;
  background-color: var(--grey-background);

  .right-content {
    width: 100%;
    height: 100vh;
    overflow: auto;
  }
}
</style>
