<template lang="pug">
label.custom--input(:class="{ error: isError, disabled: isDisabled }")
  span.custom--input--name Heading
  .custom--input--field(:class="{ prefix: isPrefix, suffix: isSuffix }")
    slot(name="prefix")
    input(placeholder="Placeholder", :disabled="isDisabled")
    slot(name="suffix")
  .custom--input--errors(v-if="isError")
    slot(name="errors")
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  isError: {
    type: Boolean,
    default: () => false,
  },
  isPrefix: {
    type: Boolean,
    default: () => false,
  },
  isSuffix: {
    type: Boolean,
    default: () => false,
  },
  isDisabled: {
    type: Boolean,
    default: () => false,
  },
});
</script>

<style scoped lang="scss">
.custom--input {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;

  font-family: inherit;
  background: transparent;

  &--name {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--gray2);
    margin: 0;
    padding: 0;
  }
  &--field {
    box-sizing: border-box;
    min-height: 52px;
    height: 52px;
    width: 100%;

    overflow: hidden;

    input {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0;

      border: var(--input-border-default);
      border-radius: 8px;
      background: white;

      color: var(--gray-black);

      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;

      &:focus,
      &:active,
      &:hover {
        outline: none;
        border: var(--input-border-active);
      }

      &::placeholder {
        color: var(--gray4);
      }
    }
  }
  &.disabled {
    .custom--input--field {
      input {
        color: var(--gray-content);
        background: var(--gray-background);
        pointer-events: none;

        &:focus,
        &:active,
        &:hover {
          outline: none;
          border: var(--input-border-default);
        }
      }
    }
  }
}
</style>
