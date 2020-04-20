export default {
  items: [
    {
      name: "dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
    },
    {
      name: "Stay Reservations",
      url: "/dashboard/stay_reservations",
      icon: "icon-puzzle",
    },
    {
      name: "Food Reservations",
      url: "/dashboard/food_reservations",
      icon: "icon-puzzle",
    },
    {
      name: "Companies",
      url: "/dashboard/companies",
      icon: "fa fa-cubes",
    },
    {
      name: "Payments",
      url: "/dashboard/payments",
      icon: "fa fa-cubes",
    },
    {
      name: "Profiles",
      icon: "icon-puzzle",
      children: [
        {
          name: "Tent Types",
          url: "/dashboard/tent_types",
          icon: "fa fa-cubes",
        },
        {
          name: "Tents",
          url: "/dashboard/tents",
          icon: "fa fa-cubes",
        },
        {
          name: "Food",
          url: "/dashboard/food",
          icon: "fa fa-cubes",
        },
        {
          name: "Meal Types",
          url: "/dashboard/meal_types",
          icon: "fa fa-cubes",
        },
        {
          name: "Stay Types",
          url: "/dashboard/stay_types",
          icon: "fa fa-cubes",
        },
        {
          name: "Activities",
          url: "/dashboard/activities",
          icon: "fa fa-cubes",
        },
        {
          name: "Users",
          url: "/dashboard/users",
          icon: "fa fa-cubes",
        },
      ],
    },
  ],
};
