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
            Orders
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Track and manage customer orders
          </p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 sm:p-6">
      <!-- Search & Filters -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="sm:col-span-2">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search order ID or customer..."
              class="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
        <select
          v-model="statusFilter"
          class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <!-- Status Tabs -->
      <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          v-for="status in [
            'All',
            'Pending',
            'Processing',
            'Shipped',
            'Delivered',
          ]"
          :key="status"
          @click="statusFilter = status === 'All' ? '' : status"
          :class="[
            'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition text-sm',
            (!statusFilter && status === 'All') || statusFilter === status
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
          ]"
        >
          {{ status }}
        </button>
      </div>

      <!-- Orders Table -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead
              class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
            >
              <tr>
                <th
                  class="px-4 sm:px-6 py-3 text-left font-semibold text-gray-900 dark:text-white"
                >
                  Order ID
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left font-semibold text-gray-900 dark:text-white"
                >
                  Customer
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left font-semibold text-gray-900 dark:text-white"
                >
                  Amount
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left font-semibold text-gray-900 dark:text-white"
                >
                  Date
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
                v-for="order in filteredOrders"
                :key="order.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              >
                <td
                  class="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  #{{ order.id }}
                </td>
                <td class="px-4 sm:px-6 py-4 text-gray-900 dark:text-white">
                  {{ order.customer }}
                </td>
                <td
                  class="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white"
                >
                  ${{ order.amount }}
                </td>
                <td
                  class="px-4 sm:px-6 py-4 text-gray-600 dark:text-gray-400 text-sm"
                >
                  {{ order.date }}
                </td>
                <td class="px-4 sm:px-6 py-4">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      order.status === 'Delivered'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : order.status === 'Shipped'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : order.status === 'Processing'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                            : order.status === 'Pending'
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-4 sm:px-6 py-4 text-center">
                  <button
                    @click="viewOrder(order)"
                    class="text-blue-500 hover:text-blue-600 font-medium text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto"
      >
        <div v-if="selectedOrder" class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Order #{{ selectedOrder.id }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ selectedOrder.date }}
              </p>
            </div>
            <button
              @click="showModal = false"
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

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Customer</p>
              <p class="font-semibold text-gray-900 dark:text-white">
                {{ selectedOrder.customer }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Amount</p>
              <p class="font-semibold text-gray-900 dark:text-white">
                ${{ selectedOrder.amount }}
              </p>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
            <p class="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Order Items
            </p>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400"
                  >Wireless Headphones x2</span
                >
                <span class="font-medium text-gray-900 dark:text-white"
                  >$159.98</span
                >
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400"
                  >Phone Case x1</span
                >
                <span class="font-medium text-gray-900 dark:text-white"
                  >$24.99</span
                >
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
            <p class="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Update Status
            </p>
            <select
              v-model="selectedOrder.status"
              class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>

          <div class="flex gap-3">
            <button
              @click="showModal = false"
              class="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Close
            </button>
            <button
              @click="showModal = false"
              class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      searchQuery: "",
      statusFilter: "",
      showModal: false,
      selectedOrder: null,
      orders: [
        {
          id: 1001,
          customer: "John Doe",
          amount: 184.97,
          date: "Jun 01, 2024",
          status: "Delivered",
        },
        {
          id: 1002,
          customer: "Jane Smith",
          amount: 89.99,
          date: "May 31, 2024",
          status: "Shipped",
        },
        {
          id: 1003,
          customer: "Mike Johnson",
          amount: 124.98,
          date: "May 30, 2024",
          status: "Processing",
        },
        {
          id: 1004,
          customer: "Sarah Williams",
          amount: 259.97,
          date: "May 29, 2024",
          status: "Pending",
        },
        {
          id: 1005,
          customer: "David Brown",
          amount: 79.99,
          date: "May 28, 2024",
          status: "Delivered",
        },
        {
          id: 1006,
          customer: "John Doe",
          amount: 149.98,
          date: "May 27, 2024",
          status: "Delivered",
        },
      ],
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter((order) => {
        const matchStatus =
          !this.statusFilter || order.status === this.statusFilter;
        const matchSearch =
          String(order.id).includes(this.searchQuery) ||
          order.customer.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchStatus && matchSearch;
      });
    },
  },
  methods: {
    viewOrder(order) {
      this.selectedOrder = { ...order };
      this.showModal = true;
    },
  },
};
</script>
