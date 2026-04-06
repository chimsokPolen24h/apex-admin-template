<template>
  <header
    class="flex justify-between items-center bg-slate-900 px-5 py-3 text-white relative z-50"
  >
    <!-- LEFT -->
    <div class="flex items-center gap-3">
      <button @click="$emit('toggle-sidebar')" class="text-xl">☰</button>

      <div class="bg-slate-800 px-3 py-1 rounded-md">
        <input
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          placeholder="Search..."
          class="bg-transparent outline-none text-white"
        />
      </div>
    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-4">
      <button>🔔</button>

      <!-- Profile -->
      <div class="relative cursor-pointer" @click="toggleDropdown">
        <img
          src="../../assets//image/profile2.webp"
          class="w-10 h-10 rounded-full"
        />

        <!-- Dropdown -->
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-40 bg-slate-800 rounded-lg shadow-lg z-50"
        >
          <p class="px-4 py-2 hover:bg-slate-700">Profile</p>
          <p class="px-4 py-2 hover:bg-slate-700">Settings</p>
          <router-link to="/signin" class="block px-4 py-2 hover:bg-slate-700">
            Logout
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["searchQuery"],
  emits: ["toggle-sidebar", "update:searchQuery"],

  data() {
    return {
      showDropdown: false,
    };
  },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false;
      }
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>
