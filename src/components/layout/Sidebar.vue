<template>
  <aside
    :class="[
      'flex flex-col shrink-0 bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-dark-border transition-all duration-300 overflow-hidden h-screen theme',
      expanded ? 'w-[240px]' : 'w-[64px]',
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- LOGO -->
    <div class="flex items-center justify-center px-3 py-2 border-b border-gray-200 dark:border-dark-border transition-colors">
      <img class="w-[38px] h-[26px] object-contain" src="../../assets/image/logo-icon.webp" />
      <img
        v-if="expanded"
        class="h-[26px] object-contain whitespace-nowrap ml-2"
        src="../../assets/image/logo-text.webp"
      />
    </div>

    <!-- NAV -->
    <nav class="flex-1 overflow-y-auto py-4">
      <div v-for="group in navGroups" :key="group.label" class="mb-5">
        <!-- GROUP LABEL -->
        <p
          v-if="expanded"
          class="text-[10px] font-semibold tracking-widest uppercase text-gray-500 dark:text-slate-500 px-4 mb-1 transition-colors"
        >
          {{ group.label }}
        </p>

        <!-- ITEMS -->
        <div v-for="item in group.items" :key="item.label">
          <!-- NORMAL LINK -->
          <router-link
            v-if="!item.children || item.children.length === 0"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-slate-400 border-l-2 border-transparent transition-all hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400"
            active-class="bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 border-l-emerald-600 dark:border-l-emerald-400"
          >
            <Icon :icon="item.icon" width="20" height="20" />
            <span v-if="expanded" class="text-sm whitespace-nowrap">{{ item.label }}</span>
          </router-link>

          <!-- WITH SUBMENU -->
          <div v-else class="relative group">
            <!-- PARENT -->
            <div
              class="flex items-center justify-between px-4 py-2 text-gray-600 dark:text-slate-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
              @click="toggleMenu(item.label)"
            >
              <div class="flex items-center gap-3">
                <Icon :icon="item.icon" width="20" height="20" />
                <span v-if="expanded" class="text-sm">{{ item.label }}</span>
              </div>
              <!-- ARROW -->
              <span
                v-if="expanded"
                :class="['transition-transform duration-200', openMenus[item.label] ? 'rotate-90' : '']"
              >▸</span>
            </div>

            <!-- SUBMENU (EXPANDED) -->
            <div
              v-if="expanded"
              v-show="openMenus[item.label]"
              class="flex flex-col ml-3 pl-5 border-l border-dashed border-gray-300 dark:border-slate-700 mt-1 transition-colors"
            >
              <router-link
                v-for="child in item.children"
                :key="child.label"
                :to="child.to"
                class="px-3 py-2 text-sm text-gray-500 dark:text-slate-500 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                active-class="bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400"
              >
                {{ child.label }}
              </router-link>
            </div>

            <!-- SUBMENU (COLLAPSED HOVER) -->
            <div
              v-if="!expanded"
              class="absolute left-[64px] top-0 min-w-[180px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg hidden group-hover:flex flex-col z-50 transition-colors theme"
            >
              <router-link
                v-for="child in item.children"
                :key="child.label"
                :to="child.to"
                class="px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {{ child.label }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- USER -->
    <div class="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-dark-border transition-colors">
      <img
        src="../../assets/image/profile2.webp"
        class="w-8 h-8 rounded-full shadow-[0_0_0_2px_#2dd4a0] flex-shrink-0"
      />
      <div v-if="expanded">
        <p class="text-sm text-gray-900 dark:text-white font-medium transition-colors">Polen Chim</p>
        <p class="text-xs text-gray-600 dark:text-slate-500 transition-colors">Polen@apex.io</p>
      </div>
    </div>

    <!-- LICENSE -->
    <div class="px-3 py-2 border-t border-gray-200 dark:border-dark-border text-center text-[10px] text-gray-600 dark:text-slate-500 transition-colors">
      <p v-if="expanded">MIT License by ChimSokpolen © {{ new Date().getFullYear() }}</p>
      <p v-else>MIT</p>
    </div>
  </aside>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  components: { Icon },

  props: {
    sidebarOpen: Boolean,
  },

  data() {
    return {
      isHovered: false,
      navGroups: [],
      openMenus: {},
    };
  },

  computed: {
    expanded() {
      return this.sidebarOpen || this.isHovered;
    },
  },

  created() {
    const routes = this.$router.getRoutes();
    const groups = {};

    routes.forEach((route) => {
      if (route.meta?.menu) {
        const groupName = route.meta.menu.group;

        if (!groups[groupName]) {
          groups[groupName] = [];
        }

        const item = {
          label: route.meta.menu.label,
          icon: route.meta.menu.icon,
          to: { name: route.name },
          children: route.meta.menu.children || [],
        };

        if (item.children.length > 0) {
          const isActive = item.children.some(
            (child) => child.to.name === this.$route.name
          );
          if (isActive) {
            this.openMenus[item.label] = true;
          }
        }

        groups[groupName].push(item);
      }
    });

    this.navGroups = Object.keys(groups).map((key) => ({
      label: key,
      items: groups[key],
    }));
  },

  methods: {
    onMouseEnter() {
      if (!this.sidebarOpen) this.isHovered = true;
    },
    onMouseLeave() {
      this.isHovered = false;
    },
    toggleMenu(label) {
      this.openMenus[label] = !this.openMenus[label];
    },
  },
};
</script>

<style scoped>
.theme {
  transition-duration: 300ms;
}
</style>