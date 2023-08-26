<template lang="pug">
.side-section
  ul
    li(v-for="(item, key) in sideComponent", :key="key")
      router-link(:class="['label-inter']", :to="`/${item.path}`")
        i.icon(:class="['icon', `icon_${item.img}`]")
        | {{ item.name }}
</template>

<script lang="ts" setup>
const sideComponent = [
  {
    img: "tooltip",
    name: "Tooltip",
    path: "tooltip",
  },
  {
    img: "dropdown",
    name: "Dropdown",
    path: "dropdown",
  },
  {
    img: "modal",
    name: "Modal",
    path: "modal",
  },
];
</script>

<style scoped lang="scss">
@import "@/scss/core/media";

.side-section {
  display: flex;
  flex-direction: column;

  max-width: 248px;
  min-width: 248px;
  height: 100vh;
  padding: 24px 16px;
  box-sizing: border-box;
  border-right: solid 1px var(--grey-line);
  background-color: var(--white);

  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 32px;
    box-sizing: border-box;

    @include media_tablet {
      flex: 1;
      padding-top: 12px;
      gap: 0;
    }

    li {
      a.label-inter {
        display: flex;
        gap: 12px;

        width: 100%;
        text-decoration: none;
        padding: 14px 16px;
        box-sizing: border-box;

        border-radius: 8px;
        color: var(--grey-content);

        @include media_tablet {
          box-sizing: border-box;

          width: 100%;
          padding: 16px 0;
          margin: 0;

          color: var(--black);
          border-radius: 0;
          border-bottom: 1px solid var(--grey-line);
        }

        .icon {
          @include media_tablet {
            background-color: var(--primary);
          }
        }

        &.router-link-exact-active {
          background-color: var(--primary-light);

          color: var(--primary);

          .icon {
            background-color: var(--primary);
          }

          @include media_tablet {
            background-color: transparent;
            color: var(--grey-content);

            .icon {
              background-color: var(--grey-content);
            }
          }
        }

        &:hover {
          @extend .router-link-exact-active;
        }
      }

      &:last-child a.label-inter {
        @include media_tablet {
          border-bottom: unset;
        }
      }
    }
  }
}
</style>
