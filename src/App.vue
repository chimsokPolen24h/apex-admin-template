<template>
  <div
    class="h-screen bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-dark-text flex flex-col font-sans overflow-hidden transition-colors theme"
  >
    <template v-if="$route.meta.hideLayout">
      <router-view />
    </template>

    <template v-else>
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar -->
        <Sidebar :sidebarOpen="sidebarOpen" />

        <!-- Main -->
        <div class="flex flex-col flex-1 overflow-hidden">
          <!-- Topbar -->
          <Topbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

          <!-- Page Content -->
          <main
            class="flex-1 overflow-y-auto p-3 bg-gray-100 dark:bg-dark-bg transition-colors theme"
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
      sidebarOpen: true,
    };
  },

  mounted() {
    this.initTheme();
  },
};
</script>

<style>
/* Smooth theme transitions */
.theme {
  transition-duration: 300ms;
}
</style>
