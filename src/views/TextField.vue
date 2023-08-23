<script setup lang="ts">
import CustomTextField from "@/components/CustomTextField.vue";
import { computed, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import CustomCheckbox from "@/components/CustomCheckbox.vue";

const rules = computed(() => {
  return {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      required,
      email,
    },
  };
});

const items = [
  "test 1",
  "test 2",
  "test 3",
  "test 4",
  "test 5",
  "test 6",
  "test 7",
  "test 8",
];

const validationData = ref({
  firstName: "",
  lastName: "",
  email: "",
  checked: "",
  selectedItem: items[0],
});

const $v = useVuelidate(rules, validationData.value, {
  $lazy: true,
  $autoDirty: true,
});

console.log($v.value);
</script>

<template lang="pug">
.form
  CustomTextField(
    :use-error="true",
    :validation="$v.firstName.required.$invalid"
  )
    template(v-slot:label="") First name
    template(v-slot:before="")
      .test-color
    template(v-slot:main="")
      input(v-model="validationData.firstName", :placeholder="'Placeholder'")
    template(v-slot:error="")
      p(v-if="$v.firstName.required.$invalid") Field is required
  CustomTextField(
    :use-error="true",
    :validation="$v.lastName.required.$invalid"
  )
    template(v-slot:label="") Last name
    template(v-slot:before="")
      .test-color
    template(v-slot:main="")
      input(v-model="validationData.lastName", :placeholder="'Placeholder'")
    template(v-slot:error="")
      p(v-if="$v.lastName.required.$invalid") Field is required
  CustomTextField(
    :use-error="true",
    :validation="$v.email.required.$invalid || $v.email.email.$invalid",
    :is-disabled="true"
  )
    template(v-slot:label="") Email
    template(v-slot:before="")
      .test-color
    template(v-slot:main="")
      input(
        v-model="validationData.email",
        :placeholder="'Placeholder'",
        disabled="true"
      )
    template(v-slot:error="")
      p(v-if="$v.email.required.$invalid") Field is required
      p(v-else-if="$v.email.email.$invalid") Invalid email
  CustomTextField(:use-drop-down="true")
    template(v-slot:label="") DropDown
    template(v-slot:before="")
      custom-checkbox(@update:check="validationData.checked = $event")
    template(v-slot:main="")
      .selected-item {{ validationData.selectedItem }}
    template(v-slot:dropdown="")
      .drop-down
        .drop-down--table
          .drop-down--table-scroll
            .drop-down--item(
              v-for="item in items",
              @click="validationData.selectedItem = item"
            ) {{ item }}
</template>

<style scoped lang="scss">
.form {
  height: 100%;
  .text-field {
    .test-color {
      min-width: 16px;
      height: 16px;
      border-radius: 3px;
      background: var(--gray-2, #4f4f4f);
    }
    .selected-item {
      width: 100%;
    }
    &::v-global(.drop-down) {
      padding-top: 10px;
    }
    &::v-global(.drop-down--table) {
      padding: 14px 0;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--grey-grey-line, #ecebeb);
      background: var(--grey-white, #fff);
    }
    &::v-global(.drop-down--table-scroll) {
      height: 119px;
      overflow: scroll;
    }
    &::v-global(.drop-down--item) {
      cursor: pointer;
      padding: 14px 16px;
      border-bottom: 1px solid var(--grey-grey-line, #ecebeb);
      font-family: "Inter", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  }
}
</style>
