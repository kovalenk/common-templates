<script setup lang="ts">
import { ref, defineProps } from "vue";
import vTooltip from "@/directives/v-tooltip";

const props = defineProps({
  scrollClassName: {
    type: String,
    default: "body",
  },
  isClick: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    required: true,
  },
});

const refToolTip = ref(null);
</script>

<template lang="pug">
.tooltip
  .tooltip--hover-item(
    v-if="refToolTip",
    v-tooltip="{ tooltip: refToolTip, scrollClassName: scrollClassName, useClick: isClick, positionClass: position }"
  )
    slot(name="item")
  teleport(:to="'body'")
    transition(name="fade")
    .custom-tooltip(ref="refToolTip")
      .custom-tooltip--arrow(:class="position")
      slot(name="content")
</template>

<style scoped lang="scss">
.tooltip {
  position: relative;
  &--hover-item {
    display: flex;
  }
}
</style>
