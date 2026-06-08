<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1
            class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
          >
            Customers
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Manage your customer base
          </p>
        </div>
        <button
          @click="openModal = true"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add Customer
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Total Customers
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              1,256
            </p>
          </div>
          <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
            <svg
              class="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 12a6 6 0 11-12 0 6 6 0 0112 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Active This Month
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              342
            </p>
          </div>
          <div class="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
            <svg
              class="w-6 h-6 text-green-600 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM2 8a2 2 0 11-4 0 2 2 0 014 0zM5 15a4 4 0 00-4 4v2h4v-2zM16 15a2 2 0 100-4 2 2 0 000 4z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Total Revenue
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              $125,300
            </p>
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
            <svg
              class="w-6 h-6 text-purple-600 dark:text-purple-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M8.16 5.314l4.897-1.596A1 1 0 0014 4.69v4.622a5 5 0 01-.564 2.196l5.192 1.745a1 1 0 01.564 1.366l-2.477 7.432a1 1 0 01-1.928.06L5.892 5.5a1 1 0 011.268-1.186z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Avg. Order Value
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              $327.45
            </p>
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
            <svg
              class="w-6 h-6 text-orange-600 dark:text-orange-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Table -->
    <div class="p-4 sm:p-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <!-- Search Bar -->
        <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search customers by name, email..."
              class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            />
            <svg
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead
              class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
            >
              <tr>
                <th
                  class="px-4 sm:px-6 py-3 text-left font-semibold text-gray-900 dark:text-white"
                >
                  Name
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left font-semibold text-gray-900 dark:text-white"
                >
                  Email
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left font-semibold text-gray-900 dark:text-white"
                >
                  Phone
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left font-semibold text-gray-900 dark:text-white"
                >
                  Total Purchases
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left font-semibold text-gray-900 dark:text-white"
                >
                  Status
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-center font-semibold text-gray-900 dark:text-white"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="customer in filteredCustomers"
                :key="customer.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              >
                <td
                  class="px-4 sm:px-6 py-4 text-gray-900 dark:text-white font-medium"
                >
                  {{ customer.name }}
                </td>
                <td
                  class="px-4 sm:px-6 py-4 text-gray-600 dark:text-gray-400 text-sm"
                >
                  {{ customer.email }}
                </td>
                <td class="px-4 sm:px-6 py-4 text-gray-600 dark:text-gray-400">
                  {{ customer.phone }}
                </td>
                <td
                  class="px-4 sm:px-6 py-4 text-gray-900 dark:text-white font-semibold"
                >
                  {{ customer.purchases }}
                </td>
                <td class="px-4 sm:px-6 py-4">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      customer.status === 'Active'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
                    ]"
                  >
                    {{ customer.status }}
                  </span>
                </td>
                <td class="px-4 sm:px-6 py-4 text-center">
                  <button
                    @click="viewCustomer(customer)"
                    class="text-blue-500 hover:text-blue-600 font-medium text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm"
        >
          <p class="text-gray-600 dark:text-gray-400">
            Showing 1-5 of 50 customers
          </p>
          <div class="flex gap-2">
            <button
              class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Previous
            </button>
            <button
              class="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              1
            </button>
            <button
              class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              2
            </button>
            <button
              class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Modal -->
    <div
      v-if="openModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
      >
        <div
          class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
        >
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            Customer Profile
          </h2>
          <button
            @click="openModal = false"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div v-if="selectedCustomer" class="p-6 space-y-4">
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              {{ selectedCustomer.name }}
            </h3>
          </div>

          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Email</p>
            <p class="text-gray-900 dark:text-white font-medium">
              {{ selectedCustomer.email }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Phone</p>
            <p class="text-gray-900 dark:text-white font-medium">
              {{ selectedCustomer.phone }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Total Purchases
            </p>
            <p class="text-gray-900 dark:text-white font-medium">
              {{ selectedCustomer.purchases }} Orders
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
            <p class="text-gray-900 dark:text-white font-medium">
              {{ selectedCustomer.joinDate }}
            </p>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <p class="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Recent Orders
            </p>
            <div class="space-y-2">
              <div
                v-for="order in selectedCustomer.recentOrders"
                :key="order"
                class="text-sm text-gray-600 dark:text-gray-400"
              >
                {{ order }}
              </div>
            </div>
          </div>

          <button
            @click="openModal = false"
            class="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Customer",
  data() {
    return {
      searchQuery: "",
      openModal: false,
      selectedCustomer: null,
      customers: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "+1-555-0100",
          purchases: 12,
          status: "Active",
          joinDate: "Jan 15, 2024",
          recentOrders: ["Order #1001", "Order #1002", "Order #1003"],
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1-555-0101",
          purchases: 8,
          status: "Active",
          joinDate: "Feb 20, 2024",
          recentOrders: ["Order #1004", "Order #1005"],
        },
        {
          id: 3,
          name: "Mike Johnson",
          email: "mike@example.com",
          phone: "+1-555-0102",
          purchases: 5,
          status: "Inactive",
          joinDate: "Mar 10, 2024",
          recentOrders: ["Order #1006"],
        },
        {
          id: 4,
          name: "Sarah Williams",
          email: "sarah@example.com",
          phone: "+1-555-0103",
          purchases: 15,
          status: "Active",
          joinDate: "Jan 05, 2024",
          recentOrders: ["Order #1007", "Order #1008", "Order #1009"],
        },
        {
          id: 5,
          name: "David Brown",
          email: "david@example.com",
          phone: "+1-555-0104",
          purchases: 3,
          status: "Active",
          joinDate: "Apr 22, 2024",
          recentOrders: ["Order #1010"],
        },
      ],
    };
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter((customer) => {
        const query = this.searchQuery.toLowerCase();
        return (
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query)
        );
      });
    },
  },
  methods: {
    viewCustomer(customer) {
      this.selectedCustomer = customer;
      this.openModal = true;
    },
  },
};
</script>
