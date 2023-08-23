<template lang="pug">
form.inputs
  .content
    c-input(
      :is-disabled="false",
      :name="'Name'",
      :placeholder="'Type Name'",
      :value="form.name",
      :is-prefix="true",
      :is-suffix="true",
      @input="form.name = $event",
      :is-error="$v.name.$invalid"
    )
      template(v-slot:errors)
        span {{ $v.name.$errors[0] ? $v.name.$errors[0].$message : "" }}
    c-input(
      :is-disabled="false",
      :name="'Email'",
      :placeholder="'Type Email'",
      :value="form.email",
      :is-prefix="true",
      :is-suffix="true",
      @input="form.email = $event",
      :is-error="$v.email.$invalid"
    )
      template(v-slot:errors)
        span {{ $v.email.$errors[0] ? $v.email.$errors[0].$message : "" }}
    c-input(
      :is-disabled="false",
      :name="'Password'",
      :placeholder="'Type Password'",
      :value="form.password",
      :is-prefix="true",
      :is-suffix="true",
      @input="form.password = $event",
      :is-error="$v.password.$invalid"
    )
      template(v-slot:errors)
        span {{ $v.password.$errors[0] ? $v.password.$errors[0].$message : "" }}
    c-input(
      :is-disabled="form.password.length === 0",
      :name="'Repeat Password'",
      :placeholder="'Type Password'",
      :value="form.r_password",
      :is-prefix="true",
      :is-suffix="true",
      @input="form.r_password = $event",
      :is-error="$v.r_password.$invalid"
    )
      template(v-slot:errors)
        span {{ $v.r_password.$errors[0] ? $v.r_password.$errors[0].$message : "" }}
</template>

<script lang="ts" setup>
import CInput from "@/components/CInput.vue";
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

const form = reactive({
  name: "",
  email: "",
  password: "",
  r_password: "",
});

const rules = {
  name: {
    required,
  },
  email: {
    required,
    email,
  },
  password: {
    minLength: minLength(3),
  },
  r_password: {
    notSame: helpers.withMessage(
      "invalid",
      () => form.password === form.r_password
    ),
  },
};

const $v = useVuelidate(rules, form, { $lazy: true, $autoDirty: true });
</script>

<style scoped lang="scss">
.inputs {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;

  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 400px;
    align-items: center;
  }
}
</style>
