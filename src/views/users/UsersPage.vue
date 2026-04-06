<template>
  <div>
    <!-- Header -->
    <div class="page-header fadein">
      <h1 class="page-title">Users</h1>
      <button class="btn-primary">+ Invite User</button>
    </div>

    <!-- Card -->
    <div class="card fadein">
      <!-- Toolbar -->
      <div class="card__toolbar">
        <input
          placeholder="Search users..."
          class="toolbar-search"
          v-model="searchQuery"
        />
        <select class="toolbar-select" v-model="selectedRole">
          <option value="">All roles</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
      </div>

      <!-- Table -->
      <table class="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th class="hide-sm">Role</th>
            <th class="hide-sm">Joined</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="data-table__row"
          >
            <td>
              <div class="user-cell">
                <img :src="user.avatar" class="cell-avatar" :alt="user.name" />
                <div>
                  <p class="cell-name">{{ user.name }}</p>
                  <p class="cell-sub">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="hide-sm">
              <span :class="['role-badge', roleClass(user.role)]">
                {{ user.role }}
              </span>
            </td>
            <td class="hide-sm cell-meta">{{ user.joined }}</td>
            <td>
              <div class="status-indicator">
                <span
                  :class="[
                    'status-dot',
                    user.active ? 'status-dot--on' : 'status-dot--off'
                  ]"
                ></span>
                <span :class="user.active ? 'text-on' : 'text-off'">
                  {{ user.active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </td>
            <td>
              <div class="action-btns">
                <button class="action-edit">Edit</button>
                <button class="action-delete">Remove</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div class="card__footer">
        <span class="footer-meta">
          Showing {{ filteredUsers.length }} of {{ users.length }} users
        </span>
        <div class="pagination">
          <button
            v-for="p in totalPages"
            :key="p"
            :class="['page-btn', p === 1 && 'page-btn--active']"
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
        { id: 1, name: "Sarah Chen", email: "s.chen@nexus.io", avatar: "https://i.pravatar.cc/40?img=5", role: "Admin", joined: "Jan 12, 2024", active: true },
        { id: 2, name: "James Park", email: "j.park@nexus.io", avatar: "https://i.pravatar.cc/40?img=3", role: "Editor", joined: "Feb 3, 2024", active: true },
        { id: 3, name: "Mia Torres", email: "m.torres@nexus.io", avatar: "https://i.pravatar.cc/40?img=9", role: "Viewer", joined: "Feb 18, 2024", active: false },
        { id: 4, name: "Leo Wang", email: "l.wang@nexus.io", avatar: "https://i.pravatar.cc/40?img=7", role: "Editor", joined: "Mar 1, 2024", active: true },
        { id: 5, name: "Priya Nair", email: "p.nair@nexus.io", avatar: "https://i.pravatar.cc/40?img=15", role: "Admin", joined: "Mar 10, 2024", active: true },
        { id: 6, name: "Tom Reid", email: "t.reid@nexus.io", avatar: "https://i.pravatar.cc/40?img=11", role: "Viewer", joined: "Mar 20, 2024", active: false },
        { id: 7, name: "Anya Kim", email: "a.kim@nexus.io", avatar: "https://i.pravatar.cc/40?img=20", role: "Editor", joined: "Mar 22, 2024", active: true },
        { id: 8, name: "Carl Stein", email: "c.stein@nexus.io", avatar: "https://i.pravatar.cc/40?img=6", role: "Viewer", joined: "Mar 24, 2024", active: true },
      ]
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(u => {
        return (
          u.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.selectedRole === "" || u.role === this.selectedRole)
        );
      });
    },
    totalPages() {
      return 4; // you can calculate based on number of users
    }
  },
  methods: {
    roleClass(role) {
      switch (role) {
        case "Admin": return "role-admin";
        case "Editor": return "role-editor";
        case "Viewer": return "role-viewer";
        default: return "";
      }
    }
  }
};
</script>