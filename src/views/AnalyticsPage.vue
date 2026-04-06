<template v-if="activePage === 'analytics'">
  <!-- Page Header -->
  <div class="mb-8 animate-fade-in">
    <h1 class="text-3xl font-bold tracking-tight text-white font-['Syne',sans-serif]">Analytics</h1>
    <p class="mt-1 text-sm text-slate-400 font-['DM_Sans',sans-serif]">Performance insights & metrics</p>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6 animate-fade-in">
    <div
      v-for="m in analyticsMetrics"
      :key="m.label"
      class="relative overflow-hidden rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm p-5 hover:border-slate-500/60 hover:bg-slate-800/80 transition-all duration-300 group"
    >
      <!-- Glow accent -->
      <div class="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
           :class="m.up ? 'bg-emerald-400' : 'bg-rose-400'"></div>

      <p class="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3 font-['DM_Sans',sans-serif]">{{ m.label }}</p>
      <p class="text-2xl font-bold text-white font-['Syne',sans-serif] mb-2">{{ m.value }}</p>
      <div class="flex items-center gap-1.5">
        <span
          class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full font-['DM_Sans',sans-serif]"
          :class="m.up
            ? 'text-emerald-400 bg-emerald-400/10'
            : 'text-rose-400 bg-rose-400/10'"
        >
          {{ m.up ? '↑' : '↓' }} {{ m.change }}
        </span>
        <span class="text-xs text-slate-500">vs last month</span>
      </div>
    </div>
  </div>

  <!-- Chart Row -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in-slow">

    <!-- Sessions by Country -->
    <div class="rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <div class="px-6 pt-5 pb-4 border-b border-slate-700/50">
        <h2 class="text-sm font-semibold text-white tracking-wide font-['Syne',sans-serif]">Sessions by Country</h2>
      </div>
      <div class="px-6 py-4 space-y-4">
        <div v-for="c in countrySessions" :key="c.name" class="flex items-center gap-3 group">
          <span class="text-xl shrink-0">{{ c.flag }}</span>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-sm font-medium text-slate-200 font-['DM_Sans',sans-serif]">{{ c.name }}</span>
              <span class="text-xs font-semibold text-slate-400 font-['DM_Sans',sans-serif] tabular-nums">{{ c.sessions }}k</span>
            </div>
            <div class="h-1.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                :style="{ width: c.pct + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Device Breakdown -->
    <div class="rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <div class="px-6 pt-5 pb-4 border-b border-slate-700/50">
        <h2 class="text-sm font-semibold text-white tracking-wide font-['Syne',sans-serif]">Device Breakdown</h2>
      </div>
      <div class="px-6 py-4 space-y-5">
        <div v-for="d in devices" :key="d.name" class="flex items-center gap-4">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-slate-700/60 shrink-0">
            {{ d.icon }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-sm font-medium text-slate-200 font-['DM_Sans',sans-serif]">{{ d.name }}</span>
              <span class="text-xs font-bold tabular-nums font-['DM_Sans',sans-serif]" :style="{ color: d.color }">{{ d.pct }}%</span>
            </div>
            <div class="h-1.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-700"
                :style="{ width: d.pct + '%', background: d.color }"
              ></div>
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

