<script setup lang="ts">
import { ref, defineProps, computed, watch } from "vue";
import vTooltip from "../directives/v-tooltip";
import { Positions } from "../constants/positions";

const props = defineProps({
  isClick: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: Positions.TopLeft,
  },
});

const refToolTip = ref(null);
const params = computed(() => {
  return {
    tooltip: refToolTip.value,
    scrollClassName: "body",
    useClick: props.isClick,
    positionClass: props.position,
  };
});

watch(
  () => props,
  () => {
    const prevRef = { ...refToolTip };
    refToolTip.value = null;
    refToolTip.value = prevRef.value;
  },
  { deep: true }
);
</script>

<template>
  <div class="tooltip">
    <div class="tooltip--hover-item" v-if="refToolTip" v-tooltip="params">
      <i class="icon icon-search"></i>
    </div>
    <teleport :to="'body'">
      <transition name="fade">
        <div class="custom-tooltip" ref="refToolTip">
          <div :class="['custom-tooltip--arrow', params.positionClass]"></div>
          <div class="content">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style lang="scss">
@import "src/scss/common/tooltip";
.tooltip {
  display: flex;
  justify-content: center;
  &--hover-item {
    display: flex;
    width: max-content;
    i.icon {
      display: flex;
      width: 16px;
      height: 16px;
      margin-left: 5px;
      background-color: #b1afae;
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      &.icon-search {
        background: url("../stories/assets/Info.svg");
      }
    }
  }
}
</style>
