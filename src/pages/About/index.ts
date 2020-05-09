import React from "react";
import { ProMenuExport } from "../../menu";

const menu: ProMenuExport = {
  name: "about",
  path: "/about",
  routes: [
    {
      name: "aboutIndex",
      path: "/about",
      exact: true,
      component: React.lazy(() => import("./about")),
    },
    {
      name: "aboutList",
      path: "/about/list",
      exact: true,
      component: React.lazy(() => import("./list")),
    },
    {
      name: "listInfo",
      path: "/about/list/:listId",
      exact: true,
      hideInMenu: true,
      component: React.lazy(() => import("./listInfo")),
    },
  ],
};

export default menu;
