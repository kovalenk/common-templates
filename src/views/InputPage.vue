<script setup lang="ts">
import CInput from "@/components/CInput.vue";
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";

const form = reactive({
  input: "test",
});
const rules = {
  input: {
    required: helpers.withMessage("required rule", required),
    minLength: helpers.withMessage("minLength rule 4", minLength(4)),
    maxLength: helpers.withMessage("maxLength rule 10", maxLength(10)),
  },
};

const $v = useVuelidate(rules, form, { $lazy: true, $autoDirty: true });
</script>

<template lang="pug">
.wrapper
  c-input.mw-400(
    :is-error="$v.input.$invalid",
    :value="form.input",
    @input="form.input = $event",
    name="Label",
    placeholder="Placeholder",
    :is-suffix="false",
    :is-prefix="true"
  )
    template(v-slot:label)
      | Label
    template(v-slot:errors)
      | {{ $v.input.$errors.length ? $v.input.$errors[0] : "" }}
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
  .mw-400 {
    display: flex;
    max-width: 400px;
  }
}
</style>
