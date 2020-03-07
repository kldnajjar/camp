import React from "react";

const Dashboard = React.lazy(() => import("./views/pages/dashboard"));
const Tents = React.lazy(() => import("./views/pages/tents"));
const Tent = React.lazy(() => import("./views/pages/tents/edit"));
const Tent_Types = React.lazy(() => import("./views/pages/tent_types"));
const Tent_Type = React.lazy(() => import("./views/pages/tent_types/edit"));
const Companies = React.lazy(() => import("./views/pages/companies"));
const Company = React.lazy(() => import("./views/pages/companies/edit"));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {
    path: "/dashboard/companies/:id",
    name: "Profile",
    component: Company
  },
  {
    path: "/dashboard/companies",
    name: "Companies",
    component: Companies
  },
  {
    path: "/dashboard/tent_types/:id",
    name: "Profile",
    component: Tent_Type
  },
  {
    path: "/dashboard/tent_types",
    name: "Tent Types",
    component: Tent_Types
  },
  { path: "/dashboard/tents/:id", name: "Profile", component: Tent },
  { path: "/dashboard/tents", name: "Tents", component: Tents },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/", exact: true, name: "Home" }
];

export default routes;
