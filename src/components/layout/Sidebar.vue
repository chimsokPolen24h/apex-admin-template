<template>
  <aside
    :class="[
      'flex flex-col shrink-0 bg-[#141b33] border-r border-[#212947] transition-all duration-300 overflow-hidden h-screen',
      sidebarOpen ? 'w-[240px]' : 'w-[64px]'
    ]"
  >
    <!-- LOGO -->
    <div class="flex items-center justify-center px-3 py-2 border-b border-[#212947]">
      <img
        class="w-[38px] h-[26px] object-contain"
        src="../../assets/image/logo-icon.webp"
      />
      <img
        v-if="sidebarOpen"
        class="h-[26px] object-contain whitespace-nowrap ml-2"
        src="../../assets/image/logo-text.webp"
      />
    </div>

    <!-- NAV -->
    <nav class="flex-1 overflow-y-auto py-4">
      <div v-for="group in navGroups" :key="group.label" class="mb-5">
        
        <!-- GROUP LABEL -->
        <p
          v-if="sidebarOpen"
          class="text-[10px] font-semibold tracking-widest uppercase text-[#7880a0] px-4 mb-1"
        >
          {{ group.label }}
        </p>

        <!-- ITEMS -->
        <div v-for="item in group.items" :key="item.label">
          
          <!-- NORMAL LINK -->
          <router-link
            v-if="!item.children || item.children.length === 0"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-2 text-[#a8afc9] border-l-2 border-transparent transition-all hover:bg-emerald-400/10 hover:text-emerald-400"
            active-class="bg-emerald-400/10 text-emerald-400 border-l-emerald-400"
          >
            <Icon :icon="item.icon" width="20" height="20" />

            <span v-if="sidebarOpen" class="text-sm whitespace-nowrap">
              {{ item.label }}
            </span>
          </router-link>

          <!-- WITH SUBMENU -->
          <div v-else class="relative group">
            
            <!-- PARENT -->
            <div
              class="flex items-center justify-between px-4 py-2 text-[#a8afc9] cursor-pointer hover:bg-emerald-400/10 hover:text-emerald-400"
              @click="toggleMenu(item.label)"
            >
              <div class="flex items-center gap-3">
                <Icon :icon="item.icon" width="20" height="20" />

                <span v-if="sidebarOpen" class="text-sm">
                  {{ item.label }}
                </span>
              </div>

              <!-- ARROW -->
              <span
                v-if="sidebarOpen"
                :class="[
                  'transition-transform duration-200',
                  openMenus[item.label] ? 'rotate-90' : ''
                ]"
              >
                ▸
              </span>
            </div>

            <!-- SUBMENU (NORMAL) -->
            <div
              v-if="sidebarOpen"
              v-show="openMenus[item.label]"
              class="flex flex-col ml-3 pl-5 border-l border-dashed border-[#323c5e] mt-1"
            >
              <router-link
                v-for="child in item.children"
                :key="child.label"
                :to="child.to"
                class="px-3 py-2 text-sm text-[#7880a0] rounded-md hover:bg-emerald-400/10 hover:text-emerald-400"
                active-class="bg-emerald-400/10 text-emerald-400"
              >
                {{ child.label }}
              </router-link>
            </div>

            <!-- SUBMENU (COLLAPSED HOVER) -->
            <div
              v-if="!sidebarOpen"
              class="absolute left-[64px] top-0 min-w-[180px] bg-[#141b33] border border-[#212947] shadow-lg hidden group-hover:flex flex-col z-50"
            >
              <router-link
                v-for="child in item.children"
                :key="child.label"
                :to="child.to"
                class="px-4 py-2 text-sm text-[#7880a0] hover:bg-emerald-400/10 hover:text-emerald-400"
              >
                {{ child.label }}
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </nav>

    <!-- USER -->
    <div class="flex items-center gap-2 p-3 border-t border-[#212947]">
      <img
        src="../../assets/image/profile2.webp"
        class="w-8 h-8 rounded-full shadow-[0_0_0_2px_#2dd4a0]"
      />

      <div v-if="sidebarOpen">
        <p class="text-sm text-white font-medium">Polen Chim</p>
        <p class="text-xs text-[#7880a0]">Polen@apex.io</p>
      </div>
    </div>
    <!-- LICENSE -->
    <div
      class="px-3 py-2 border-t border-[#212947] text-center text-[10px] text-[#7880a0]"
    >
      <p v-if="sidebarOpen">
        MIT License by ChimSokpolen © {{ new Date().getFullYear() }}
      </p>
      <p v-else>MIT</p>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    sidebarOpen: Boolean,
  },

  data() {
    return {
      navGroups: [],
      openMenus: {},
    };
  },

  created() {
    const routes = this.$router.getRoutes();
    const groups = {};

    routes.forEach(route => {
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

        // AUTO OPEN ACTIVE SUBMENU
        if (item.children.length > 0) {
          const isActive = item.children.some(
            child => child.to.name === this.$route.name
          );

          if (isActive) {
            this.openMenus[item.label] = true;
          }
        }

        groups[groupName].push(item);
      }
    });

    this.navGroups = Object.keys(groups).map(key => ({
      label: key,
      items: groups[key],
    }));
  },

  methods: {
    toggleMenu(label) {
      this.openMenus[label] = !this.openMenus[label];
    },
  },
};
</script>