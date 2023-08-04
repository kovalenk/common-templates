<template lang="pug">
div
  .header 
  .block 
    .sidebar
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
        div 
          tooltips-component.distance(
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t...",
            arrowClass="up-left",
            textHover="Up, Left"
          )
          tooltips-component.distance(
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t...",
            arrowClass="up-center",
            textHover="Up, center"
          )
          tooltips-component.distance(
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t...",
            arrowClass="up-right",
            textHover="Up, Right"
          )
          tooltips-component.distance(
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t...",
            arrowClass="center-right",
            tooltipClass="tooltip-right",
            textHover="Center, Right"
          )
          tooltips-component.distance(
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t...",
            arrowClass="center-left",
            tooltipClass="tooltip-left",
            textHover="Center, Left"
          )
          tooltips-component.distance(
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t...",
            arrowClass="down-left",
            tooltipClass="tooltip-down-left",
            textHover="Down, Left"
          )
          tooltips-component.distance(
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t...",
            arrowClass="down-center",
            tooltipClass="tooltip-down-left",
            textHover="Down, Center"
          )
          tooltips-component.distance(
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t...",
            arrowClass="down-right",
            tooltipClass="tooltip-down-left",
            textHover="Down, Right"
          )
</template>

<script setup lang="ts">
import TooltipsComponent from "../components/TooltipsComponent.vue";
</script>
<style lang="scss">
.header {
  background: red;
  height: 30px;
  width: 100%;
}
.block {
  display: flex;
  .sidebar {
    width: 30%;
    background: blue;
    height: 100vh;
  }
  .content {
    padding: 20px;
  }
  .distance {
    margin: 80px;
  }
}

.tooltip-right {
  left: -15%;
  top: 50%;
  transform: translate(-100%, -50%);
}
.tooltip-left {
  left: 100%;
  top: 50%;
  transform: translate(-2%, -50%);
}
.up-left::before {
  top: -10px;
  left: 16px;
  border-color: transparent transparent #fff transparent;
}
.up-center::before {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-color: transparent transparent #fff transparent;
}
.up-right::before {
  top: -10px;
  left: calc(100% - 15px);
  border-color: transparent transparent #fff transparent;
}
.center-right::before {
  top: 40%;
  left: calc(100% - -5px);
  border-color: transparent transparent transparent #fff;
}
.center-left::before {
  top: 40%;
  left: calc(100% - 102%);
  border-color: transparent #fff transparent transparent;
}
.tooltip-down-left {
  transform: translate(-33%, -156%);
}
.down-left::before {
  top: 100%;
  left: 10%;
  border-color: #fff transparent transparent transparent;
}
.down-center::before {
  top: 100%;
  left: 50%;
  border-color: #fff transparent transparent transparent;
}
.down-right::before {
  top: 100%;
  left: 90%;
  border-color: #fff transparent transparent transparent;
}
</style>
