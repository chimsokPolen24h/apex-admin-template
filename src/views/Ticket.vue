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
            Support Tickets
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Manage customer support requests
          </p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 sm:p-6">
      <!-- Search -->
      <div class="mb-6">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search ticket ID or subject..."
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

      <!-- Filter Tabs -->
      <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="activeFilter = filter"
          :class="[
            'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition text-sm',
            activeFilter === filter
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
          ]"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Tickets Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          @click="selectTicket(ticket)"
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition cursor-pointer"
          :class="{ 'ring-2 ring-blue-500': selectedTicket?.id === ticket.id }"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span
                  class="text-sm font-semibold text-gray-600 dark:text-gray-400"
                  >#{{ ticket.id }}</span
                >
                <span
                  :class="[
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    ticket.status === 'Open'
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : ticket.status === 'In Progress'
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
                  ]"
                >
                  {{ ticket.status }}
                </span>
              </div>
              <h3
                class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white"
              >
                {{ ticket.subject }}
              </h3>
            </div>
            <span
              :class="[
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0',
                ticket.priority === 'High'
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  : ticket.priority === 'Medium'
                    ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                    : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
              ]"
            >
              {{ ticket.priority }}
            </span>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {{ ticket.description }}
          </p>

          <div
            class="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  ></path>
                </svg>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{
                ticket.customer
              }}</span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{
              ticket.date
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Panel -->
    <div
      v-if="selectedTicket"
      class="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700 flex flex-col z-40"
    >
      <!-- Header -->
      <div
        class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
      >
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">
          Ticket Details
        </h2>
        <button
          @click="selectedTicket = null"
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

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        <div>
          <p
            class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
          >
            Ticket ID
          </p>
          <p class="text-gray-900 dark:text-white font-medium">
            #{{ selectedTicket.id }}
          </p>
        </div>

        <div>
          <p
            class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
          >
            Subject
          </p>
          <p class="text-gray-900 dark:text-white font-medium">
            {{ selectedTicket.subject }}
          </p>
        </div>

        <div>
          <p
            class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
          >
            Customer
          </p>
          <p class="text-gray-900 dark:text-white font-medium">
            {{ selectedTicket.customer }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p
              class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
            >
              Status
            </p>
            <span
              :class="[
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1',
                selectedTicket.status === 'Open'
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  : selectedTicket.status === 'In Progress'
                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
              ]"
            >
              {{ selectedTicket.status }}
            </span>
          </div>
          <div>
            <p
              class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
            >
              Priority
            </p>
            <span
              :class="[
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1',
                selectedTicket.priority === 'High'
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  : selectedTicket.priority === 'Medium'
                    ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                    : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
              ]"
            >
              {{ selectedTicket.priority }}
            </span>
          </div>
        </div>

        <div>
          <p
            class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
          >
            Description
          </p>
          <p class="text-gray-900 dark:text-white text-sm mt-1">
            {{ selectedTicket.description }}
          </p>
        </div>

        <div>
          <p
            class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
          >
            Created
          </p>
          <p class="text-gray-900 dark:text-white text-sm">
            {{ selectedTicket.date }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div
        class="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 space-y-2"
      >
        <button
          class="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
        >
          Update Status
        </button>
        <button
          class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Add Note
        </button>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="selectedTicket"
      class="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-30"
      @click="selectedTicket = null"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Ticket",
  data() {
    return {
      searchQuery: "",
      activeFilter: "All",
      selectedTicket: null,
      filters: ["All", "Open", "In Progress", "Resolved"],
      tickets: [
        {
          id: "TK-001",
          subject: "Product not working",
          description: "The wireless headphones stopped working after 2 days",
          customer: "John Doe",
          status: "Open",
          priority: "High",
          date: "Jun 01, 2024",
        },
        {
          id: "TK-002",
          subject: "Shipping delay",
          description: "Order delayed for more than a week",
          customer: "Jane Smith",
          status: "In Progress",
          priority: "Medium",
          date: "May 31, 2024",
        },
        {
          id: "TK-003",
          subject: "Refund request",
          description: "Need to request refund for defective item",
          customer: "Mike Johnson",
          status: "Resolved",
          priority: "Low",
          date: "May 30, 2024",
        },
        {
          id: "TK-004",
          subject: "Order confirmation issue",
          description: "Did not receive order confirmation email",
          customer: "Sarah Williams",
          status: "Open",
          priority: "High",
          date: "May 29, 2024",
        },
        {
          id: "TK-005",
          subject: "Tracking not updating",
          description: "Package tracking stopped updating",
          customer: "David Brown",
          status: "In Progress",
          priority: "Medium",
          date: "May 28, 2024",
        },
        {
          id: "TK-006",
          subject: "Wrong item received",
          description: "Received different product than ordered",
          customer: "John Doe",
          status: "Resolved",
          priority: "High",
          date: "May 27, 2024",
        },
      ],
    };
  },
  computed: {
    filteredTickets() {
      return this.tickets.filter((ticket) => {
        const matchFilter =
          this.activeFilter === "All" || ticket.status === this.activeFilter;
        const matchSearch =
          ticket.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchFilter && matchSearch;
      });
    },
  },
  methods: {
    selectTicket(ticket) {
      this.selectedTicket = ticket;
    },
  },
};
</script>
