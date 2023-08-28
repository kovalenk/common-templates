<template lang="pug">
.text-field(:class="{ error: validation, disabled: isDisabled }")
  label.text-field--label
    slot(:name="'label'")
  .text-field--input(ref="commonTextField")
    slot(:name="'before'")
    slot(:name="'main'")
    slot(:name="'after'")
  .text-field--error(v-if="useError")
    slot(:name="'error'")
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useClickOutside } from "@/composables/clickOutside";
const props = defineProps({
  useError: {
    type: Boolean,
    default: false,
  },
  validation: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const commonTextField = ref(undefined as HTMLElement | undefined);
</script>

<style scoped lang="scss">
.text-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
  max-width: 280px;
  &.disabled {
    .text-field--input {
      cursor: not-allowed;
      border-radius: 8px;
      border: 1px solid var(--grey-grey-line, #ecebeb);
      background: var(--grey-grey-background, #f7f7f7);
      &::v-deep(input) {
        cursor: not-allowed;
      }
    }
  }
  &--label {
    color: var(--gray-2, #4f4f4f);
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  &--input {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 14px 16px;
    height: 24px;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    border-radius: 8px;
    border: 1px solid var(--grey-grey-line, #ecebeb);
    background: var(--grey-white, #fff);
    &::v-deep(input) {
      width: 100%;
      color: var(--grey-black, #3d3734);
      background: inherit;
      input::placeholder {
        color: var(--gray-4, #bdbdbd);
      }
    }
    &:hover {
      border: 1px solid var(--primary-primary, #f98347);
    }
  }
  &--error {
    color: var(--red-red, #ed2424);
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    min-height: 20px;
    &::v-deep(p) {
      margin: 0;
    }
  }
  &.error {
    .text-field {
      &--input {
        border: 1px solid var(--red-red, #ed2424);
      }
    }
  }
}
</style>
