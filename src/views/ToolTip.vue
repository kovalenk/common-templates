<template lang="pug">
#table-section.table-section
  .table-item(v-for="item in items")
    label.label-inter {{ item.label }}
    custom-tool-tip(
      :position="item.class",
      :scroll-class-name="'.right-content'",
      :is-click="true"
    )
      template(v-slot:item="")
        i.icon.icon-search
      template(v-slot:content="")
        | {{ text }}
</template>

<script setup lang="ts">
import CustomToolTip from "@/components/CustomToolTip.vue";
import { Positions } from "@/constants/positions";

const text =
  " In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.";
const items = [
  {
    label: "Top, Left",
    class: Positions.TopLeft,
  },
  {
    label: "Top, Center",
    class: Positions.TopCenter,
  },
  {
    label: "Top, Right",
    class: Positions.TopRight,
  },
  {
    label: "Bottom, Left",
    class: Positions.BottomLeft,
  },
  {
    label: "Bottom, Center",
    class: Positions.BottomCenter,
  },
  {
    label: "Bottom, Right",
    class: Positions.BottomRight,
  },
  {
    label: "Left, Bottom",
    class: Positions.LeftBottom,
  },
  {
    label: "Left, Center",
    class: Positions.LeftCenter,
  },
  {
    label: "Left, Top",
    class: Positions.LeftTop,
  },
  {
    label: "Right, Bottom",
    class: Positions.RightBottom,
  },
  {
    label: "Right, Center",
    class: Positions.RightCenter,
  },
  {
    label: "Right, Top",
    class: Positions.RightTop,
  },
];
</script>

<style scoped lang="scss">
.table {
  &-section {
    margin: 100px 0;
    display: flex;
    flex-wrap: wrap;

    padding: 30px 0;
  }

  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc((100% - 40px) / 3);
    padding: 100px 0;
    &--name {
      font-size: 18px;
      color: black;
      white-space: wrap;
    }
    &--content {
      display: flex;
      align-items: center;
    }
  }
}
</style>
