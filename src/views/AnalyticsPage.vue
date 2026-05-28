<template v-if="activePage === 'analytics'">
  <div
    class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <!-- Page Header -->
    <div class="flex justify-between items-start mb-6 animate-fadeIn">
      <div>
        <h1
          class="text-2xl font-bold text-gray-900 dark:text-white font-['Syne',sans-serif]"
        >
          Analytics
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Monitor your website performance
        </p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <div
        v-for="m in analyticsMetrics"
        :key="m.label"
        class="relative overflow-hidden rounded-2xl
               bg-white dark:bg-slate-800
               border border-gray-200 dark:border-slate-700
               shadow-sm dark:shadow-none
               p-5 transition-all duration-300 hover:scale-[1.02]"
      >
        <p class="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-3">
          {{ m.label }}
        </p>

        <p class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ m.value }}
        </p>

        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            :class="m.up
              ? 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-400/10'
              : 'text-red-600 bg-red-100 dark:text-rose-400 dark:bg-rose-400/10'"
          >
            {{ m.up ? '↑' : '↓' }} {{ m.change }}
          </span>

          <span class="text-xs text-gray-500 dark:text-slate-500">
            vs last month
          </span>
        </div>
      </div>
    </div>

    <!-- Chart Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

      <!-- Sessions by Country -->
      <div
        class="rounded-2xl bg-white dark:bg-slate-800
               border border-gray-200 dark:border-slate-700 overflow-hidden"
      >
        <div class="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white">
            Sessions by Country
          </h2>
        </div>

        <div class="px-6 py-4 space-y-4">
          <div v-for="c in countrySessions" :key="c.name" class="flex items-center gap-3">
            <span class="text-xl">{{ c.flag }}</span>

            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm text-gray-700 dark:text-slate-200">
                  {{ c.name }}
                </span>

                <span class="text-xs text-gray-500 dark:text-slate-400">
                  {{ c.sessions }}k
                </span>
              </div>

              <div class="h-2 bg-gray-200 dark:bg-slate-700 rounded-full">
                <div
                  class="h-full rounded-full bg-emerald-500"
                  :style="{ width: c.pct + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Device Breakdown -->
      <div
        class="rounded-2xl bg-white dark:bg-slate-800
               border border-gray-200 dark:border-slate-700 overflow-hidden"
      >
        <div class="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white">
            Device Breakdown
          </h2>
        </div>

        <div class="px-6 py-4 space-y-5">
          <div v-for="d in devices" :key="d.name" class="flex items-center gap-4">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center
                     bg-gray-100 dark:bg-slate-700"
            >
              {{ d.icon }}
            </div>

            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm text-gray-700 dark:text-slate-200">
                  {{ d.name }}
                </span>

                <span class="text-xs font-bold" :style="{ color: d.color }">
                  {{ d.pct }}%
                </span>
              </div>

              <div class="h-2 bg-gray-200 dark:bg-slate-700 rounded-full">
                <div
                  class="h-full rounded-full"
                  :style="{ width: d.pct + '%', background: d.color }"
                ></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: true,
      activePage: 'analytics',
      searchQuery: '',
      chartPeriod: '1Y',

      analyticsMetrics: [
        { label: 'Page Views',    value: '2.4M',   change: '18.3%', up: true  },
        { label: 'Avg. Session',  value: '4m 22s', change: '2.1%',  up: false },
        { label: 'Bounce Rate',   value: '34.5%',  change: '3.8%',  up: false },
        { label: 'New Visitors',  value: '62.1%',  change: '7.4%',  up: true  },
      ],

      countrySessions: [
        { name: 'United States', flag: '🇺🇸', sessions: 42.1, pct: 82 },
        { name: 'United Kingdom', flag: '🇬🇧', sessions: 18.4, pct: 55 },
        { name: 'Germany',        flag: '🇩🇪', sessions: 12.8, pct: 38 },
        { name: 'Japan',          flag: '🇯🇵', sessions: 9.2,  pct: 27 },
        { name: 'Canada',         flag: '🇨🇦', sessions: 7.6,  pct: 22 },
      ],

      devices: [
        { name: 'Desktop', icon: '🖥️', pct: 58, color: '#10b981' },
        { name: 'Mobile',  icon: '📱', pct: 34, color: '#6366f1' },
        { name: 'Tablet',  icon: '💻', pct: 8,  color: '#f59e0b' },
      ],
    }
  },
}
</script>

