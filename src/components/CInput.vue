<template lang="pug">
.custom--input(:class="{ error: isError, disabled: isDisabled }")
  label(:for="id")
    span.custom--input--name {{ name }}
  .custom--input--field(:class="{ prefix: isPrefix, suffix: isSuffix }")
    .prefix(v-if="isPrefix")
      slot(name="prefix")
    input(
      :id="id",
      :placeholder="placeholder",
      :name="name",
      :disabled="isDisabled",
      v-model="input"
    )
    .suffix(v-if="isSuffix")
      slot(name="suffix")
  .custom--input--errors(v-if="isError")
    slot(name="errors")
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, watch } from "vue";
import { uuid } from "vue-uuid";

const id = ref(uuid.v4());

const emit = defineEmits<{
  (e: "input", value: string | number): void;
}>();

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
  name: {
    type: String,
    default: () => "",
  },
  placeholder: {
    type: String,
    default: () => "",
  },
  value: {
    default: () => "",
    required: true,
  },
});

const input = ref("");

watch(input, () => {
  emit("input", input.value);
});
</script>

<style scoped lang="scss">
.custom--input {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;

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
    position: relative;
    box-sizing: border-box;
    min-height: 52px;
    height: 52px;
    width: 100%;

    overflow: hidden;

    &.suffix {
      input {
        padding-right: 42px;
      }
    }
    &.prefix {
      input {
        padding-left: 42px;
      }
    }

    .suffix,
    .prefix {
      position: absolute;
      width: 16px;
      height: 16px;
      min-height: 16px;
      min-width: 16px;
      background: black;
      top: 50%;
      transform: translateY(-50%);
    }
    .prefix {
      left: 18px;
    }
    .suffix {
      right: 18px;
    }

    input {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0 16px;

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
  &.error {
    .custom--input--field {
      input {
        border-color: var(--red);
      }

      &:focus,
      &:active,
      &:hover {
        outline: none;
        border: var(--red);
      }
    }
    .custom--input--errors {
      color: var(--red);
    }
  }
}
</style>
