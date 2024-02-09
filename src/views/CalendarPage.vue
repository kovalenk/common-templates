<script setup lang="ts">
import CustomCalendar from "@/components/CustomCalendar.vue";
</script>

<template lang="pug">
.calendar
  .calendar--block
    custom-calendar(is-range="true")
</template>

<style scoped lang="scss">
.calendar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &--block {
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }
}
</style>
