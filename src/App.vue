<template>
  <div
    class="h-screen bg-[#0b1024] text-[#eef0f6] flex flex-col font-sans overflow-hidden"
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
          <main class="flex-1 overflow-y-auto p-6 bg-[#0b1024]">
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

export default {
  components: { Sidebar, Topbar },
  data() {
    return {
      sidebarOpen: true,
    };
  },
};
</script>
