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
            Invoices
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            View and manage your invoices
          </p>
        </div>
        <router-link
          to="/invoices/create"
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
          New Invoice
        </router-link>
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
              placeholder="Search invoice number..."
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
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <!-- Invoices Table -->
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
                  Invoice #
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
                v-for="invoice in filteredInvoices"
                :key="invoice.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              >
                <td
                  class="px-4 sm:px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {{ invoice.number }}
                </td>
                <td class="px-4 sm:px-6 py-4 text-gray-900 dark:text-white">
                  {{ invoice.customer }}
                </td>
                <td
                  class="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white"
                >
                  ${{ invoice.amount }}
                </td>
                <td class="px-4 sm:px-6 py-4 text-gray-600 dark:text-gray-400">
                  {{ invoice.date }}
                </td>
                <td class="px-4 sm:px-6 py-4">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      invoice.status === 'Paid'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : invoice.status === 'Sent'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : invoice.status === 'Draft'
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
                    ]"
                  >
                    {{ invoice.status }}
                  </span>
                </td>
                <td class="px-4 sm:px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <router-link
                      :to="`/invoices/${invoice.id}`"
                      class="text-blue-500 hover:text-blue-600 font-medium text-sm"
                    >
                      View
                    </router-link>
                    <router-link
                      :to="`/invoices/${invoice.id}/edit`"
                      class="text-green-500 hover:text-green-600 font-medium text-sm"
                    >
                      Edit
                    </router-link>
                    <button
                      @click="deleteInvoice(invoice.id)"
                      class="text-red-500 hover:text-red-600 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredInvoices.length === 0" class="p-8 text-center">
          <svg
            class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <p class="text-gray-600 dark:text-gray-400 mb-4">No invoices found</p>
          <router-link
            to="/invoices/create"
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
          >
            Create Invoice
          </router-link>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredInvoices.length > 0"
          class="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm"
        >
          <p class="text-gray-600 dark:text-gray-400">
            Showing {{ filteredInvoices.length }} invoices
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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceList",
  data() {
    return {
      searchQuery: "",
      statusFilter: "",
      invoices: [
        {
          id: 1,
          number: "INV-001",
          customer: "Acme Corp",
          amount: 2500.0,
          date: "Jun 01, 2024",
          status: "Paid",
        },
        {
          id: 2,
          number: "INV-002",
          customer: "Tech Solutions",
          amount: 1800.5,
          date: "May 30, 2024",
          status: "Sent",
        },
        {
          id: 3,
          number: "INV-003",
          customer: "Global Inc",
          amount: 3200.0,
          date: "May 28, 2024",
          status: "Draft",
        },
        {
          id: 4,
          number: "INV-004",
          customer: "Digital Minds",
          amount: 950.75,
          date: "May 25, 2024",
          status: "Overdue",
        },
        {
          id: 5,
          number: "INV-005",
          customer: "Creative Agency",
          amount: 4100.0,
          date: "May 20, 2024",
          status: "Paid",
        },
      ],
    };
  },
  computed: {
    filteredInvoices() {
      return this.invoices.filter((invoice) => {
        const matchStatus =
          !this.statusFilter || invoice.status === this.statusFilter;
        const matchSearch = invoice.number
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        return matchStatus && matchSearch;
      });
    },
  },
  methods: {
    deleteInvoice(id) {
      if (confirm("Are you sure you want to delete this invoice?")) {
        this.invoices = this.invoices.filter((inv) => inv.id !== id);
      }
    },
  },
};
</script>
