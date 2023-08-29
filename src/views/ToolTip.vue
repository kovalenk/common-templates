<template lang="pug">
.content
  p(
    v-for="item in items",
    :key="item",
    v-tooltip="{ content: item, scrollClassName: '.right-content', useClick: true }"
  ) {{ item }}
</template>

<script>
import TooltipDirective from "@/directives/v-tooltip";

export default {
  directives: {
    tooltip: TooltipDirective,
  },
  data() {
    return {
      items: Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`),
    };
  },
};
</script>

<style scoped>
.content {
  height: 200vh;
}
p {
  width: max-content;
}
</style>
