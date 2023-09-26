<template lang="pug">
.custom-checkbox
  input(
    type="checkbox",
    :checked="isChecked",
    @change="$emit('update:check', !isChecked)"
  )
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  isChecked: Boolean,
});
const emit = defineEmits(["update:check"]);
</script>

<style lang="scss" scoped>
.custom-checkbox {
  display: flex;
  align-items: center;
}
input[type="checkbox"] {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 0;
  margin: 0 0.6em 0 0;
  outline: 0;
  padding: 0 !important;
  vertical-align: text-top;
  height: 20px;
  width: 20px;
  -webkit-appearance: none;
  border-radius: 6px;
  border: 1.5px solid var(--default-c-1);
  background: transparent;
}

input[type="checkbox"]:checked {
  opacity: 1;
  background: var(--default-c-1);
  &:before {
    display: block;
    content: "";
    margin: auto;
    mask: url("@/assets/check-icon.svg");
    mask-size: contain;
    mask-repeat: no-repeat;
    background: var(--white);
    width: 12px;
    height: 12px;
  }
}
</style>
