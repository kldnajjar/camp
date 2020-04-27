import React from "react";

const Dashboard = React.lazy(() => import("./views/pages/dashboard"));
const Tents = React.lazy(() => import("./views/pages/tents"));
const Tent = React.lazy(() => import("./views/pages/tents/edit"));
const Tent_Types = React.lazy(() => import("./views/pages/tent_types"));
const Tent_Type = React.lazy(() => import("./views/pages/tent_types/edit"));
const Companies = React.lazy(() => import("./views/pages/companies"));
const Company = React.lazy(() => import("./views/pages/companies/edit"));
const Foods = React.lazy(() => import("./views/pages/food"));
const Food = React.lazy(() => import("./views/pages/food/edit"));
const Meal_Types = React.lazy(() => import("./views/pages/meal_types"));
const Meal_Type = React.lazy(() => import("./views/pages/meal_types/edit"));
const Stay_Types = React.lazy(() => import("./views/pages/stay_types"));
const Stay_Type = React.lazy(() => import("./views/pages/stay_types/edit"));
const Activities = React.lazy(() => import("./views/pages/activities"));
const Activity = React.lazy(() => import("./views/pages/activities/edit"));
const Users = React.lazy(() => import("./views/pages/users"));
const User = React.lazy(() => import("./views/pages/users/edit"));

const Food_Reservations = React.lazy(() =>
  import("./views/pages/food_reservations")
);
const Food_Reservation = React.lazy(() =>
  import("./views/pages/food_reservations/edit")
);

const Stay_Reservations = React.lazy(() =>
  import("./views/pages/stay_reservations")
);
const Stay_Reservation = React.lazy(() =>
  import("./views/pages/stay_reservations/edit")
);

const Payments = React.lazy(() => import("./views/pages/payments"));
const Payment = React.lazy(() => import("./views/pages/payments/edit"));

const Daily = React.lazy(() => import("./views/pages/daily"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const routes = [
  {
    path: "/dashboard/daily",
    name: "Daily",
    component: Daily,
  },
  {
    path: "/dashboard/payments/:id",
    name: "Profile",
    component: Payment,
  },
  {
    path: "/dashboard/payments",
    name: "Stay Reservations",
    component: Payments,
  },
  {
    path: "/dashboard/stay_reservations/:id",
    name: "Profile",
    component: Stay_Reservation,
  },
  {
    path: "/dashboard/stay_reservations",
    name: "Stay Reservations",
    component: Stay_Reservations,
  },
  {
    path: "/dashboard/food_reservations/:id",
    name: "Profile",
    component: Food_Reservation,
  },
  {
    path: "/dashboard/food_reservations",
    name: "Food Reservations",
    component: Food_Reservations,
  },
  {
    path: "/dashboard/users/:id",
    name: "Profile",
    component: User,
  },
  {
    path: "/dashboard/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/dashboard/activities/:id",
    name: "Profile",
    component: Activity,
  },
  {
    path: "/dashboard/activities",
    name: "Activities",
    component: Activities,
  },
  {
    path: "/dashboard/stay_types/:id",
    name: "Profile",
    component: Stay_Type,
  },
  {
    path: "/dashboard/stay_types",
    name: "Meal Types",
    component: Stay_Types,
  },
  {
    path: "/dashboard/meal_types/:id",
    name: "Profile",
    component: Meal_Type,
  },
  {
    path: "/dashboard/meal_types",
    name: "Meal Types",
    component: Meal_Types,
  },
  {
    path: "/dashboard/food/:id",
    name: "Profile",
    component: Food,
  },
  {
    path: "/dashboard/food",
    name: "Companies",
    component: Foods,
  },
  {
    path: "/dashboard/companies/:id",
    name: "Profile",
    component: Company,
  },
  {
    path: "/dashboard/companies",
    name: "Companies",
    component: Companies,
  },
  {
    path: "/dashboard/tent_types/:id",
    name: "Profile",
    component: Tent_Type,
  },
  {
    path: "/dashboard/tent_types",
    name: "Tent Types",
    component: Tent_Types,
  },
  { path: "/dashboard/tents/:id", name: "Profile", component: Tent },
  { path: "/dashboard/tents", name: "Tents", component: Tents },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/", exact: true, name: "Home" },
];

export default routes;
