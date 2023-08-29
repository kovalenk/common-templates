<script setup lang="ts">
import CInput from "@/components/CInput.vue";
import { ref } from "vue";

const input = ref("");
</script>

<template lang="pug">
.wrapper
  c-input.mw-400(
    :is-error="true",
    :value="input",
    @input="input = $event",
    name="Label",
    placeholder="Placeholder",
    :is-suffix="false",
    :is-prefix="true"
  )
    template(v-slot:errors)
      | asdasdasd
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
