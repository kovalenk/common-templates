<template lang="pug">
.main
  .main-header
    .main-header--logo COMMON COMPONENTS
    .main-header--menu
      RouterLink(to="/") ToolTip
      RouterLink(to="/dropdown") DropDown
      RouterLink(to="/modal") Modal
      RouterLink(to="/text-field") TextField
  .main-content
    router-view
</template>

<style lang="scss">
.main {
  &-header {
    display: flex;
    align-items: center;
    gap: 40px;
    padding: 20px 15px;
    background: #c3c3c3;
    &--logo {
      font-size: 20px;
      font-weight: 500;
    }
    &--menu {
      display: flex;
      gap: 20px;
      a {
        color: black;
        text-decoration: initial;
        &.router-link-active {
          color: blue;
          text-decoration: underline;
        }
      }
    }
  }
  &-content {
    padding: 30px 40px;
    min-height: calc(100vh - 123px);
  }
}
</style>
<script setup lang="ts"></script>
