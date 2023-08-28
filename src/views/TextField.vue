<script setup lang="ts">
import CustomTextField from "@/components/CustomTextField.vue";
import { computed, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

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

const validationData = ref({
  firstName: "",
  lastName: "",
  email: "",
  checked: "",
});

const $v = useVuelidate(rules, validationData.value, {
  $lazy: true,
  $autoDirty: true,
});
</script>

<template lang="pug">
.main-page
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
</template>

<style scoped lang="scss">
.main-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 50px 40px;
    background: var(--white);
    border-radius: 12px;
    box-shadow: 0px 4px 32px 0px rgba(61, 55, 52, 0.08),
      0px 4px 8px 0px rgba(61, 55, 52, 0.08),
      0px 0px 2px 0px rgba(61, 55, 52, 0.16);
  }
  .text-field {
    .test-color {
      min-width: 16px;
      height: 16px;
      border-radius: 3px;
      background: var(--gray-2, #4f4f4f);
    }
  }
}
</style>
