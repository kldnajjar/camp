export default {
  items: [
    {
      name: "dashboard",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      name: "Profiles",
      icon: "icon-puzzle",
      children: [
        {
          name: "Tent Types",
          url: "/dashboard/tent_types",
          icon: "fa fa-cubes"
        },
        {
          name: "Tents",
          url: "/dashboard/tents",
          icon: "fa fa-cubes"
        },
        {
          name: "Companies",
          url: "/dashboard/companies",
          icon: "fa fa-cubes"
        },
        {
          name: "Food",
          url: "/dashboard/food",
          icon: "fa fa-cubes"
        }
      ]
    }
  ]
};
