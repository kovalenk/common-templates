<template lang="pug">
.text-field(
  :class="{ error: validation, disabled: isDisabled, active: useDropDown && isOpenDropDown, dropDown: useDropDown }",
  ref="commonTextField"
)
  label.text-field--label
    slot(:name="'label'")
  .text-field--input(@click="actionDropDown()")
    slot(:name="'before'")
    slot(:name="'main'")
    slot(:name="'after'")
    .text-field--input-arrow(v-if="useDropDown")
  template(v-if="useDropDown")
    teleport(:to="'body'")
      .text-field--drop-down(:style="dropDownStyles")
        slot(:name="'dropdown'")
  .text-field--error(v-if="useError")
    slot(:name="'error'")
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
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
  useDropDown: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const commonTextField = ref(undefined as HTMLElement | undefined);

const isOpenDropDown = ref(false);

const actionDropDown = () => {
  if (props.useDropDown && !props.isDisabled) {
    isOpenDropDown.value = !isOpenDropDown.value;
  }
};

const dropDownStyles = computed(() => {
  let styles = {
    visibility: !isOpenDropDown.value ? "hidden" : "inherit",
    top: "",
    left: "",
    "min-width": "",
  };
  if (commonTextField.value) {
    styles.top = `${
      commonTextField.value!.offsetTop + commonTextField.value!.offsetHeight
    }px`;
    styles.left = `${commonTextField.value!.offsetLeft}px`;
    styles["min-width"] = `${commonTextField.value!.offsetWidth}px`;
  }
  return styles;
});

useClickOutside(commonTextField, () => {
  if (isOpenDropDown.value) {
    actionDropDown();
  }
});
</script>

<style scoped lang="scss">
.text-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
  max-width: 280px;
  &.dropDown {
    cursor: pointer;
  }
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
    &-arrow {
      height: 16px;
      width: 16px;
      mask: url("@/assets/arrow-down.svg") no-repeat;
      mask-size: contain;
      mask-position: center;
      background: #4f4f4f;

      transition: all 0.3s;
    }
    &:hover {
      border: 1px solid var(--primary-primary, #f98347);
    }
  }
  &.active {
    .text-field--input-arrow {
      transform: rotate(180deg);
    }
  }
  &--drop-down {
    position: absolute;
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
