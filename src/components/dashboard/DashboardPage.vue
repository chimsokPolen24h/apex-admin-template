<template>
  <div
    class="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900 rounded-2xl font-['DM_Sans',sans-serif] transition-colors theme"
  >
    <!-- Page Header -->
    <div class="flex justify-between items-start mb-6 animate-fadeIn">
      <div>
        <h1
          class="text-2xl font-bold text-gray-900 dark:text-white font-['Syne',sans-serif] tracking-tight transition-colors"
        >
          Good morning, Polen 👋
        </h1>
        <p
          class="text-xs text-gray-500 dark:text-slate-400 mt-1 transition-colors"
        >
          Here's what's happening today.
        </p>
      </div>
      <button
        class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-lg shadow-emerald-900/40 transition-all duration-200 hover:shadow-emerald-800/60 hover:-translate-y-0.5"
      >
        <svg width="13" height="13" fill="none" viewBox="0 0 16 16">
          <path
            d="M8 2v12M2 8h12"
            stroke="white"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>
        New Report
      </button>
    </div>

    <!-- Stat Cards -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5"
    >
      <div
        v-for="(stat, i) in stats"
        :key="i"
        class="relative rounded-2xl border border-gray-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 backdrop-blur-sm overflow-hidden hover:-translate-y-1 hover:border-gray-300 dark:hover:border-slate-500/60 transition-all duration-300 group animate-fadeIn cursor-default"
      >
        <div
          class="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-opacity"
          :style="{ background: stat.glow }"
        ></div>
        <div class="relative p-3 md:p-5">
          <div class="flex justify-between items-center mb-2 md:mb-4">
            <div
              class="w-8 md:w-9 h-8 md:h-9 rounded-xl flex items-center justify-center"
              :style="{ background: stat.iconBg }"
              v-html="stat.icon"
            ></div>
            <span
              class="text-[9px] md:text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
              :class="
                stat.changePos
                  ? 'bg-emerald-400/10 text-emerald-400'
                  : 'bg-rose-400/10 text-rose-400'
              "
            >
              {{ stat.changePos ? "↑" : "↓" }} {{ Math.abs(stat.change) }}%
            </span>
          </div>
          <p
            class="text-[9px] md:text-[11px] text-gray-600 dark:text-slate-400 uppercase tracking-widest mb-1 transition-colors"
          >
            {{ stat.label }}
          </p>
          <p
            class="text-lg md:text-xl font-bold text-gray-900 dark:text-white font-['Syne',sans-serif] transition-colors"
          >
            {{ stat.value }}
          </p>
        </div>
      </div>
    </div>

    <!-- Chart Row -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3 md:gap-4 mb-5">
      <!-- Revenue Chart -->
      <div
        class="bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/50 backdrop-blur-sm rounded-2xl animate-fadeIn overflow-hidden transition-colors theme"
      >
        <div
          class="flex justify-between items-center px-3 md:px-5 py-3 md:py-4 border-b border-gray-200 dark:border-slate-700/50 transition-colors"
        >
          <div>
            <h2
              class="text-sm font-bold text-gray-900 dark:text-white font-['Syne',sans-serif] transition-colors"
            >
              Revenue Overview
            </h2>
            <p
              class="text-xs text-gray-600 dark:text-slate-400 mt-0.5 transition-colors"
            >
              Monthly performance — 2024
            </p>
          </div>
          <div
            class="flex gap-1 bg-gray-100 dark:bg-slate-700/40 rounded-lg p-0.5 transition-colors"
          >
            <button
              v-for="p in ['1M', '3M', '1Y']"
              :key="p"
              class="text-[11px] px-3 py-1 rounded-md font-medium transition-all duration-200"
              :class="
                chartPeriod === p
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-gray-700 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              "
              @click="chartPeriod = p"
            >
              {{ p }}
            </button>
          </div>
        </div>
        <div class="px-3 md:px-4 pb-3 md:pb-4 pt-2 md:pt-3" style="height: 180px; md:height: 210px; position: relative">
          <Bar :data="barChartData" :options="barChartOptions" />
        </div>
      </div>

      <!-- Donut Chart -->
      <div
        class="bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/50 backdrop-blur-sm rounded-2xl animate-fadeIn overflow-hidden transition-colors theme"
      >
        <div
          class="px-3 md:px-5 py-3 md:py-4 border-b border-gray-200 dark:border-slate-700/50 transition-colors"
        >
          <h2
            class="text-sm font-bold text-gray-900 dark:text-white font-['Syne',sans-serif] transition-colors"
          >
            Traffic Sources
          </h2>
          <p
            class="text-xs text-gray-600 dark:text-slate-400 mt-0.5 transition-colors"
          >
            Acquisition channels
          </p>
        </div>
        <div class="flex flex-col items-center p-3 md:p-5">
          <div
            class="relative mb-3 md:mb-5"
            style="width: 140px; height: 140px; md:width: 150px; md:height: 150px; position: relative"
          >
            <Doughnut
              :data="doughnutChartData"
              :options="doughnutChartOptions"
            />
            <!-- Center label overlay -->
            <div
              class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <span
                class="text-base font-bold text-gray-900 dark:text-white font-['Syne',sans-serif] transition-colors"
                >48%</span
              >
              <span
                class="text-[10px] text-gray-600 dark:text-slate-400 transition-colors"
                >Organic</span
              >
            </div>
          </div>
          <div class="flex flex-col gap-2.5 w-full">
            <div
              v-for="src in trafficSources"
              :key="src.label"
              class="flex items-center gap-2.5"
            >
              <div
                class="w-2 h-2 rounded-full shrink-0"
                :style="{ background: src.color }"
              ></div>
              <span
                class="text-xs text-gray-700 dark:text-slate-300 flex-1 transition-colors"
                >{{ src.label }}</span
              >
              <span
                class="text-xs font-bold text-gray-900 dark:text-white tabular-nums transition-colors"
                >{{ src.pct }}%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3 md:gap-4">
      <!-- Transactions -->
      <div
        class="bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/50 backdrop-blur-sm rounded-2xl animate-fadeIn overflow-hidden transition-colors theme"
      >
        <div
          class="flex justify-between items-center px-3 md:px-5 py-3 md:py-4 border-b border-gray-200 dark:border-slate-700/50 transition-colors"
        >
          <h2
            class="text-sm font-bold text-gray-900 dark:text-white font-['Syne',sans-serif] transition-colors"
          >
            Recent Transactions
          </h2>
          <button
            class="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors duration-200"
          >
            View all →
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse"
>
          <thead>
            <tr
              class="border-b border-gray-200 dark:border-slate-700/50 transition-colors"
            >
              <th
                class="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-600 dark:text-slate-500 transition-colors"
              >
                Customer
              </th>
              <th
                class="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-600 dark:text-slate-500 hidden sm:table-cell transition-colors"
              >
                Date
              </th>
              <th
                class="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-600 dark:text-slate-500 transition-colors"
              >
                Amount
              </th>
              <th
                class="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-600 dark:text-slate-500 transition-colors"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="tx in transactions"
              :key="tx.id"
              class="border-b border-gray-100 dark:border-slate-700/30 hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors duration-150 last:border-0"
            >
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <img
                    :src="tx.avatar"
                    alt="avatar"
                    class="w-7 h-7 rounded-full ring-2 ring-gray-200 dark:ring-slate-700 transition-colors"
                  />
                  <div>
                    <p
                      class="text-sm font-semibold text-gray-900 dark:text-white leading-tight transition-colors"
                    >
                      {{ tx.name }}
                    </p>
                    <p
                      class="text-[11px] text-gray-600 dark:text-slate-500 transition-colors"
                    >
                      {{ tx.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td
                class="px-5 py-3.5 hidden sm:table-cell text-xs text-gray-600 dark:text-slate-500 tabular-nums transition-colors"
              >
                {{ tx.date }}
              </td>
              <td
                class="px-5 py-3.5 text-sm font-bold text-gray-900 dark:text-white tabular-nums transition-colors"
              >
                {{ tx.amount }}
              </td>
              <td class="px-5 py-3.5">
                <span
                  class="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
                  :class="statusClass(tx.status)"
                >
                  {{ tx.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      <!-- Top Products -->
      <div
        class="bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/50 backdrop-blur-sm rounded-2xl animate-fadeIn p-3 md:p-5 transition-colors theme"
      >
        <h2
          class="text-sm font-bold text-gray-900 dark:text-white font-['Syne',sans-serif] mb-3 md:mb-5 transition-colors"
        >
          Top Products
        </h2>
        <div class="flex flex-col gap-5">
          <div v-for="prod in topProducts" :key="prod.name">
            <div class="flex justify-between items-center mb-1.5">
              <span
                class="text-xs font-medium text-gray-800 dark:text-slate-200 transition-colors"
                >{{ prod.name }}</span
              >
              <span
                class="text-xs font-bold tabular-nums"
                :style="{ color: prod.color }"
                >{{ prod.pct }}%</span
              >
            </div>
            <div
              class="w-full h-1.5 rounded-full bg-gray-200 dark:bg-slate-700/60 overflow-hidden transition-colors"
            >
              <div
                class="h-full rounded-full transition-all duration-700"
                :style="{ width: prod.pct + '%', background: prod.color }"
              ></div>
            </div>
            <p
              class="text-[10px] text-gray-600 dark:text-slate-500 mt-1.5 transition-colors"
            >
              {{ prod.sales }} sales · {{ prod.revenue }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Filler,
);

// Data per period
const periodData = {
  "1M": [
    { label: "Jan", value: 30000 },
    { label: "Feb", value: 42000 },
    { label: "Mar", value: 39000 },
    { label: "Apr", value: 54000 },
    { label: "May", value: 48000 },
    { label: "Jun", value: 60000 },
    { label: "Junly", value: 30000 },
    { label: "Aug", value: 42000 },
    { label: "Sep", value: 39000 },
    { label: "Oct", value: 54000 },
    { label: "Nov", value: 48000 },
    { label: "Dec", value: 60000 },
  ],
  "3M": [
    { label: "Q1", value: 111000 },
    { label: "Q2", value: 162000 },
    { label: "Q3", value: 138000 },
    { label: "Q4", value: 185000 },
  ],
  "1Y": [
    { label: "2021", value: 320000 },
    { label: "2022", value: 410000 },
    { label: "2023", value: 390000 },
    { label: "2024", value: 510000 },
  ],
};

export default {
  name: "Dashboard",

  components: { Bar, Doughnut },

  data() {
    return {
      chartPeriod: "1M",

      stats: [
        {
          label: "Total Revenue",
          value: "$94,821",
          change: 12.4,
          changePos: true,
          glow: "#10b981",
          iconBg: "rgba(16,185,129,0.12)",
          icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 2v12M5 5.5h4.5a1.5 1.5 0 010 3H6.5a1.5 1.5 0 000 3H11" stroke="#10b981" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        },
        {
          label: "Active Users",
          value: "24,512",
          change: 8.1,
          changePos: true,
          glow: "#6366f1",
          iconBg: "rgba(99,102,241,0.12)",
          icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="5" r="3" stroke="#6366f1" stroke-width="1.5"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        },
        {
          label: "New Orders",
          value: "1,284",
          change: -2.3,
          changePos: false,
          glow: "#f59e0b",
          iconBg: "rgba(245,158,11,0.12)",
          icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 3h2l2 8h6l1-5H7" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        },
        {
          label: "Conversion",
          value: "3.68%",
          change: 5.7,
          changePos: true,
          glow: "#ec4899",
          iconBg: "rgba(236,72,153,0.12)",
          icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M2 12l4-4 3 3 5-6" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        },
      ],

      trafficSources: [
        { label: "Organic", pct: 48, color: "#10b981" },
        { label: "Referral", pct: 35, color: "#2dd4a0" },
        { label: "Social", pct: 17, color: "#064e3b" },
      ],

      transactions: [
        {
          id: 1,
          name: "Alice Johnson",
          email: "alice@example.com",
          date: "2026-03-25",
          amount: "$320",
          status: "Completed",
          avatar: "https://i.pravatar.cc/30?img=1",
        },
        {
          id: 2,
          name: "Bob Smith",
          email: "bob@example.com",
          date: "2026-03-24",
          amount: "$450",
          status: "Pending",
          avatar: "https://i.pravatar.cc/30?img=2",
        },
        {
          id: 3,
          name: "Charlie Lee",
          email: "charlie@example.com",
          date: "2026-03-23",
          amount: "$120",
          status: "Failed",
          avatar: "https://i.pravatar.cc/30?img=3",
        },
      ],

      topProducts: [
        {
          name: "Product A",
          pct: 70,
          color: "#10b981",
          sales: 124,
          revenue: "$12.4K",
        },
        {
          name: "Product B",
          pct: 55,
          color: "#6366f1",
          sales: 98,
          revenue: "$9.8K",
        },
        {
          name: "Product C",
          pct: 40,
          color: "#f59e0b",
          sales: 75,
          revenue: "$7.5K",
        },
      ],
    };
  },

  computed: {
    // ── Bar Chart ─────────────────────────────────────────────
    currentPeriodBars() {
      return periodData[this.chartPeriod];
    },

    barChartData() {
      const bars = this.currentPeriodBars;
      return {
        labels: bars.map((b) => b.label),
        datasets: [
          {
            type: "bar",
            label: "Revenue",
            data: bars.map((b) => b.value),
            backgroundColor: "rgba(16, 185, 129, 0.20)",
            borderColor: "#10b981",
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
            order: 2,
          },
          {
            type: "line",
            label: "Trend",
            data: bars.map((b) => b.value),
            borderColor: "#2dd4a0",
            borderWidth: 2.5,
            pointBackgroundColor: "#2dd4a0",
            pointBorderColor: "#0f172a",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.35,
            fill: false,
            order: 1,
          },
        ],
      };
    },

    barChartOptions() {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
            borderColor: isDark ? "#334155" : "#e5e7eb",
            borderWidth: 1,
            titleColor: isDark ? "#94a3b8" : "#6b7280",
            bodyColor: isDark ? "#f1f5f9" : "#1f2937",
            padding: 10,
            callbacks: {
              label: (ctx) => ` $${ctx.parsed.y.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: isDark
                ? "rgba(30, 41, 59, 0.8)"
                : "rgba(229, 231, 235, 0.5)",
              drawBorder: false,
            },
            ticks: {
              color: isDark ? "#64748b" : "#9ca3af",
              font: { size: 9, family: "DM Sans" },
            },
            border: { display: false },
          },
          y: {
            grid: {
              color: isDark
                ? "rgba(30, 41, 59, 0.8)"
                : "rgba(229, 231, 235, 0.5)",
              drawBorder: false,
            },
            ticks: {
              color: isDark ? "#64748b" : "#9ca3af",
              font: { size: 9, family: "DM Sans" },
              callback: (v) => "$" + (v >= 1000 ? v / 1000 + "K" : v),
            },
            border: { display: false },
          },
        },
      };
    },

    // ── Doughnut Chart ────────────────────────────────────────
    doughnutChartData() {
      return {
        labels: this.trafficSources.map((s) => s.label),
        datasets: [
          {
            data: this.trafficSources.map((s) => s.pct),
            backgroundColor: this.trafficSources.map((s) => s.color),
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      };
    },

    doughnutChartOptions() {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "74%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
            borderColor: isDark ? "#334155" : "#e5e7eb",
            borderWidth: 1,
            titleColor: isDark ? "#94a3b8" : "#6b7280",
            bodyColor: isDark ? "#f1f5f9" : "#1f2937",
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
            },
          },
        },
      };
    },
  },

  methods: {
    statusClass(status) {
      return {
        Completed: "bg-emerald-400/10 text-emerald-400",
        Pending: "bg-amber-400/10 text-amber-400",
        Failed: "bg-rose-400/10 text-rose-400",
      }[status];
    },
  },
};
</script>

<style scoped>
.theme {
  transition-duration: 300ms;
}
</style>
