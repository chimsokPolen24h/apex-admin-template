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
import List from "../views/Invoices/List.vue";
import Detail from "../views/Invoices/Detail.vue";
import Edit from "../views/Invoices/Edit.vue";
import Create from "../views/Invoices/Create.vue";
import Ticket from "../views/Ticket.vue";
import Customer from "../views/Customer.vue";
import Order from "../views/Order.vue";
import Pos from "../views/Pos.vue";
import ErrorPage from "../views/Management/errorPage.vue";
import TwoStep from "../views/Management/two-step.vue";

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
            label: "UserSetting",
            to: { name: "userSetting" },
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
    path: "/error",
    name: "error",
    component: ErrorPage,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Error",
        icon: "iconoir:password-error",
        group: "Management",
      },
    },
  },
   {
    path: "/two-ver",
    name: "two-ver",
    component: TwoStep,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Two-Steps",
        icon: "bitcoin-icons:verify-outline",
        group: "Management",
      },
    },
  },
  {
    path: "/app",
    name: "apps",
    component: User,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Invoice",
        icon: "hugeicons:invoice-03",
        group: "APPS",
        children: [
          {
            label: "List",
            to: { name: "List" },
          },
          {
            label: "Detail",
            to: { name: "Detail" },
          },
          {
            label: "Create",
            to: { name: "Create" },
          },
          {
            label: "Edit",
            to: { name: "Edit" },
          },
        ],
      },
    },
  },

  {
    path: "/ticket",
    name: "ticket",
    component: Ticket,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Ticket",
        icon: "solar:ticket-line-duotone",
        group: "APPS",
      },
    },
  },
  {
    path: "/customer",
    name: "customer",
    component: Customer,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Customer",
        icon: "streamline-freehand:customer-action-product-message",
        group: "APPS",
      },
    },
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "Order",
        icon: "material-symbols:order-play",
        group: "APPS",
      },
    },
  },
   {
    path: "/pos",
    name: "pos",
    component: Pos,
    meta: {
      // requiresAuth: true,
      menu: {
        label: "POS",
        icon: "mdi:network-pos",
        group: "APPS",
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
    path: "/invoice/list",
    name: "List",
    component: List,
  },
  {
    path: "/invoice/detail",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/invoice/edit",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/invoice/create",
    name: "Create",
    component: Create,
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
      hideLayout: true,
      menu: {
        label: "Authentication",
        icon: "mdi:login-variant",
        group: "Management",
        children: [
          {
            label: "signin",
            to: { name: "Signin" },
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
      hideLayout: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      hideLayout: true,
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
        icon: "lets-icons:setting-line",
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
