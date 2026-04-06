<template>
  <div class="min-h-screen text-gray-300 flex bg-gray-900 font-body">

    <!-- ── MAIN ── -->
    <main class="flex-1 min-w-0 px-5 lg:px-10 py-8 overflow-auto">

      <!-- Chart + Donut -->
      <section class="grid lg:grid-cols-3 gap-4 mb-8">

        <!-- Line Chart -->
        <div class="border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(52,211,153,0.06)] hover:border-em/[0.28] hover:shadow-[0_0_24px_rgba(52,211,153,0.07),inset_0_1px_0_rgba(52,211,153,0.1)] transition-[border-color,box-shadow] duration-300 rounded-2xl p-6 lg:col-span-2 animate-fade-up [animation-delay:80ms]">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display font-bold text-white">Revenue Overview</h2>
            <div class="flex gap-1">
              <button
                v-for="r in ['1W', '1M', '3M']"
                :key="r"
                @click="chartRange = r"
                :class="[
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                  chartRange === r
                    ? 'bg-em text-black font-bold'
                    : 'text-gray-500 hover:text-gray-300'
                ]"
              >{{ r }}</button>
            </div>
          </div>
          <canvas ref="lineChart" class="max-h-[220px]" height="200"></canvas>
        </div>

        <!-- Donut -->
        <div class="border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(52,211,153,0.06)] hover:border-em/[0.28] hover:shadow-[0_0_24px_rgba(52,211,153,0.07),inset_0_1px_0_rgba(52,211,153,0.1)] transition-[border-color,box-shadow] duration-300 rounded-2xl p-6 animate-fade-up [animation-delay:160ms]">
          <h2 class="font-display font-bold text-white mb-6">Traffic Sources</h2>
          <canvas ref="donutChart" height="160" class="mb-4 max-h-[220px]"></canvas>
          <ul class="space-y-2">
            <li v-for="(s, i) in sources" :key="i" class="flex items-center justify-between text-sm">
              <span class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-sm shrink-0" :style="{ background: s.color }"></span>
                <span class="text-gray-400">{{ s.label }}</span>
              </span>
              <span class="text-white font-medium font-display">{{ s.pct }}%</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Progress + Table -->
      <section class="grid lg:grid-cols-5 gap-4 mb-8">

        <!-- Goals -->
        <div class="border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(52,211,153,0.06)] hover:border-em/[0.28] hover:shadow-[0_0_24px_rgba(52,211,153,0.07),inset_0_1px_0_rgba(52,211,153,0.1)] transition-[border-color,box-shadow] duration-300 rounded-2xl p-6 lg:col-span-2 animate-fade-up [animation-delay:80ms]">
          <h2 class="font-display font-bold text-white mb-6">Q1 Goals</h2>
          <ul class="space-y-5">
            <li v-for="(g, i) in goals" :key="i">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-400">{{ g.label }}</span>
                <span :class="g.pct >= 80 ? 'text-em' : 'text-gray-400'">{{ g.pct }}%</span>
              </div>
              <div class="bg-em/10 h-1.5 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-em to-em/50 shadow-[0_0_8px_rgba(52,211,153,0.4)] transition-[width] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]"
                  :style="{ width: animated ? g.pct + '%' : '0%' }"
                ></div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Top Products Table -->
        <div class="border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(52,211,153,0.06)] hover:border-em/[0.28] hover:shadow-[0_0_24px_rgba(52,211,153,0.07),inset_0_1px_0_rgba(52,211,153,0.1)] transition-[border-color,box-shadow] duration-300 rounded-2xl p-6 lg:col-span-3 animate-fade-up [animation-delay:160ms] overflow-auto">
          <h2 class="font-display font-bold text-white mb-6">Top Products</h2>
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left">
                <th class="text-gray-600 font-medium pb-3 text-xs uppercase tracking-wider">Product</th>
                <th class="text-gray-600 font-medium pb-3 text-xs uppercase tracking-wider">Sales</th>
                <th class="text-gray-600 font-medium pb-3 text-xs uppercase tracking-wider">Revenue</th>
                <th class="text-gray-600 font-medium pb-3 text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-for="(p, i) in products" :key="i" class="group transition-colors">
                <td class="py-3 pr-4 group-hover:bg-em/[0.04]">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-display text-black"
                      :style="{ background: p.color }"
                    >{{ p.name[0] }}</div>
                    <span class="text-white font-medium">{{ p.name }}</span>
                  </div>
                </td>
                <td class="py-3 pr-4 text-gray-400 group-hover:bg-em/[0.04]">{{ p.sales.toLocaleString() }}</td>
                <td class="py-3 pr-4 font-display font-semibold text-white group-hover:bg-em/[0.04]">${{ p.revenue }}</td>
                <td class="py-3 group-hover:bg-em/[0.04]">
                  <span :class="[
                    'text-xs px-2.5 py-1 rounded-full font-medium',
                    p.trend === 'up'   ? 'bg-em/[0.12] text-em' :
                    p.trend === 'down' ? 'bg-red-500/[0.12] text-red-400' :
                                         'bg-white/[0.06] text-gray-400'
                  ]">
                    {{ p.trend === 'up' ? '↑ Growing' : p.trend === 'down' ? '↓ Falling' : '→ Stable' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Grouped Bar + Multi-Line -->
      <section class="grid lg:grid-cols-2 gap-4 mb-8">

        <div class="border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(52,211,153,0.06)] hover:border-em/[0.28] hover:shadow-[0_0_24px_rgba(52,211,153,0.07),inset_0_1px_0_rgba(52,211,153,0.1)] transition-[border-color,box-shadow] duration-300 rounded-2xl p-6 animate-fade-up [animation-delay:80ms]">
          <div class="flex items-center justify-between mb-1">
            <h2 class="font-display font-bold text-white">Sales by Channel</h2>
            <span class="text-xs text-gray-600 font-medium">Q1 2026 · Monthly</span>
          </div>
          <p class="text-xs text-gray-600 mb-5">Comparing Online, Retail &amp; Partner channels</p>
          <canvas ref="barGrouped" class="max-h-[260px]"></canvas>
        </div>

        <div class="border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(52,211,153,0.06)] hover:border-em/[0.28] hover:shadow-[0_0_24px_rgba(52,211,153,0.07),inset_0_1px_0_rgba(52,211,153,0.1)] transition-[border-color,box-shadow] duration-300 rounded-2xl p-6 animate-fade-up [animation-delay:160ms]">
          <div class="flex items-center justify-between mb-1">
            <h2 class="font-display font-bold text-white">Engagement Trends</h2>
            <span class="text-xs text-gray-600 font-medium">Last 8 weeks</span>
          </div>
          <p class="text-xs text-gray-600 mb-4">Users · Sessions · Pageviews</p>
          <div class="flex gap-4 mb-4">
            <span v-for="(l, i) in multiLineLabels" :key="i" class="flex items-center gap-1.5 text-xs text-gray-500">
              <span class="w-5 h-0.5 inline-block rounded" :style="{ background: l.color }"></span>{{ l.name }}
            </span>
          </div>
          <canvas ref="multiLine" class="max-h-[260px]"></canvas>
        </div>
      </section>

      <!-- Stacked Bar + Radar -->
      <section class="grid lg:grid-cols-5 gap-4 mb-8">

        <div class="border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(52,211,153,0.06)] hover:border-em/[0.28] hover:shadow-[0_0_24px_rgba(52,211,153,0.07),inset_0_1px_0_rgba(52,211,153,0.1)] transition-[border-color,box-shadow] duration-300 rounded-2xl p-6 lg:col-span-3 animate-fade-up [animation-delay:80ms]">
          <div class="flex items-center justify-between mb-1">
            <h2 class="font-display font-bold text-white">Revenue Stack</h2>
            <span class="text-xs text-gray-600 font-medium">By product · weekly</span>
          </div>
          <p class="text-xs text-gray-600 mb-4">Cumulative product contribution per week</p>
          <div class="flex flex-wrap gap-3 mb-5">
            <span v-for="(p, i) in products" :key="i" class="flex items-center gap-1.5 text-xs text-gray-500">
              <span class="w-2.5 h-2.5 rounded-sm inline-block" :style="{ background: p.color }"></span>{{ p.name }}
            </span>
          </div>
          <canvas ref="barStacked" class="max-h-[260px]"></canvas>
        </div>

        <div class="border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(52,211,153,0.06)] hover:border-em/[0.28] hover:shadow-[0_0_24px_rgba(52,211,153,0.07),inset_0_1px_0_rgba(52,211,153,0.1)] transition-[border-color,box-shadow] duration-300 rounded-2xl p-6 lg:col-span-2 animate-fade-up [animation-delay:160ms]">
          <div class="flex items-center justify-between mb-1">
            <h2 class="font-display font-bold text-white">KPI Radar</h2>
            <span class="text-xs text-gray-600 font-medium">This vs Last Qtr</span>
          </div>
          <p class="text-xs text-gray-600 mb-4">Performance across 6 dimensions</p>
          <div class="flex gap-4 mb-4">
            <span class="flex items-center gap-1.5 text-xs text-gray-500">
              <span class="w-5 h-0.5 rounded inline-block bg-em"></span>Q1 2026
            </span>
            <span class="flex items-center gap-1.5 text-xs text-gray-500">
              <span class="w-5 h-0.5 rounded inline-block bg-em/35"></span>Q4 2025
            </span>
          </div>
          <canvas ref="radarChart" class="max-h-[230px]"></canvas>
        </div>
      </section>

      <!-- Horizontal Bar -->
      <section class="border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(52,211,153,0.04),inset_0_1px_0_rgba(52,211,153,0.06)] hover:border-em/[0.28] hover:shadow-[0_0_24px_rgba(52,211,153,0.07),inset_0_1px_0_rgba(52,211,153,0.1)] transition-[border-color,box-shadow] duration-300 rounded-2xl p-6 mb-8 animate-fade-up [animation-delay:80ms]">
        <div class="flex items-center justify-between mb-1">
          <h2 class="font-display font-bold text-white">Top Acquisition Sources</h2>
          <span class="text-xs text-gray-600 font-medium">New users · Q1 2026</span>
        </div>
        <p class="text-xs text-gray-600 mb-6">Ranked by volume of new user acquisition</p>
        <canvas ref="barHorizontal" class="max-h-[200px]"></canvas>
      </section>

      <!-- Footer -->
      <footer class="text-center text-xs text-gray-700 py-4 animate-fade-up">
        Pulse Analytics · Generated March 30, 2026 · All data is illustrative
      </footer>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import {
  Chart,
  LineController, BarController, DoughnutController, RadarController,
  CategoryScale, LinearScale, RadialLinearScale,
  PointElement, LineElement, BarElement, ArcElement,
  Tooltip, Filler
} from 'chart.js'

Chart.register(
  LineController, BarController, DoughnutController, RadarController,
  CategoryScale, LinearScale, RadialLinearScale,
  PointElement, LineElement, BarElement, ArcElement,
  Tooltip, Filler
)

// ── Refs ──
const chartRange    = ref('3M')
const animated      = ref(false)
const lineChart     = ref(null)
const donutChart    = ref(null)
const barGrouped    = ref(null)
const multiLine     = ref(null)
const barStacked    = ref(null)
const radarChart    = ref(null)
const barHorizontal = ref(null)

// ── Static Data ──
const sources = [
  { label: 'Organic Search', pct: 42, color: 'rgb(52,211,153)'      },
  { label: 'Direct',         pct: 28, color: 'rgba(52,211,153,.55)' },
  { label: 'Social Media',   pct: 19, color: 'rgba(52,211,153,.28)' },
  { label: 'Referral',       pct: 11, color: 'rgba(52,211,153,.12)' },
]

const goals = [
  { label: 'Revenue Target',     pct: 88  },
  { label: 'New Customers',      pct: 74  },
  { label: 'Product Launches',   pct: 100 },
  { label: 'Support Resolution', pct: 62  },
  { label: 'Marketing ROI',      pct: 91  },
]

const products = [
  { name: 'Aurora Pro',  sales: 4210, revenue: '98.4k', trend: 'up',     color: 'rgb(52,211,153)'      },
  { name: 'Bolt Suite',  sales: 3870, revenue: '74.1k', trend: 'up',     color: '#34d399'               },
  { name: 'Nimbus Core', sales: 2150, revenue: '51.8k', trend: 'stable', color: 'rgba(52,211,153,.7)'  },
  { name: 'Zephyr Lite', sales: 1640, revenue: '38.2k', trend: 'down',   color: 'rgba(52,211,153,.4)'  },
  { name: 'Forge API',   sales: 980,  revenue: '22.0k', trend: 'up',     color: 'rgba(52,211,153,.25)' },
]

const multiLineLabels = [
  { name: 'Users',     color: 'rgb(52,211,153)'      },
  { name: 'Sessions',  color: 'rgba(52,211,153,.55)' },
  { name: 'Pageviews', color: 'rgba(52,211,153,.25)' },
]

// ── Shared tooltip defaults ──
const tooltipDefaults = {
  backgroundColor: '#0e1612',
  borderColor: 'rgba(52,211,153,0.3)',
  borderWidth: 1,
  titleColor: 'rgb(52,211,153)',
  bodyColor: '#9ca3af',
  padding: 10,
}

// ── Chart builders ──
function buildLineChart() {
  const ctx  = lineChart.value.getContext('2d')
  const grad = ctx.createLinearGradient(0, 0, 0, 220)
  grad.addColorStop(0, 'rgba(52,211,153,0.3)')
  grad.addColorStop(1, 'rgba(52,211,153,0.0)')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{
        label: 'Revenue',
        data: [42,55,48,67,73,61,88,95,82,104,97,115],
        borderColor: 'rgb(52,211,153)', borderWidth: 2.5,
        backgroundColor: grad, fill: true, tension: 0.45,
        pointBackgroundColor: 'rgb(52,211,153)', pointBorderColor: '#0a0f0d',
        pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipDefaults, callbacks: { label: c => ` $${c.raw}k` } },
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280', font: { size: 11 }, callback: v => `$${v}k` }, border: { dash: [4,4] } },
      },
    },
  })
}

function buildDonutChart() {
  const ctx = donutChart.value.getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sources.map(s => s.label),
      datasets: [{
        data: sources.map(s => s.pct),
        backgroundColor: sources.map(s => s.color),
        borderColor: '#0a0f0d', borderWidth: 3, hoverOffset: 6,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipDefaults, callbacks: { label: c => ` ${c.parsed}%` } },
      },
    },
  })
}

function buildBarGrouped() {
  const ctx = barGrouped.value.getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        { label: 'Online',  data: [38,52,61], backgroundColor: 'rgb(52,211,153)',       borderRadius: 6, borderSkipped: false },
        { label: 'Retail',  data: [24,31,28], backgroundColor: 'rgba(52,211,153,0.45)', borderRadius: 6, borderSkipped: false },
        { label: 'Partner', data: [14,18,22], backgroundColor: 'rgba(52,211,153,0.18)', borderRadius: 6, borderSkipped: false },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipDefaults, callbacks: { label: c => ` ${c.dataset.label}: $${c.raw}k` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#6b7280', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280', font: { size: 11 }, callback: v => `$${v}k` }, border: { dash: [4,4] } },
      },
    },
  })
}

function buildMultiLine() {
  const ctx   = multiLine.value.getContext('2d')
  const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8']
  const makeGrad = (a1, a2) => {
    const g = ctx.createLinearGradient(0, 0, 0, 240)
    g.addColorStop(0, `rgba(52,211,153,${a1})`)
    g.addColorStop(1, `rgba(52,211,153,${a2})`)
    return g
  }
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Users', data: [3200,3800,3500,4100,4600,4300,5000,5400],
          borderColor: 'rgb(52,211,153)', borderWidth: 2.5,
          backgroundColor: makeGrad(0.18, 0), fill: true, tension: 0.4,
          pointRadius: 3, pointBackgroundColor: 'rgb(52,211,153)', pointBorderColor: '#0a0f0d', pointBorderWidth: 2,
        },
        {
          label: 'Sessions', data: [5100,5900,5400,6500,7200,6800,7900,8600],
          borderColor: 'rgba(52,211,153,0.55)', borderWidth: 2,
          backgroundColor: makeGrad(0.08, 0), fill: true, tension: 0.4,
          pointRadius: 3, pointBackgroundColor: 'rgba(52,211,153,0.55)', pointBorderColor: '#0a0f0d', pointBorderWidth: 2,
        },
        {
          label: 'Pageviews', data: [14000,16500,15200,18900,21000,19500,23000,25500],
          borderColor: 'rgba(52,211,153,0.28)', borderWidth: 1.5, borderDash: [4,4],
          backgroundColor: 'transparent', fill: false, tension: 0.4,
          pointRadius: 2, pointBackgroundColor: 'rgba(52,211,153,0.28)',
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: tooltipDefaults },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280', font: { size: 11 } }, border: { dash: [4,4] } },
      },
    },
  })
}

function buildBarStacked() {
  const ctx    = barStacked.value.getContext('2d')
  const weeks  = ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 7','Wk 8']
  const colors = ['rgb(52,211,153)','rgba(52,211,153,.7)','rgba(52,211,153,.45)','rgba(52,211,153,.25)','rgba(52,211,153,.12)']
  const rawData = [
    [18,22,20,25,28,24,30,33],
    [14,17,16,20,22,19,24,27],
    [9, 11,10,13,14,12,16,18],
    [6,  7, 7, 9,10, 8,11,12],
    [3,  4, 4, 5, 5, 4, 6, 7],
  ]
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeks,
      datasets: products.map((p, i) => ({
        label: p.name, data: rawData[i],
        backgroundColor: colors[i],
        borderRadius: i === 0 ? 6 : 0, borderSkipped: false,
      })),
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipDefaults, callbacks: { label: c => ` ${c.dataset.label}: $${c.raw}k` } },
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: '#6b7280', font: { size: 11 } } },
        y: { stacked: true, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280', font: { size: 11 }, callback: v => `$${v}k` }, border: { dash: [4,4] } },
      },
    },
  })
}

function buildRadar() {
  const ctx = radarChart.value.getContext('2d')
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Revenue','Retention','NPS','Growth','Efficiency','Support'],
      datasets: [
        {
          label: 'Q1 2026', data: [88,74,82,91,78,85],
          borderColor: 'rgb(52,211,153)', borderWidth: 2,
          backgroundColor: 'rgba(52,211,153,0.12)',
          pointBackgroundColor: 'rgb(52,211,153)', pointRadius: 4,
          pointBorderColor: '#0a0f0d', pointBorderWidth: 2,
        },
        {
          label: 'Q4 2025', data: [72,68,75,80,71,77],
          borderColor: 'rgba(52,211,153,0.3)', borderWidth: 1.5, borderDash: [4,4],
          backgroundColor: 'rgba(52,211,153,0.04)',
          pointBackgroundColor: 'rgba(52,211,153,0.4)', pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: tooltipDefaults },
      scales: {
        r: {
          min: 0, max: 100,
          grid: { color: 'rgba(52,211,153,0.08)' },
          angleLines: { color: 'rgba(52,211,153,0.08)' },
          ticks: { display: false, stepSize: 25 },
          pointLabels: { color: '#9ca3af', font: { size: 11, family: 'DM Sans' } },
        },
      },
    },
  })
}

function buildBarHorizontal() {
  const ctx    = barHorizontal.value.getContext('2d')
  const srcs   = ['Google Search','Direct','Instagram','LinkedIn','Referral','TikTok','Email','Other']
  const values = [12400,8900,6200,4700,3800,3100,2400,1600]
  const maxVal = Math.max(...values)
  const colors = values.map(v => `rgba(52,211,153,${(0.25 + 0.75 * v / maxVal).toFixed(2)})`)
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: srcs,
      datasets: [{
        label: 'New Users', data: values,
        backgroundColor: colors, borderRadius: 5, borderSkipped: false,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipDefaults, callbacks: { label: c => ` ${c.raw.toLocaleString()} users` } },
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280', font: { size: 11 }, callback: v => v >= 1000 ? `${v / 1000}k` : v }, border: { dash: [4,4] } },
        y: { grid: { display: false }, ticks: { color: '#d1d5db', font: { size: 12 } } },
      },
    },
  })
}

// ── Lifecycle ──
onMounted(() => {
  nextTick(() => {
    buildLineChart()
    buildDonutChart()
    buildBarGrouped()
    buildMultiLine()
    buildBarStacked()
    buildRadar()
    buildBarHorizontal()
    setTimeout(() => { animated.value = true }, 300)
  })
})
</script>