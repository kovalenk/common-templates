<template lang="pug">
.main
  .header 
  .sidebar
  .block 
    .content
      h1 Tooltip
      .block
        div
          tooltips-component.distance(
            text="Up, Left",
            arrowClass="up-left",
            textHover="Up, Left"
          )
          tooltips-component.distance(
            text="Up, Center",
            arrowClass="up-center",
            textHover="Up, Center"
          )
          tooltips-component.distance(
            text="Up, Right",
            arrowClass="up-right",
            textHover="Up, Right"
          )
          tooltips-component.distance(
            text="Center, Right",
            arrowClass="center-right",
            tooltipClass="tooltip-right",
            textHover="Center, Right"
          )
          tooltips-component.distance(
            text="Center, Left",
            arrowClass="center-left",
            tooltipClass="tooltip-left",
            textHover="Center, Left"
          )
          tooltips-component.distance(
            text="Down, Left",
            arrowClass="down-left",
            tooltipClass="tooltip-down-left",
            textHover="Down, Left"
          )
          tooltips-component.distance(
            text="Down, Center",
            arrowClass="down-center",
            tooltipClass="tooltip-down-left",
            textHover="Down, Center"
          )
          tooltips-component.distance(
            text="Down, Right",
            arrowClass="down-right",
            tooltipClass="tooltip-down-left",
            textHover="Down, Right"
          )
</template>

<script setup lang="ts">
import TooltipsComponent from "../components/TooltipsComponent.vue";
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
  display: flex;
  .content {
    height: 200vh;
    h1 {
      font-family: "Inter", sans-serif;
      font-weight: 400;
    }
  }
  .distance {
    margin: 80px 80px 0 -8px;
    // position: absolute;
    // transform: translate3d(0, 0, 1px);
  }
}

.tooltip-right {
  transform: translate(-106%, -105%);
}
.tooltip-left {
  left: 34%;
  top: 62%;
  transform: translate(-6%, -89%);
}
.up-left::before {
  top: -7px;
  left: 16px;
  border-color: transparent transparent #fff transparent;
}
.up-center::before {
  top: -7px;
  left: 50%;
  transform: translateX(-50%);
  border-color: transparent transparent #fff transparent;
}
.up-right::before {
  top: -7px;
  left: calc(100% - 20px);
  border-color: transparent transparent #fff transparent;
}
.center-right::before {
  transform: rotate(90deg);
  top: 40%;
  left: calc(100%);
  border-color: transparent transparent transparent #fff;
}
.center-left::before {
  top: 40%;
  left: calc(-3%);
  transform: rotate(270deg);
  border-color: transparent #fff transparent transparent;
}
.tooltip-down-left {
  transform: translate(-33%, -156%);
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
