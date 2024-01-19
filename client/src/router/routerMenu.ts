export const routerMenu = [
  {
    name: "home",
    path: "/home",
    icon: "Notification",
    meta: {
      title: "首页",
      requireAuth: true,
    },
    component: () => import("../views/home/home.vue"),
  },
  {
    name: "parseUrlList",
    path: "/parseUrlList",
    icon: "Link",
    meta: {
      title: "URL解析列表",
      requireAuth: true,
    },
    component: () => import("../views/parseUrlList/parseUrlList.vue"),
  },
  {
    name: "setting",
    path: "/setting",
    icon: "Setting",
    meta: {
      title: "设置",
      requireAuth: true,
    },
    component: () => import("../views/setting/setting.vue"),
  },
];
