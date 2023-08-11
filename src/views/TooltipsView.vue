<template lang="pug">
.main
  .header 
  .sidebar
  .block 
    .content
      h1 Tooltip
      tooltips-component
        template(v-slot:action) Up, Left
        template(v-slot:content) 
          .tooltip.up-left-block.up-left Up, Left
      tooltips-component
        template(#action) Up, Center
        template(v-slot:content) 
          .tooltip.up-center-block.up-center Up, Center
      tooltips-component
        template(v-slot:action) Up, Right
        template(v-slot:content) 
          .tooltip.up-right.up-right-block Up, Right
      tooltips-component
        template(v-slot:action) Center, Right
        template(v-slot:content) 
          .tooltip.center-right.center-right-block Center, Right
      tooltips-component
        template(v-slot:action) Center, Left
        template(v-slot:content) 
          .tooltip.center-left.center-left-block Center, Left
      tooltips-component
        template(v-slot:action) Down, Left
        template(v-slot:content) 
          .tooltip.down-left.down-left-block Down, Left
      tooltips-component
        template(v-slot:action) Down, Center
        template(v-slot:content) 
          .tooltip.down-center.down-center-block Down, Center
      tooltips-component
        template(v-slot:action) Down, Right
        template(v-slot:content) 
          .tooltip.down-right.down-right-block Down, Right
</template>

<script setup lang="ts">
import { ref } from "vue";
import TooltipsComponent from "../components/TooltipsComponent.vue";
const visibility = ref(false);
</script>
<style lang="scss">
.main {
  display: flex;
  flex-wrap: wrap;
  .header {
    background: red;
    height: 30px;
    width: 100%;
  }
  .sidebar {
    width: 30%;
    background: blue;
  }
}

.block {
  width: 70%;
  height: 100%;
  overflow-y: auto;
  p {
    margin: 80px 20px;
    cursor: pointer;
    font-family: "Inter", sans-serif;
    font-weight: 400;
  }
  .content {
    height: 200vh;
    h1 {
      font-family: "Inter", sans-serif;
      font-weight: 400;
    }
  }
}
.up-left-block {
  position: absolute;
  transform: translate3d(370px, 210px, 0px);
  top: 0px;
  left: 0px;
}
.up-center-block {
  position: absolute;
  transform: translate3d(340px, 290px, 0px);
  top: 0px;
  left: 0px;
}
.up-right-block {
  position: absolute;
  transform: translate3d(280px, 390px, 0px);
  top: 0px;
  left: 0px;
}
.center-right-block {
  position: absolute;
  transform: translate3d(200px, 450px, 0px);
  top: 0px;
  left: 0px;
}
.center-left-block {
  position: absolute;
  transform: translate3d(475px, 545px, 0px);
  top: 0px;
  left: 0px;
}
.down-left-block {
  position: absolute;
  transform: translate3d(370px, 600px, 0px);
  top: 0px;
  left: 0px;
}
.down-center-block {
  position: absolute;
  transform: translate3d(350px, 690px, 0px);
  top: 0px;
  left: 0px;
}
.down-right-block {
  position: absolute;
  transform: translate3d(300px, 790px, 0px);
  top: 0px;
  left: 0px;
}

.up-left::before {
  top: -7px;
  left: 16px;
}
.up-center::before {
  top: -7px;
  left: 50%;
  transform: translateX(-50%);
}
.up-right::before {
  top: -7px;
  left: calc(100% - 20px);
}
.center-right::before {
  transform: rotate(90deg);
  top: 40%;
  left: calc(100%);
}
.center-left::before {
  top: 40%;
  left: calc(-3%);
  transform: rotate(270deg);
}

.down-left::before {
  top: 98%;
  transform: rotate(180deg);
  left: 10%;
}
.down-center::before {
  top: 98%;
  left: 50%;
  transform: rotate(180deg);
}
.down-right::before {
  top: 98%;
  left: 90%;
  transform: rotate(180deg);
}
</style>
