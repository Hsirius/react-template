import React from "react";
import { ProMenuExport } from "../../menu";

const menu: ProMenuExport = [
  {
    name: "user",
    path: "/user",
    hideInMenu: true,
    exact: true,
    component: React.lazy(() => import("./user")),
  },
];

export default menu;
