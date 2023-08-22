<template lang="pug">
.input
  c-input(
    :is-disabled="false",
    :name="'name'",
    :placeholder="'Placeholder'",
    v-for="item in 20",
    :key="item",
    :is-prefix="true",
    :is-suffix="true"
  )
</template>

<script lang="ts" setup>
import CInput from "@/components/CInput.vue";
</script>

<style scoped lang="scss">
.input {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
}
</style>
