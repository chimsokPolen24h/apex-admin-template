<template>
  <div>
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700"
    >
      <div>
        <h1
          class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
        >
          Users
        </h1>
      </div>
      <button
        class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-full md:w-auto"
      >
        + Invite User
      </button>
    </div>

    <!-- Card -->
    <div
      class="bg-white dark:bg-slate-800/60 rounded-2xl border border-gray-200 dark:border-slate-700/50 overflow-hidden"
    >
      <!-- Toolbar -->
      <div class="p-3 md:p-4 border-b border-gray-200 dark:border-slate-700/50">
        <div class="flex flex-col md:flex-row gap-2 md:gap-3">
          <input
            placeholder="Search users..."
            class="flex-1 px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            v-model="searchQuery"
          />
          <select
            class="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-48"
            v-model="selectedRole"
          >
            <option value="">All roles</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr
              class="border-b border-gray-200 dark:border-slate-700/50 bg-gray-50 dark:bg-slate-900/20"
            >
              <th
                class="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400"
              >
                User
              </th>
              <th
                class="hidden md:table-cell px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400"
              >
                Role
              </th>
              <th
                class="hidden md:table-cell px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400"
              >
                Joined
              </th>
              <th
                class="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400"
              >
                Status
              </th>
              <th
                class="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="border-b border-gray-100 dark:border-slate-700/30 hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors"
            >
              <td class="px-3 md:px-4 py-3">
                <div class="flex items-center gap-2">
                  <img
                    :src="user.avatar"
                    class="w-8 h-8 rounded-full"
                    :alt="user.name"
                  />
                  <div class="min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white truncate"
                    >
                      {{ user.name }}
                    </p>
                    <p
                      class="text-xs text-gray-500 dark:text-slate-400 truncate"
                    >
                      {{ user.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="hidden md:table-cell px-3 md:px-4 py-3">
                <span
                  :class="[
                    'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium',
                    roleClass(user.role),
                  ]"
                >
                  {{ user.role }}
                </span>
              </td>
              <td
                class="hidden md:table-cell px-3 md:px-4 py-3 text-sm text-gray-600 dark:text-slate-400"
              >
                {{ user.joined }}
              </td>
              <td class="px-3 md:px-4 py-3">
                <div class="flex items-center gap-2">
                  <span
                    :class="[
                      'w-2 h-2 rounded-full flex-shrink-0',
                      user.active ? 'bg-emerald-500' : 'bg-gray-300',
                    ]"
                  ></span>
                  <span
                    :class="
                      user.active
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-500 dark:text-slate-400'
                    "
                    class="text-xs font-medium"
                  >
                    {{ user.active ? "Active" : "Inactive" }}
                  </span>
                </div>
              </td>
              <td class="px-3 md:px-4 py-3">
                <div class="flex gap-2">
                  <button
                    class="px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-400/10 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    class="px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-4 p-3 md:p-4 border-t border-gray-200 dark:border-slate-700/50"
      >
        <span class="text-xs text-gray-600 dark:text-slate-400">
          Showing {{ filteredUsers.length }} of {{ users.length }} users
        </span>
        <div class="flex gap-2">
          <button
            v-for="p in totalPages"
            :key="p"
            :class="[
              'px-2 py-1 text-xs font-medium rounded transition-colors',
              p === 1
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600',
            ]"
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
      users: [
        {
          id: 1,
          name: "Sarah Chen",
          email: "s.chen@nexus.io",
          avatar: "https://i.pravatar.cc/40?img=5",
          role: "Admin",
          joined: "Jan 12, 2024",
          active: true,
        },
        {
          id: 2,
          name: "James Park",
          email: "j.park@nexus.io",
          avatar: "https://i.pravatar.cc/40?img=3",
          role: "Editor",
          joined: "Feb 3, 2024",
          active: true,
        },
        {
          id: 3,
          name: "Mia Torres",
          email: "m.torres@nexus.io",
          avatar: "https://i.pravatar.cc/40?img=9",
          role: "Viewer",
          joined: "Feb 18, 2024",
          active: false,
        },
        {
          id: 4,
          name: "Leo Wang",
          email: "l.wang@nexus.io",
          avatar: "https://i.pravatar.cc/40?img=7",
          role: "Editor",
          joined: "Mar 1, 2024",
          active: true,
        },
        {
          id: 5,
          name: "Priya Nair",
          email: "p.nair@nexus.io",
          avatar: "https://i.pravatar.cc/40?img=15",
          role: "Admin",
          joined: "Mar 10, 2024",
          active: true,
        },
        {
          id: 6,
          name: "Tom Reid",
          email: "t.reid@nexus.io",
          avatar: "https://i.pravatar.cc/40?img=11",
          role: "Viewer",
          joined: "Mar 20, 2024",
          active: false,
        },
        {
          id: 7,
          name: "Anya Kim",
          email: "a.kim@nexus.io",
          avatar: "https://i.pravatar.cc/40?img=20",
          role: "Editor",
          joined: "Mar 22, 2024",
          active: true,
        },
        {
          id: 8,
          name: "Carl Stein",
          email: "c.stein@nexus.io",
          avatar: "https://i.pravatar.cc/40?img=6",
          role: "Viewer",
          joined: "Mar 24, 2024",
          active: true,
        },
      ],
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((u) => {
        return (
          u.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.selectedRole === "" || u.role === this.selectedRole)
        );
      });
    },
    totalPages() {
      return 4; // you can calculate based on number of users
    },
  },
  methods: {
    roleClass(role) {
      switch (role) {
        case "Admin":
          return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
        case "Editor":
          return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400";
        case "Viewer":
          return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
table {
  min-width: 100%;
}

@media (max-width: 768px) {
  table {
    min-width: 500px;
  }
}
</style>
