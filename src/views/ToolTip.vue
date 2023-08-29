<template lang="pug">
#table-section.table-section
  .table-item(v-for="item in items")
    label.label-inter {{ item.label }}
    .table-item--content
      i.icon.icon-search(
        v-tooltip="{ content: text, scrollClassName: '.right-content', useClick: true, positionClass: item.class }"
      )
</template>

<script setup lang="ts">
const text =
  " In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.";
const items = [
  {
    label: "Top, Left",
    class: "top-left",
  },
  {
    label: "Top, Center",
    class: "top-center",
  },
  {
    label: "Top, Right",
    class: "top-right",
  },
  {
    label: "Bottom, Left",
    class: "bottom-left",
  },
  {
    label: "Bottom, Center",
    class: "bottom-center",
  },
  {
    label: "Bottom, Right",
    class: "bottom-right",
  },
  {
    label: "Left, Bottom",
    class: "left-bottom",
  },
  {
    label: "Left, Center",
    class: "left-center",
  },
  {
    label: "Left, Top",
    class: "left-top",
  },
  {
    label: "Right, Bottom",
    class: "right-bottom",
  },
  {
    label: "Right, Center",
    class: "right-center",
  },
  {
    label: "Right, Top",
    class: "right-top",
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
