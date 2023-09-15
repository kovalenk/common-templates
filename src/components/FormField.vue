<template lang="pug">
.form-group(:class="getValidationClass($v, propName)")
  label {{ label }}
  .block(:class="[form[propName] ? 'filled-input' : '']")
    slot(name="logo")
      input(
        :class="[isLogo ? 'logo' : '', isDate ? 'date' : '']",
        v-model="form[propName]",
        :type="typePlaceholder",
        @blur="$v[propName].$touch()",
        :placeholder="form[propName] || placeholder",
        autocomplete="off"
      )
    slot(name="password")
    slot(name="dropdown")
    slot(name="search")
  span(v-if="$v[propName].required.$invalid") This field is required.
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Ref, computed, ref, defineProps, onMounted } from "vue";
import { getValidationClass, checkValidation } from "@/types/authValidation";

const props = defineProps({
  propName: String,
  placeholder: String,
  typePlaceholder: String,
  isLogo: Boolean,
  label: String,
});

interface TestData {
  name: string;
}

const defaultState: TestData = {
  name: "",
};

const form = ref<TestData>({
  ...defaultState,
});

const rules = computed(() => {
  const rules: any = {
    name: { required },
  };
  return rules;
});

const $v = useVuelidate(rules, form);
</script>
<style lang="scss">
.form-group {
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  width: 280px;
  label {
    margin-bottom: 8px;
  }
  input {
    width: 246px;
    height: 22px;
    padding: 14px 16px 14px 16px;
    border-radius: 8px;
    border: 1px solid #ecebeb;
    gap: 8px;
    outline: none;
    color: #3d3734;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;

    &::placeholder {
      font-family: var(--font-inter);
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
    }
    &:hover {
      border-color: #f98347;
    }
    &:active {
      border-color: #f98347;
    }
  }
  input.logo {
    &::placeholder {
      padding: 0px;
    }
    padding: 14px 0 14px 40px;
    &.filled-input {
      background: #f98347;
    }
  }
  .block {
    position: relative;
    &.filled-input {
      input {
        background: #f7f7f7;
      }
      i.logo::before {
        background-color: #f98347;
      }
    }
  }
  &.error {
    input {
      border: 1px solid red;
    }
    span {
      color: red;
      margin-top: 8px;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  }
}
input[type="date"]::-webkit-calendar-picker-indicator {
  content: "";
  display: block;
  background: url("../assets/calendar.svg");
  width: 16px;
  height: 16px;
  position: absolute;
  right: 16px;
  top: 14px;
}
</style>
