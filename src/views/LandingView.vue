<template lang="pug">
.wrapper
  .area-1
    common-tooltip(:is-click="true")
      template(v-slot:element)
        span click
      template(v-slot:content)
        | tooltip
  .area-2
    common-tooltip(:is-hover="true")
      template(v-slot:element)
        span hover
      template(v-slot:content)
        | tooltip
</template>

<script lang="ts" setup>
import CommonTooltip from "@/components/CommonTooltip.vue";
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 3px;

  .area-1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: flex-end;
    min-height: 2000px;
    overflow: hidden;
    background: pink;
  }
  .area-2 {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: flex-start;
    min-height: 2000px;
    overflow: hidden;
    background: cornflowerblue;
  }
}
</style>
