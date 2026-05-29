<template>
  <div
    class="h-screen bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-dark-text flex flex-col font-sans overflow-hidden transition-colors theme"
  >
    <template v-if="$route.meta.hideLayout">
      <router-view />
    </template>

    <template v-else>
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar - Hidden on mobile -->
        <div class="hidden md:block">
          <Sidebar :sidebarOpen="sidebarOpen" />
        </div>

        <!-- Mobile Sidebar Overlay -->
        <Transition name="fade">
          <div
            v-if="sidebarOpen"
            class="fixed inset-0 bg-black/50 z-30 md:hidden"
            @click="sidebarOpen = false"
          />
        </Transition>

        <!-- Mobile Sidebar Drawer -->
        <Transition name="slide-in">
          <div
            v-if="sidebarOpen"
            class="fixed left-0 top-0 h-screen w-64 z-40 md:hidden"
          >
            <Sidebar :sidebarOpen="true" />
          </div>
        </Transition>

        <!-- Main -->
        <div class="flex flex-col flex-1 overflow-hidden w-full">
          <!-- Topbar -->
          <Topbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

          <!-- Page Content -->
          <main
            class="flex-1 overflow-y-auto p-2 md:p-3 bg-gray-100 dark:bg-dark-bg transition-colors theme"
          >
            <router-view />
          </main>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Sidebar from "./components/layout/Sidebar.vue";
import Topbar from "./components/layout/Topbar.vue";
import themeStore from "./store/theme.js";

export default {
  components: { Sidebar, Topbar },
  mixins: [themeStore],
  data() {
    return {
      sidebarOpen: window.innerWidth >= 768,
    };
  },

  mounted() {
    this.initTheme();
    this.$router.afterEach(() => {
      if (window.innerWidth < 768) {
        this.sidebarOpen = false;
      }
    });
  },
};
</script>

<style>
/* Smooth theme transitions */
.theme {
  transition-duration: 300ms;
}

/* Sidebar drawer animations */
.slide-in-enter-active, .slide-in-leave-active {
  transition: transform 0.3s ease;
}

.slide-in-enter-from {
  transform: translateX(-100%);
}

.slide-in-leave-to {
  transform: translateX(-100%);
}

/* Fade overlay animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
