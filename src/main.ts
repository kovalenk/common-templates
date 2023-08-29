import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/scss/styles.scss";
import TooltipDirective from "@/directives/v-tooltip";

const app = createApp(App);

app.use(router).directive("tooltip", TooltipDirective).mount("#app");
