export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    {
      title: true,
      name: "Components",
      wrapper: {
        element: "",
        attributes: {},
      },
    },
    {
      divider: true,
    },
    {
      name: "Pages",
      url: "/pages",
      icon: "icon-star",
      children: [
        {
          name: "Vegetables",
          url: "/vegetables",
          icon: "icon-star",
        },
        {
          name: "Notifications",
          url: "/notifications",
          icon: "icon-star",
        },
      ],
    },
    {
      name: "Disabled",
      url: "/dashboard",
      icon: "icon-ban",
      attributes: { disabled: true },
    },
  ],
};
