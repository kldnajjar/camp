import React from "react";

const Dashboard = React.lazy(() => import("./views/pages/dashboard"));
const Tents = React.lazy(() => import("./views/pages/tents"));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard/tents", name: "Tents Profile", component: Tents },
  { path: "/dashboard", name: "Dashboard", component: Dashboard }
];

export default routes;
