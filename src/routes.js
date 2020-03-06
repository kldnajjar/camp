import React from "react";

const Dashboard = React.lazy(() => import("./views/Pages/Dashboard"));
const Tents = React.lazy(() => import("./views/Pages/Tents"));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard/tents", name: "Tents Profile", component: Tents },
  { path: "/dashboard", name: "Dashboard", component: Dashboard }
];

export default routes;
