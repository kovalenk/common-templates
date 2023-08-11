<template lang="pug">
.tooltips 
  .tooltip-section
    .action(@mouseover="visibility = true", @mouseout="visibility = false")
      slot(name="action")
    teleport(to="body")
      slot(name="content", v-if="visibility")
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
const visibility = ref(false);
</script>

<style>
.action {
  font-size: 14px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  margin: 80px 20px;
  cursor: pointer;
}
.tooltip {
  font-size: 11px;
  font-family: "Inter", sans-serif;
  font-weight: 400;

  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  color: #000;
  text-align: center;
  border-radius: 8px;

  min-width: 128px;
  max-width: 240px;
  width: max-content;
  min-height: 18px;
  max-height: 76px;
  height: max-content;
  opacity: 1;
  transition: opacity 0.1s;

  position: relative;

  background: #fff;
  box-shadow: 0 4px 32px 0 rgba(61, 55, 52, 0.08),
    0 4px 8px 0 rgba(61, 55, 52, 0.08), 0 0 2px 0 rgba(61, 55, 52, 0.16);
  padding: 11px 16px;
  margin-top: 5px;
  &::before {
    content: " ";
    position: absolute;
    background: url("../assets/arrow.png");
    width: 15px;
    height: 9px;
    margin-left: -5px;
    filter: drop-shadow(rgba(0, 0, 0, 0.3) 0 2px 10px);
  }
}
</style>
