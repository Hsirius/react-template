import React from "react";
import { ProMenuExport } from "../../menu";

const menu: ProMenuExport = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: React.lazy(() => import("./home")),
  },
];

export default menu;
