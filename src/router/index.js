import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../components/dashboard/DashboardPage.vue";
import User from "../views/users/UsersPage.vue";
import UserProfile from "../views/users/userProfile.vue";
import UserSetting from "../views/users/userSetting.vue";
import Analytics from "../views/AnalyticsPage.vue";
import Settings from "../views/settings/SettingsPage.vue";
import Login from "../components/auth/signing.vue";
import Signup from "../components/auth/signup.vue";
import Signing from "../components/auth/signing.vue";
import Reports from "../views/Reports.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Dashboard",
        icon: "lucide:layout-dashboard",
        group: "Overview",
      },
    },
  },
  {
    path: "/analytics",
    name: "analytics",
    component: Analytics,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Analytics",
        icon: "ic:outline-analytics",
        group: "Overview",
      },
    },
  },
   {
    path: "/report",
    name: "report",
    component: Reports,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Reports",
        icon: "mdi:report-bar-stacked",
        group: "Overview",
      },
    },
  },
  {
    path: "/user",
    name: "users",
    component: User,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Users",
        icon: "ic:baseline-supervisor-account",
        group: "Management",
        children: [
          {
            label: 'UserSetting',
            to: { name: 'userSetting' },
          },
          {
            label: "Profile",
            to: { name: "userProfile" },
          },
        ],
      },
    },
  },
  {
    path: "/user/setting",
    name: "userSetting",
    component: UserSetting,
    meta: {
      // requiresAuth: true,
    },
  },
  {
    path: "/user/profile",
    name: "userProfile",
    component: UserProfile,
    meta: {
      // requiresAuth: true,
    },
  },
    {
    path: "/auth",
    name: "Authentication",
    component: User,
    meta: {
      // requiresAuth: true,
      hideLayout: true ,
      menu: {
        label: "Authentication",
        icon: "mdi:login-variant",
        group: "Management",
        children: [
          {
            label: 'signin',
            to: { name: 'Signin' },
          },
          {
            label: "signup",
            to: { name: "Signup" },
          },
        ],
      },
    },
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signing,
    meta: {
      // requiresAuth: true,
      hideLayout: true ,
    },
  },
   {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      hideLayout: true ,
      // requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Settings",
        icon: "lucide:sun",
        group: "System",
      },
    },
  },
  // {
  //   path: "/signin",
  //   name: "login",
  //   component: Login,
  //   meta: { hideLayout: true },
  // },
  //  {
  //   path: "/Signup",
  //   name: "Signup",
  //   component: Signup,
  //   meta: { hideLayout: true },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");

//   if (to.meta.requiresAuth && !token) {
//     next("/login");
//   } else if (to.path === "/login" && token) {
//     next("/");
//   } else {
//     next();
//   }
// });

export default router;
