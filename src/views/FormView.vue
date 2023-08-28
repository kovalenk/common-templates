<template lang="pug">
form-field(
  propName="name",
  placeholder="Placeholder",
  typePlaceholder="text",
  label="Heading"
)
form-field(
  propName="name",
  :placeholder="name || 'Placeholder'",
  typePlaceholder="text",
  @click="isDropdownOpen = !isDropdownOpen",
  label="Heading"
)
  template(v-slot:password)
    i.arrow
    ul.dropdown-menu(v-if="isDropdownOpen")
      li(
        v-for="item in dropdownOptions",
        :key="item",
        @click="selectDropdownItem(item)"
      ) {{ item }}
form-field(
  propName="name",
  placeholder="Placeholder",
  typePlaceholder="text",
  isDropdown,
  isLogo,
  label="Heading"
)
  template(v-slot:logo)
    i.logo
form-field(
  propName="name",
  placeholder="Placeholder",
  :typePlaceholder="passwordVisible ? 'text' : 'password'",
  isPassword,
  label="Heading"
)
  template(v-slot:password)
    button.password-toggle(@click="passwordVisible = !passwordVisible") 
      i(:class="[passwordVisible ? 'password-show' : 'password-hide']")
form-field(
  propName="name",
  placeholder="Placeholder",
  typePlaceholder="date",
  label="Heading"
)
form-field(
  propName="name",
  placeholder="Placeholder",
  typePlaceholder="text",
  isLogo,
  label="Heading"
)
  template(v-slot:search)
    i.search
</template>

<script setup lang="ts">
import FormField from "@/components/FormField.vue";
import { ref } from "vue";
const passwordVisible = ref(false);
const isDropdownOpen = ref(false);
const dropdownOptions = ["Option 1", "Option 2", "Option 3"];
const name = ref("");

const selectDropdownItem = (item: string) => {
  name.value = item;
};
</script>

<style lang="scss" scoped>
i.logo::before {
  content: "";
  display: block;
  background-color: #4f4f4f;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  position: absolute;
  top: 18px;
  left: 16px;
}

i.search::before {
  content: "";
  display: block;
  background: url("../assets/search.svg");
  width: 20px;
  height: 20px;
  border-radius: 3px;
  position: absolute;
  top: 14px;
  left: 16px;
}

i.arrow::before {
  content: "";
  display: block;
  background: url("../assets/arrow.svg");
  width: 16px;
  height: 16px;
  border-radius: 3px;
  position: absolute;
  top: 18px;
  right: 16px;
}

.password-toggle {
  background: url("../assets/visible.svg");
  display: block;
  position: absolute;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  border: none;
  .password-show {
    border-top: 1px solid black;
    width: 16px;
    transform: rotate(45deg);
    display: block;
    margin-top: 7px;
  }
}

ul {
  padding: 0;
  list-style: none;
  border-left: 1px solid #ecebeb;
  border-right: 1px solid #ecebeb;
  border-bottom: 1px solid #ecebeb;
  border-radius: 0 0 8px 8px;
  margin: 0;
  li {
    border-bottom: 1px solid #ecebeb;
    padding: 14px 16px;
    cursor: pointer;
  }
}
</style>
