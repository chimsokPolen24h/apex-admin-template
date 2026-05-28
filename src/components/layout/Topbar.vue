<template>
  <header
    class="flex justify-between items-center bg-white dark:bg-slate-900 px-3 py-1 text-gray-900 dark:text-white relative z-50 border border-gray-200 dark:border-slate-800 transition-colors theme w-[97%] mx-auto mt-3 rounded-2xl"
  >
    <!-- LEFT -->
    <div class="flex items-center gap-3 w-96">
      <button
        @click="$emit('toggle-sidebar')"
        class="text-xl hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3.5v17M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z" />
        </svg>
      </button>
      <div>|</div>
      <div class="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-md transition-colors w-96">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5" />
        </svg>
        <input
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          placeholder="Search..."
          class="bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
        />
      </div>
    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-4">
      <!-- Theme Toggle -->
      <button
        @click="toggleThemeMode"
        class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors theme"
        :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      >
        <span class="text-xl">
          <Icon :icon="isDarkMode ? 'lucide:sun' : 'lucide:moon'" />
        </span>
      </button>

      <!-- Language -->
      <div class="relative cursor-pointer" @click="toggleDropdownlang">
        <img src="../../assets/image/ukflag.webp" class="w-6 h-6 rounded-full hover:opacity-80 transition-opacity" />
        <div
          v-if="showDropdownlang"
          class="absolute -right-14 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-slate-700 transition-colors theme"
        >
          <div class="flex items-center px-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded cursor-pointer">
            <Icon icon="twemoji:flag-cambodia" />
            <p class="px-4 py-2 text-gray-900 dark:text-white text-sm">Cambodia</p>
          </div>
          <div class="flex items-center px-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded cursor-pointer">
            <Icon icon="twemoji:flag-china" />
            <p class="px-4 py-1 text-gray-900 dark:text-white text-sm">China</p>
          </div>
          <div class="flex items-center px-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded cursor-pointer">
            <Icon icon="twemoji:flag-south-korea" />
            <p class="px-4 py-1 text-gray-900 dark:text-white text-sm">Korea</p>
          </div>
        </div>
      </div>

      <!-- Cart -->
      <div>
        <button class="hover:opacity-75 transition-opacity text-xl relative top-1" @click="toggleCart">
          <Icon icon="mdi:cart-outline" />
          <span
            v-if="totalQty > 0"
            class="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none"
          >
            {{ totalQty > 99 ? "99+" : totalQty }}
          </span>
        </button>

        <!-- Overlay -->
        <Transition name="fade">
          <div v-if="showCart" class="fixed inset-0 bg-black/40 z-40" @click="closeCart" />
        </Transition>

        <!-- Cart Drawer -->
        <Transition name="slide">
          <div v-if="showCart" class="fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col">
            <div class="flex items-center justify-between p-4 border-b dark:border-slate-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
              <button class="hover:opacity-75 transition-opacity text-xl dark:text-white" @click="closeCart">
                <Icon icon="mdi:close" />
              </button>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-800 dark:text-white truncate">{{ item.name }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ item.variant }}</p>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white mt-1">${{ item.price.toFixed(2) }}</p>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <button class="w-6 h-6 rounded-full border border-gray-300 dark:border-slate-600 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-xs" @click="decreaseQty(item)">−</button>
                  <span class="text-sm font-medium w-4 text-center dark:text-white">{{ item.qty }}</span>
                  <button class="w-6 h-6 rounded-full border border-gray-300 dark:border-slate-600 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-xs" @click="item.qty++">+</button>
                </div>
                <button class="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0" @click="removeItem(item.id)">
                  <Icon icon="mdi:close" class="text-base" />
                </button>
              </div>
              <div v-if="cartItems.length === 0" class="flex flex-col items-center justify-center mt-16 gap-3">
                <Icon icon="mdi:cart-off" class="text-5xl text-gray-200" />
                <p class="text-gray-400 text-sm">Your cart is empty.</p>
              </div>
            </div>
            <div v-if="cartItems.length > 0" class="px-4 pb-2 pt-2 border-t border-gray-100 dark:border-slate-700">
              <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                <span>Subtotal ({{ totalQty }} items)</span>
                <span class="font-semibold text-gray-800 dark:text-white">${{ subtotal }}</span>
              </div>
            </div>
            <div class="p-4 border-t dark:border-slate-700">
              <button class="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Notification -->
      <div class="relative top-1" @click="toggleNotification">
        <button class="hover:opacity-75 transition-opacity text-xl relative">
          <Icon icon="tdesign:notification" />
          <!-- Notification Badge -->
          <span
            v-if="unreadCount > 0"
            class="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none"
          >
            {{ unreadCount > 99 ? "99+" : unreadCount }}
          </span>
        </button>

        <!-- Notification Dropdown -->
        <Transition name="dropdown">
          <div
            v-if="showNotification"
            class="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl z-50 border border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b dark:border-slate-700">
              <h3 class="font-semibold text-gray-900 dark:text-white text-sm">Notifications</h3>
              <button
                class="text-xs text-blue-500 hover:text-blue-600 transition-colors"
                @click.stop="markAllRead"
              >
                Mark all as read
              </button>
            </div>

            <!-- Notification List -->
            <div class="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-700">
              <div
                v-for="notif in notifications"
                :key="notif.id"
                class="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                :class="{ 'bg-blue-50 dark:bg-slate-700/60': !notif.read }"
                @click.stop="readNotif(notif)"
              >
                <!-- Icon Avatar -->
                <div
                  class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-base"
                  :class="notif.iconBg"
                >
                  <Icon :icon="notif.icon" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-800 dark:text-white">{{ notif.title }}</p>
                  <p class="text-xs text-gray-400 mt-0.5 leading-relaxed">{{ notif.message }}</p>
                  <p class="text-xs text-gray-300 dark:text-slate-500 mt-1">{{ notif.time }}</p>
                </div>
                <!-- Unread dot -->
                <span v-if="!notif.read" class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
              </div>

              <!-- Empty -->
              <div v-if="notifications.length === 0" class="flex flex-col items-center justify-center py-10 gap-2">
                <Icon icon="tdesign:notification-off" class="text-4xl text-gray-200" />
                <p class="text-gray-400 text-xs">No notifications</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-4 py-2 border-t dark:border-slate-700 text-center">
              <button class="text-xs text-blue-500 hover:text-blue-600 transition-colors">View all notifications</button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Profile -->
      <div class="relative cursor-pointer" @click="toggleDropdown">
        <img src="../../assets/image/profile2.webp" class="w-8 h-8 rounded-full hover:opacity-80 transition-opacity" />

        <!-- Profile Dropdown -->
        <Transition name="dropdown">
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl z-50 border border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            <!-- User Info -->
            <div class="px-4 py-3 border-b dark:border-slate-700 flex items-center gap-3">
              <img src="../../assets/image/profile2.webp" class="w-9 h-9 rounded-full" />
              <div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">Polen Chim</p>
                <p class="text-xs text-gray-400">polen@example.com</p>
              </div>
            </div>

            <!-- Menu Items -->
            <div class="py-1">
              <p class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 text-sm cursor-pointer transition-colors">
                <Icon icon="mdi:account-outline" class="text-base text-gray-400" />
                Profile
              </p>
              <p class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 text-sm cursor-pointer transition-colors">
                <Icon icon="mdi:cog-outline" class="text-base text-gray-400" />
                Settings
              </p>
              <p class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 text-sm cursor-pointer transition-colors">
                <Icon icon="mdi:help-circle-outline" class="text-base text-gray-400" />
                Help
              </p>
            </div>

            <!-- Logout -->
            <div class="border-t dark:border-slate-700 py-1">
              <router-link
                to="/signin"
                class="flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 text-sm transition-colors"
              >
                <Icon icon="mdi:logout" class="text-base" />
                Logout
              </router-link>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script>
import themeStore from "../../store/theme.js";
import { Icon } from "@iconify/vue";

export default {
  components: { Icon },

  props: ["searchQuery"],
  emits: ["toggle-sidebar", "update:searchQuery"],
  mixins: [themeStore],

  data() {
    return {
      showDropdown: false,
      showDropdownlang: false,
      showCart: false,
      showNotification: false,

      notifications: [
        {
          id: 1,
          title: "New Order Received",
          message: "Order #1042 has been placed and is awaiting confirmation.",
          time: "2 min ago",
          icon: "mdi:shopping-outline",
          iconBg: "bg-blue-500",
          read: false,
        },
        {
          id: 2,
          title: "Payment Successful",
          message: "Your payment of $214.00 was processed successfully.",
          time: "1 hour ago",
          icon: "mdi:check-circle-outline",
          iconBg: "bg-green-500",
          read: false,
        },
        {
          id: 3,
          title: "Item Shipped",
          message: "Your Classic White Sneakers are on the way!",
          time: "3 hours ago",
          icon: "mdi:truck-delivery-outline",
          iconBg: "bg-orange-400",
          read: false,
        },
        {
          id: 4,
          title: "Flash Sale Starts Now",
          message: "Up to 50% off selected items. Limited time only.",
          time: "Yesterday",
          icon: "mdi:tag-outline",
          iconBg: "bg-red-400",
          read: true,
        },
        {
          id: 5,
          title: "Review Reminder",
          message: "How was your Leather Crossbody Bag? Leave a review.",
          time: "2 days ago",
          icon: "mdi:star-outline",
          iconBg: "bg-yellow-400",
          read: true,
        },
      ],

      cartItems: [
        { id: 1, name: "Classic White Sneakers", variant: "Size 42 · White", price: 89.99, qty: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80" },
        { id: 2, name: "Leather Crossbody Bag", variant: "Color: Tan", price: 124.0, qty: 2, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&q=80" },
        { id: 3, name: "Polarized Sunglasses", variant: "Frame: Black", price: 45.5, qty: 1, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=120&q=80" },
      ],
    };
  },

  computed: {
    totalQty() {
      return this.cartItems.reduce((sum, item) => sum + item.qty, 0);
    },
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
    },
    unreadCount() {
      return this.notifications.filter((n) => !n.read).length;
    },
  },

  methods: {
    toggleCart() { this.showCart = !this.showCart; },
    closeCart() { this.showCart = false; },

    toggleNotification() { this.showNotification = !this.showNotification; },

    markAllRead() {
      this.notifications.forEach((n) => (n.read = true));
    },
    readNotif(notif) {
      notif.read = true;
    },

    decreaseQty(item) {
      if (item.qty > 1) { item.qty--; } else { this.removeItem(item.id); }
    },
    removeItem(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    },

    toggleDropdown() { this.showDropdown = !this.showDropdown; },
    toggleDropdownlang() { this.showDropdownlang = !this.showDropdownlang; },
    toggleThemeMode() { this.toggleTheme(); },

    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false;
        this.showDropdownlang = false;
        this.showNotification = false;
      }
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.theme { transition-duration: 300ms; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
.slide-enter-to, .slide-leave-from { transform: translateX(0); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
.dropdown-enter-to, .dropdown-leave-from { opacity: 1; transform: translateY(0); }
</style>