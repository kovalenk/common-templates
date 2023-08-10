<template lang="pug">
.main
  .header 
  .sidebar
  .block 
    .content
      h1 Tooltip
      .block
        p(@mouseover="upLeft = true", @mouseout="upLeft = false") p, Left
        Teleport(to="body")
          tooltips-component.up-left-block(
            v-if="upLeft",
            text="Up, Left",
            arrowClass="up-left"
          )
        p(@mouseover="upCenter = true", @mouseout="upCenter = false") Up, Center
        Teleport(to="body")
          tooltips-component.up-center-block(
            v-if="upCenter",
            text="Up, Center",
            arrowClass="up-center"
          )
        p(@mouseover="upRight = true", @mouseout="upRight = false") Up, Right
        Teleport(to="body")
          tooltips-component.up-right-block(
            v-if="upRight",
            text="Up, Right",
            arrowClass="up-right"
          )
        p(@mouseover="centerRight = true", @mouseout="centerRight = false") Center, Right
        Teleport(to="body")
          tooltips-component.center-right-block(
            v-if="centerRight",
            text="Center, Right",
            arrowClass="center-right"
          )
        p(@mouseover="centerLeft = true", @mouseout="centerLeft = false") Center, Left
        Teleport(to="body")
          tooltips-component.center-left-block(
            v-if="centerLeft",
            text="Center, Left",
            arrowClass="center-left"
          )
        p(@mouseover="downLeft = true", @mouseout="downLeft = false") Down, Left
        Teleport(to="body")
          tooltips-component.down-left-block(
            v-if="downLeft",
            text="Down, Left",
            arrowClass="down-left"
          )
        p(@mouseover="downCenter = true", @mouseout="downCenter = false") Down, Center
        Teleport(to="body")
          tooltips-component.down-center-block(
            v-if="downCenter",
            text="Down, Center",
            arrowClass="down-center"
          )
        p(@mouseover="downRight = true", @mouseout="downRight = false") Down, Right
        Teleport(to="body")
          tooltips-component.down-right-block(
            v-if="downRight",
            text="Down, Right",
            arrowClass="down-right"
          )
</template>

<script setup lang="ts">
import { ref } from "vue";
import TooltipsComponent from "../components/TooltipsComponent.vue";
const upLeft = ref(false);
const upCenter = ref(false);
const upRight = ref(false);
const centerRight = ref(false);
const centerLeft = ref(false);
const downLeft = ref(false);
const downCenter = ref(false);
const downRight = ref(false);
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
  transform: translate3d(340px, 310px, 0px);
  top: 0px;
  left: 0px;
}
.up-right-block {
  position: absolute;
  transform: translate3d(280px, 410px, 0px);
  top: 0px;
  left: 0px;
}
.center-right-block {
  position: absolute;
  transform: translate3d(200px, 469px, 0px);
  top: 0px;
  left: 0px;
}
.center-left-block {
  position: absolute;
  transform: translate3d(470px, 569px, 0px);
  top: 0px;
  left: 0px;
}
.down-left-block {
  position: absolute;
  transform: translate3d(370px, 620px, 0px);
  top: 0px;
  left: 0px;
}
.down-center-block {
  position: absolute;
  transform: translate3d(350px, 725px, 0px);
  top: 0px;
  left: 0px;
}
.down-right-block {
  position: absolute;
  transform: translate3d(300px, 823px, 0px);
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
