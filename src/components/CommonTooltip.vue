<template lang="pug">
.tooltip(
  @click="openTooltip($event)",
  @mouseover="openTooltip($event)",
  @mouseleave="closeTooltip($event)",
  ref="tooltip"
)
  slot(:name="'element'")
  teleport(:to="'body'")
    .tooltip-content(
      ref="popup",
      :style="[{ top: `${Math.round(position.y)}px` }, { left: `${Math.round(position.x)}px` }]",
      v-show="isTooltipOpen"
    )
      slot(:name="'content'")
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, defineProps } from "vue";

const props = defineProps({
  isHover: {
    type: Boolean,
    default: () => false,
  },
  isClick: {
    type: Boolean,
    default: () => false,
  },
  isAuto: {
    type: Boolean,
    default: () => false,
  },
});

const isTooltipOpen = ref(false);
const tooltip = ref(null);
const popup = ref(null);
const position = ref({
  x: 0,
  y: 0,
});

const observer = new window.IntersectionObserver(
  ([entry]) => {
    console.log(entry);
    if (entry.isIntersecting) {
      return;
    } else {
      isTooltipOpen.value = false;
    }
  },
  { root: null, rootMargin: "40px 0px 40px 0px", threshold: 1 }
);
const updatePosition = () => {
  requestAnimationFrame(() => {
    const clientRect = tooltip.value.getBoundingClientRect();
    position.value.x = clientRect.x;
    position.value.y = clientRect.y + clientRect.height;
  });
};

onBeforeUnmount(() => {
  document.getElementById("app").removeEventListener("scroll", () => {
    updatePosition();
  });
  observer.unobserve(popup.value);
});

enum eventTypes {
  mouseleave = "mouseleave",
  mouseover = "mouseover",
  click = "click",
}

const openTooltip = (event: MouseEvent) => {
  if (
    (event.type === eventTypes.mouseover && props.isHover) ||
    (event.type === eventTypes.click && props.isClick)
  ) {
    console.log(event);
    isTooltipOpen.value = true;
    observer.observe(popup.value);
    updatePosition();
    document.getElementById("app").addEventListener("scroll", () => {
      updatePosition();
    });
    console.log(popup.value);
  }
};
const closeTooltip = (event: MouseEvent) => {
  if (
    (event.type === eventTypes.mouseleave && props.isHover) ||
    (event.type === eventTypes.click && props.isClick)
  ) {
    observer.unobserve(popup.value);
    isTooltipOpen.value = false;
    document.getElementById("app").removeEventListener("scroll", () => {
      updatePosition();
    });
  }
};
</script>

<style scoped lang="scss">
.tooltip {
  display: flex;

  &-content {
    position: absolute;
    display: flex;
    padding: 10px;
    border-radius: 8px;
    background: black;
    color: white;
    content-visibility: auto;
  }
}
</style>
