import React from "react";
import { ProMenuExport } from "../../menu";

const menu: ProMenuExport = [
  {
    name: "创建标注项目",
    path: "/createtask",
    navFlag: true,
    hideInBreadcrumb: true,
    component: React.lazy(() => import("./CreateTask/index")),
  },
  {
    name: "任务中心",
    path: "/mission",
    navFlag: true,
    routes: [
      {
        name: "任务列表",
        path: "/mission/list",
        exact: true,
        component: React.lazy(() => import("./Mission/index")),
      },
      {
        name: "任务详情",
        path: "/mission/list/:id",
        exact: true,
        component: React.lazy(() => import("./Mission/Info")),
      },
    ],
  },
];

export default menu;
