import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    redirect: "/tooltip",
    component: () =>
      import(/* webpackChunkName: "Main" */ "@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/tooltip",
        name: "ToolTip",
        component: () =>
          import(/* webpackChunkName: "ToolTip" */ "../views/ToolTip.vue"),
      },
      {
        path: "/dropdown",
        name: "Dropdown",
        component: () =>
          import(/* webpackChunkName: "DropDown" */ "../views/DropDown.vue"),
      },
      {
        path: "/modal",
        name: "Modal",
        component: () =>
          import(/* webpackChunkName: "ModalPage" */ "../views/ModalPage.vue"),
      },
    ],
  },
];

export default routes;
