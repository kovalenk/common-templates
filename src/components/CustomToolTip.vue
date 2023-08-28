<script setup lang="ts">
import {
  computed,
  ref,
  defineProps,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";

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

const customStyles = computed(() => {
  const element = document.getElementsByTagName(props.parentTagName)[0]
    ? document.getElementsByTagName(props.parentTagName)[0]
    : document.getElementById(props.parentTagName);
  let parent: any = element ? element : "";
  if (
    refToolTip.value &&
    refToolTip.value!.classList &&
    userContent.value &&
    parent &&
    parent.clientWidth
  ) {
    let name = "";
    refToolTip.value!.classList.forEach((el: any) => {
      if (Object.values(positions).includes(el)) {
        return (name = el);
      }
    });
    if (name) {
      let [key1, key2] = name.split("-");
      const positionsObject = { [key1]: 0, [key2]: 0 };
      switch (key1) {
        case coord.Top: {
          if (
            refToolTip.value.offsetTop - headerHeight >=
            userContent.value.clientHeight + 15
          ) {
            positionsObject[key1] =
              refToolTip.value.offsetTop - userContent.value.clientHeight - 15;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${coord.Bottom}-${key2}`;
          } else {
            positionsObject[key1] =
              refToolTip.value.offsetTop + refToolTip.value.clientHeight + 15;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${key1}-${key2}`;
          }
          break;
        }
        case coord.Bottom: {
          if (
            parent.clientHeight -
              (refToolTip.value.offsetTop + refToolTip.value.clientHeight) >=
            userContent.value.clientHeight + 15
          ) {
            key1 = coord.Top;
            positionsObject[key1] =
              refToolTip.value.offsetTop + refToolTip.value.clientHeight + 15;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${key1}-${key2}`;
          } else {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${key1}-${key2}`;
            key1 = coord.Top;
            positionsObject[key1] =
              refToolTip.value.offsetTop -
              (15 + userContent.value.clientHeight);
          }
          break;
        }
        case coord.Left: {
          if (
            refToolTip.value.offsetLeft >=
            userContent.value.clientWidth + 15
          ) {
            positionsObject[key1] =
              refToolTip.value.offsetLeft - userContent.value.clientWidth - 15;
          } else if (
            parent.clientWidth >=
              parent.clientWidth -
                (refToolTip.value.offsetLeft +
                  userContent.value.clientWidth +
                  15) &&
            parent.clientWidth >=
              refToolTip.value.offsetLeft +
                refToolTip.value.clientWidth +
                userContent.value.clientWidth +
                15
          ) {
            positionsObject[key1] =
              refToolTip.value.offsetLeft + refToolTip.value.clientWidth + 15;
            key1 = coord.Right;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${key1}-${key2}`;
          } else {
            key1 = coord.Top;
            key2 = coord.Right;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${key1}-${key2}`;
            if (
              refToolTip.value.offsetTop - headerHeight >=
              userContent.value.clientHeight + 15
            ) {
              positionsObject[key1] =
                refToolTip.value.offsetTop -
                userContent.value.clientHeight -
                15;
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              arrowPosition.value = `${coord.Bottom}-${key2}`;
            } else {
              positionsObject[key1] =
                refToolTip.value.offsetTop + refToolTip.value.clientHeight + 15;
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              arrowPosition.value = `${key1}-${key2}`;
            }
            positionsObject[key2] = refToolTip.value.offsetLeft;
          }
          break;
        }
        case coord.Right: {
          if (
            refToolTip.value.offsetLeft >=
            userContent.value.clientWidth + 15
          ) {
            positionsObject[key1] =
              refToolTip.value.offsetLeft - userContent.value.clientWidth - 15;
          } else if (
            parent.clientWidth >=
              parent.clientWidth -
                (refToolTip.value.offsetLeft +
                  userContent.value.clientWidth +
                  15) &&
            parent.clientWidth >=
              refToolTip.value.offsetLeft +
                refToolTip.value.clientWidth +
                userContent.value.clientWidth +
                15
          ) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${coord.Right}-${key2}`;
            positionsObject[coord.Left] =
              refToolTip.value.offsetLeft + refToolTip.value.clientWidth + 15;
          } else {
            key1 = coord.Top;
            key2 = coord.Right;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${key1}-${key2}`;
            if (
              refToolTip.value.offsetTop - headerHeight >=
              userContent.value.clientHeight + 15
            ) {
              positionsObject[key1] =
                refToolTip.value.offsetTop -
                userContent.value.clientHeight -
                15;
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              arrowPosition.value = `${coord.Bottom}-${key2}`;
            } else {
              positionsObject[key1] =
                refToolTip.value.offsetTop + refToolTip.value.clientHeight + 15;
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              arrowPosition.value = `${key1}-${key2}`;
            }
            positionsObject[key2] = refToolTip.value.offsetLeft;
          }
          break;
        }
      }
      switch (key2) {
        case coord.Left: {
          positionsObject[key2] = refToolTip.value.offsetLeft;
          break;
        }
        case coord.Top: {
          const tenPercent = (userContent.value.clientHeight / 100) * 10;
          if (
            refToolTip.value.offsetTop - headerHeight >= tenPercent &&
            parent.clientHeight >=
              refToolTip.value.offsetTop +
                (userContent.value.clientHeight - tenPercent) +
                refToolTip.value.clientHeight
          ) {
            positionsObject[key2] = refToolTip.value.offsetTop - tenPercent;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${key1}-${key2}`;
            key1 = coord.Left;
          } else {
            positionsObject[key2] =
              refToolTip.value.offsetTop -
              (userContent.value.clientHeight -
                tenPercent -
                refToolTip.value.clientHeight);
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            arrowPosition.value = `${key1}-${coord.Bottom}`;
            key1 = coord.Left;
          }
          break;
        }
        case coord.Center: {
          if (key1 !== coord.Left && key1 !== coord.Right) {
            key2 = coord.Left;
            positionsObject[coord.Left] =
              refToolTip.value.offsetLeft +
              (refToolTip.value.clientWidth - userContent.value.clientWidth) /
                2;
          } else {
            const tenPercent = (userContent.value.clientHeight / 100) * 10;
            const fifteenPercent = (userContent.value.clientHeight / 100) * 50;
            if (
              refToolTip.value.offsetTop - headerHeight >= fifteenPercent &&
              parent.clientHeight >=
                refToolTip.value.offsetTop +
                  (userContent.value.clientHeight - fifteenPercent) +
                  refToolTip.value.clientHeight
            ) {
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              arrowPosition.value = `${key1}-${key2}`;
              key2 = coord.Top;
              positionsObject[key2] =
                refToolTip.value.offsetTop - fifteenPercent;
            } else if (
              parent.clientHeight <=
              refToolTip.value.offsetTop +
                (userContent.value.clientHeight - fifteenPercent) +
                refToolTip.value.clientHeight
            ) {
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              arrowPosition.value = `${key1}-${coord.Bottom}`;
              key2 = coord.Top;
              positionsObject[key2] =
                refToolTip.value.offsetTop -
                (userContent.value.clientHeight -
                  tenPercent -
                  refToolTip.value.clientHeight);
            } else if (
              refToolTip.value.offsetTop - headerHeight <=
              fifteenPercent
            ) {
              key2 = coord.Top;
              positionsObject[key2] = refToolTip.value.offsetTop - tenPercent;
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              arrowPosition.value = `${key1}-${key2}`;
            }
            break;
          }
          break;
        }
        case coord.Right: {
          key2 = coord.Left;
          positionsObject[coord.Left] =
            refToolTip.value.offsetLeft +
            refToolTip.value.clientWidth -
            userContent.value.clientWidth;
          break;
        }
      }
      return `
            ${key1}: ${positionsObject[key1]}px;
            ${key2}: ${positionsObject[key2]}px;
            visibility: ${isShowed.value ? "visible" : "hidden"};
            width: ${props.width - 32}px;
          `;
    }
  }
  return `width: ${props.width}px`;
});

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
  &--info {
    display: flex;
    z-index: 99999;
    position: absolute;
    border-radius: 8px;
    padding: 11px 16px;
    background: var(--grey-white, #fff);
    box-shadow: 0px 4px 32px 0px rgba(61, 55, 52, 0.08),
      0px 4px 8px 0px rgba(61, 55, 52, 0.08),
      0px 0px 2px 0px rgba(61, 55, 52, 0.16);

    &-arrow {
      width: 50px;
      height: 25px;
      position: absolute;
      overflow: hidden;

      &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        background: white;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
        top: 0;
        left: 50%;
        box-shadow: 0px 4px 32px 0px rgba(61, 55, 52, 0.08),
          0px 4px 8px 0px rgba(61, 55, 52, 0.08),
          0px 0px 2px 0px rgba(61, 55, 52, 0.16);
      }
    }
  }
}
</style>
