<template lang="pug">
.tooltip-box
  span(v-hover="true") {{ textHover }}
  .tooltip(:class="tooltipClass")
    span.arrow(:class="arrowClass") {{ text }}
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  textHover: {
    type: String,
    required: true,
  },
  arrowClass: {
    type: String,
    default: "",
  },
  tooltipClass: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.tooltip-box {
  position: relative;
  display: block;
  cursor: pointer;
  span {
    font-size: 11px;
  }
}

.tooltip-box:hover .tooltip {
  opacity: 1;
}
.tooltip {
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
  opacity: 0;
  transition: opacity 1s;

  position: absolute;

  background: #fff;
  box-shadow: 0 0 10px 2px rgba(61, 55, 52, 0.08);
  z-index: 1;
  padding: 11px 16px;
}
.arrow::before {
  content: " ";
  position: absolute;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  filter: drop-shadow(rgba(0, 0, 0, 0.3) 0 2px 10px);
}
</style>
