<template>
  <div class="p-6 font-['DM_Sans',sans-serif] transition-colors duration-300">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6 animate-fadeIn">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white font-['Syne',sans-serif] tracking-tight">Users</h1>
        <p class="text-xs text-gray-500 dark:text-slate-400 mt-1">Manage your team members & permissions.</p>
      </div>
      <button class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-lg shadow-emerald-900/40 transition-all duration-200 hover:shadow-emerald-800/60 hover:-translate-y-0.5">
        <svg width="12" height="12" fill="none" viewBox="0 0 16 16">
          <path d="M8 2v12M2 8h12" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        Invite User
      </button>
    </div>

    <!-- Card -->
    <div class="bg-white dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/50 shadow-sm dark:shadow-none backdrop-blur-sm rounded-2xl overflow-hidden animate-fadeIn">

      <!-- Toolbar -->
      <div class="flex flex-col sm:flex-row gap-3 px-5 py-4 border-b border-gray-200 dark:border-slate-700/50">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" width="13" height="13" fill="none" viewBox="0 0 16 16">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input
            v-model="searchQuery"
            placeholder="Search users..."
            class="w-full bg-gray-50 dark:bg-slate-700/40 border border-gray-200 dark:border-slate-600/40 text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500/60 focus:bg-white dark:focus:bg-slate-700/60 transition-all duration-200"
          />
        </div>
        <select
          v-model="selectedRole"
          class="bg-gray-50 dark:bg-slate-700/40 border border-gray-200 dark:border-slate-600/40 text-gray-600 dark:text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/60 transition-all duration-200 cursor-pointer"
        >
          <option value="">All roles</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
      </div>

      <!-- Table -->
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-gray-200 dark:border-slate-700/50 bg-gray-50/70 dark:bg-transparent">
            <th class="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">User</th>
            <th class="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 hidden sm:table-cell">Role</th>
            <th class="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 hidden sm:table-cell">Joined</th>
            <th class="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">Status</th>
            <th class="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b border-gray-100 dark:border-slate-700/30 hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors duration-150 last:border-0 group"
          >
            <!-- User -->
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-3">
                <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-slate-700 group-hover:ring-gray-300 dark:group-hover:ring-slate-600 transition-all"/>
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{{ user.name }}</p>
                  <p class="text-[11px] text-gray-400 dark:text-slate-500">{{ user.email }}</p>
                </div>
              </div>
            </td>

            <!-- Role -->
            <td class="px-5 py-3.5 hidden sm:table-cell">
              <span class="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full" :class="roleClass(user.role)">
                {{ user.role }}
              </span>
            </td>

            <!-- Joined -->
            <td class="px-5 py-3.5 hidden sm:table-cell text-xs text-gray-400 dark:text-slate-500 tabular-nums">
              {{ user.joined }}
            </td>

            <!-- Status -->
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-2">
                <span
                  class="w-1.5 h-1.5 rounded-full shrink-0"
                  :class="user.active ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-gray-300 dark:bg-slate-500'"
                ></span>
                <span class="text-xs font-medium" :class="user.active ? 'text-emerald-500 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500'">
                  {{ user.active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </td>

            <!-- Actions -->
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-2">
                <button class="text-[11px] font-semibold px-3 py-1 rounded-lg bg-gray-100 dark:bg-slate-700/60 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600/60 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-slate-600/40 hover:border-gray-300 dark:hover:border-slate-500/60 transition-all duration-150">
                  Edit
                </button>
                <button class="text-[11px] font-semibold px-3 py-1 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/20 hover:border-rose-300 dark:hover:border-rose-500/40 transition-all duration-150">
                  Remove
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 px-5 py-4 border-t border-gray-200 dark:border-slate-700/50">
        <span class="text-xs text-gray-400 dark:text-slate-500">
          Showing <span class="text-gray-700 dark:text-slate-300 font-medium">{{ filteredUsers.length }}</span> of <span class="text-gray-700 dark:text-slate-300 font-medium">{{ users.length }}</span> users
        </span>
        <div class="flex items-center gap-1">
          <button
            v-for="p in totalPages"
            :key="p"
            class="w-7 h-7 rounded-lg text-xs font-semibold transition-all duration-150"
            :class="p === currentPage
              ? 'bg-emerald-500 text-white shadow shadow-emerald-900/40'
              : 'text-gray-400 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700/60'"
            @click="currentPage = p"
          >
            {{ p }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      selectedRole: "",
      currentPage: 1,
      users: [
        { id:1, name:"Sarah Chen",  email:"s.chen@nexus.io",   avatar:"https://i.pravatar.cc/40?img=5",  role:"Admin",  joined:"Jan 12, 2024", active:true  },
        { id:2, name:"James Park",  email:"j.park@nexus.io",   avatar:"https://i.pravatar.cc/40?img=3",  role:"Editor", joined:"Feb 3, 2024",  active:true  },
        { id:3, name:"Mia Torres",  email:"m.torres@nexus.io", avatar:"https://i.pravatar.cc/40?img=9",  role:"Viewer", joined:"Feb 18, 2024", active:false },
        { id:4, name:"Leo Wang",    email:"l.wang@nexus.io",   avatar:"https://i.pravatar.cc/40?img=7",  role:"Editor", joined:"Mar 1, 2024",  active:true  },
        { id:5, name:"Priya Nair",  email:"p.nair@nexus.io",   avatar:"https://i.pravatar.cc/40?img=15", role:"Admin",  joined:"Mar 10, 2024", active:true  },
        { id:6, name:"Tom Reid",    email:"t.reid@nexus.io",   avatar:"https://i.pravatar.cc/40?img=11", role:"Viewer", joined:"Mar 20, 2024", active:false },
        { id:7, name:"Anya Kim",    email:"a.kim@nexus.io",    avatar:"https://i.pravatar.cc/40?img=20", role:"Editor", joined:"Mar 22, 2024", active:true  },
        { id:8, name:"Carl Stein",  email:"c.stein@nexus.io",  avatar:"https://i.pravatar.cc/40?img=6",  role:"Viewer", joined:"Mar 24, 2024", active:true  },
      ],
    };
  },

  computed: {
    filteredUsers() {
      return this.users.filter(u =>
        u.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedRole === "" || u.role === this.selectedRole)
      );
    },
    totalPages() {
      return 4;
    },
  },

  methods: {
    roleClass(role) {
      return {
        Admin:  "bg-violet-100 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-400/20",
        Editor: "bg-amber-100  dark:bg-amber-400/10  text-amber-600  dark:text-amber-400  border border-amber-200  dark:border-amber-400/20",
        Viewer: "bg-sky-100    dark:bg-sky-400/10    text-sky-600    dark:text-sky-400    border border-sky-200    dark:border-sky-400/20",
      }[role] ?? "";
    },
  },
};
</script>