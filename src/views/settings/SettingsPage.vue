<template>
  <div class="p-6 font-['DM_Sans',sans-serif]">

    <!-- Header -->
    <div class="mb-6 animate-fadeIn">
      <h1 class="text-2xl font-bold text-white font-['Syne',sans-serif] tracking-tight">Settings</h1>
      <p class="text-xs text-slate-400 mt-1">Manage your account preferences</p>
    </div>

    <div class="flex flex-col gap-4">

      <!-- Profile Card -->
      <div class="bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm rounded-2xl overflow-hidden animate-fadeIn">
        <div class="px-5 py-4 border-b border-slate-700/50">
          <h2 class="text-sm font-bold text-white font-['Syne',sans-serif]">Profile</h2>
          <p class="text-xs text-slate-400 mt-0.5">Update your personal information</p>
        </div>

        <div class="p-5">
          <!-- Avatar Row -->
          <div class="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700/40">
            <div class="relative">
              <img
                src="../../assets/image/profile.webp"
                alt="Profile"
                class="w-16 h-16 rounded-2xl ring-2 ring-slate-700 object-cover"
              />
              <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-800 shadow-lg shadow-emerald-900/40"></span>
            </div>
            <div>
              <p class="text-sm font-semibold text-white">Sokpolen Chim</p>
              <p class="text-xs text-slate-500 mb-2">polen@apex.io</p>
              <button class="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 px-3 py-1 rounded-lg bg-emerald-400/10 hover:bg-emerald-400/15 border border-emerald-400/20 transition-all duration-150">
                Change photo
              </button>
            </div>
          </div>

          <!-- Form Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-slate-500">First name</label>
              <input
                value="Sokpolen"
                class="bg-slate-700/40 border border-slate-600/40 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 focus:bg-slate-700/60 placeholder-slate-500 transition-all duration-200"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Last name</label>
              <input
                value="Chim"
                class="bg-slate-700/40 border border-slate-600/40 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 focus:bg-slate-700/60 placeholder-slate-500 transition-all duration-200"
              />
            </div>
            <div class="flex flex-col gap-1.5 sm:col-span-2">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Email</label>
              <input
                value="polen@apex.io"
                class="bg-slate-700/40 border border-slate-600/40 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 focus:bg-slate-700/60 placeholder-slate-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications Card -->
      <div class="bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm rounded-2xl overflow-hidden animate-fadeIn">
        <div class="px-5 py-4 border-b border-slate-700/50">
          <h2 class="text-sm font-bold text-white font-['Syne',sans-serif]">Notifications</h2>
          <p class="text-xs text-slate-400 mt-0.5">Choose what updates you want to receive</p>
        </div>

        <div class="divide-y divide-slate-700/40">
          <div
            v-for="notif in notifications"
            :key="notif.label"
            class="flex items-center justify-between px-5 py-4 hover:bg-slate-700/15 transition-colors duration-150"
          >
            <div>
              <p class="text-sm font-medium text-white">{{ notif.label }}</p>
              <p class="text-xs text-slate-500 mt-0.5">{{ notif.desc }}</p>
            </div>

            <!-- Toggle -->
            <button
              @click="notif.on = !notif.on"
              class="relative w-10 h-5.5 rounded-full transition-all duration-300 focus:outline-none shrink-0"
              :class="notif.on ? 'bg-emerald-500 shadow-lg shadow-emerald-900/40' : 'bg-slate-700'"
            >
              <span
                class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
                :class="notif.on ? 'translate-x-[18px]' : 'translate-x-0'"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end animate-fadeIn">
        <button class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg shadow-emerald-900/40 transition-all duration-200 hover:shadow-emerald-800/60 hover:-translate-y-0.5">
          Save Changes
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePage: 'settings',
      notifications: [
        { label: 'Email Alerts',        desc: 'Receive important updates via email',  on: true  },
        { label: 'Push Notifications',  desc: 'Get notified in your browser',         on: false },
        { label: 'Weekly Digest',       desc: 'Summary of your activity',             on: true  },
        { label: 'Security Alerts',     desc: 'Login attempts and changes',           on: true  },
      ],
    };
  },
};
</script>

<!-- <style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.45s ease both; }
</style> -->