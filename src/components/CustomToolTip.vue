<script setup lang="ts">
import { ref, defineProps, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  width: {
    type: Number,
    default: 300,
  },
  parentTagName: {
    type: String,
    default: "body",
  },
  isClick: {
    type: Boolean,
    default: false,
  },
});

const refToolTip: any = ref(null);
const userContent: any = ref(null);

const headerHeight = 63;
enum positions {
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  LeftTop = "left-top",
  LeftCenter = "left-center",
  LeftBottom = "left-bottom",
  RightTop = "right-top",
  RightCenter = "right-center",
  RightBottom = "right-bottom",
}

enum coord {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
  Center = "center",
}

enum events {
  click = "click",
  mouseover = "mouseover",
  mouseleave = "mouseleave",
}

const arrowPosition = ref("");

const observer = new IntersectionObserver(
  function (entries) {
    if (!entries[0].isIntersecting) close();
  },
  { threshold: [0] }
);
onMounted(() => {
  observer.observe(refToolTip.value);
});
onBeforeUnmount(() => {
  observer.unobserve(refToolTip.value);
});
const isShowed = ref(false);

const openPopup = (event: MouseEvent) => {
  if (
    (props.isClick && event.type === events.click) ||
    (!props.isClick && event.type === events.mouseover)
  ) {
    if (isShowed.value === true && props.isClick) {
      close();
    } else {
      open();
    }
  }
};
const closePopup = (event: MouseEvent) => {
  if (
    (props.isClick && event.type === events.click) ||
    (!props.isClick && event.type === events.mouseleave)
  ) {
    close();
  }
};
const open = () => {
  isShowed.value = true;
};
const close = () => {
  isShowed.value = false;
};
</script>

<template lang="pug">
.tooltip(ref="refToolTip")
  .tooltip--hover-item(
    @click="openPopup($event)",
    @mouseover="openPopup($event)",
    @mouseleave="closePopup($event)"
  )
    slot(name="item")
  teleport(:to="parentTagName")
    transition(name="fade")
    .tooltip--info(
      ref="userContent",
      :style="customStyles",
      @mouseleave="closePopup($event)"
    )
      .tooltip--info-arrow(
        @mouseover="openPopup($event)",
        :class="arrowPosition"
      )
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
