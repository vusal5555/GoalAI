import {
  faBullseye,
  faDashboard,
  faPlus,
  faEye,
  faMapLocationDot,
  faMap,
  faBook,
  faUsers,
  faBell,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  //   icon: faDashboard, // You can use actual icon components or class names
  // },
  {
    name: "Goals",
    path: "/goals",
    icon: faBullseye,
  },
  {
    name: "AI Mentor",
    path: "/ai-mentor",
    icon: faMapLocationDot,
  },
  {
    name: "Templates",
    path: "/templates",
    icon: faMap,
  },
  {
    name: "Resources",
    path: "/resources",
    icon: faBook,
    subLinks: [
      {
        name: "All Resources",
        path: "/resources/list",
        icon: "allResourcesIcon",
      },
      {
        name: "Suggested Resources",
        path: "/resources/suggested",
        icon: "suggestedResourcesIcon",
      },
    ],
  },

  {
    name: "Settings",
    path: "/profile",
    icon: faGear,
    subLinks: [
      {
        name: "Profile",
        path: "/settings/profile",
        icon: "profileIcon",
      },
      {
        name: "Preferences",
        path: "/settings/preferences",
        icon: "preferencesIcon",
      },
    ],
  },
  {
    name: "Logout",
    path: "/logout",
    icon: faRightFromBracket,
  },
];

export default navLinks;
