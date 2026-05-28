<template>
  <div class="p-6 font-['DM_Sans',sans-serif] bg-slate-50 dark:bg-transparent min-h-full">

    <!-- Header -->
    <div class="mb-6 animate-fadeIn">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white font-['Syne',sans-serif] tracking-tight">Profile</h1>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences</p>
    </div>

    <div class="flex flex-col gap-4">

      <!-- Profile Card -->
      <div class="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none backdrop-blur-sm rounded-2xl overflow-hidden animate-fadeIn">
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-700/50">
          <h2 class="text-sm font-bold text-slate-900 dark:text-white font-['Syne',sans-serif]">Profile</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Update your personal information</p>
        </div>

        <div class="p-5">
          <!-- Avatar Row -->
          <div class="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/40">
            <div class="relative">
              <img
                src="../../assets//image/profile2.webp"
                alt="Profile"
                class="w-16 h-16 rounded-2xl ring-2 ring-slate-200 dark:ring-slate-700 object-cover"
              />
              <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 shadow-lg shadow-emerald-900/20 dark:shadow-emerald-900/40"></span>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-white">Chim Sokpolen</p>
              <p class="text-xs text-slate-400 dark:text-slate-500 mb-2">polen@apex.io</p>
              <button class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-400/10 hover:bg-emerald-100 dark:hover:bg-emerald-400/15 border border-emerald-200 dark:border-emerald-400/20 transition-all duration-150">
                Change photo
              </button>
            </div>
          </div>

          <!-- Form Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">First name</label>
              <input
                value="Polen"
                class="bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600/40 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500/60 focus:bg-white dark:focus:bg-slate-700/60 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Last name</label>
              <input
                value="Chim"
                class="bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600/40 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500/60 focus:bg-white dark:focus:bg-slate-700/60 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200"
              />
            </div>
            <div class="flex flex-col gap-1.5 sm:col-span-2">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Email</label>
              <input
                value="polen@apex.io"
                class="bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600/40 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500/60 focus:bg-white dark:focus:bg-slate-700/60 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200"
              />
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