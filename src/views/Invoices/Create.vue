<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div class="flex items-center gap-4">
          <router-link
            to="/invoices"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </router-link>
          <div>
            <h1
              class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
            >
              Create Invoice
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Create a new invoice
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="p-4 sm:p-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
      >
        <div class="p-6 sm:p-8 space-y-6">
          <!-- Customer Selection -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                class="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
                >Customer</label
              >
              <select
                v-model="formData.customer"
                class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select a customer</option>
                <option value="Acme Corp">Acme Corp</option>
                <option value="Tech Solutions">Tech Solutions</option>
                <option value="Global Inc">Global Inc</option>
                <option value="Digital Minds">Digital Minds</option>
              </select>
            </div>
            <div>
              <label
                class="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
                >Invoice Date</label
              >
              <input
                v-model="formData.date"
                type="date"
                class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <!-- Product Selection -->
          <div>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Invoice Items
            </h3>
            <div class="space-y-3 mb-4">
              <div
                v-for="(item, index) in formData.items"
                :key="index"
                class="grid grid-cols-1 sm:grid-cols-5 gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <select
                  v-model="item.description"
                  class="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                >
                  <option>Professional Services</option>
                  <option>Software License</option>
                  <option>Hardware</option>
                  <option>Consulting</option>
                </select>
                <input
                  v-model.number="item.qty"
                  type="number"
                  min="1"
                  placeholder="Qty"
                  class="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                />
                <input
                  v-model.number="item.price"
                  type="number"
                  placeholder="Price"
                  class="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                />
                <div
                  class="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-gray-900 dark:text-white text-sm font-semibold flex items-center"
                >
                  ${{ (item.qty * item.price).toFixed(2) }}
                </div>
                <button
                  @click="removeItem(index)"
                  class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition"
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              @click="addItem"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
            >
              + Add Item
            </button>
          </div>

          <!-- Payment Method -->
          <div>
            <label
              class="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
              >Payment Method</label
            >
            <select
              v-model="formData.paymentMethod"
              class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Check">Check</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <!-- Notes -->
          <div>
            <label
              class="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
              >Notes</label
            >
            <textarea
              v-model="formData.notes"
              placeholder="Add any additional notes or payment terms..."
              rows="3"
              class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <!-- Summary -->
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <div class="flex justify-between text-gray-900 dark:text-white">
              <span>Subtotal:</span>
              <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-900 dark:text-white">
              <span>Tax (0%):</span>
              <span class="font-semibold">$0.00</span>
            </div>
            <div
              class="flex justify-between text-lg font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-600 pt-2"
            >
              <span>Total:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-6">
            <router-link
              to="/invoices"
              class="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition text-center"
            >
              Cancel
            </router-link>
            <button
              @click="saveInvoice"
              class="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
            >
              Save Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceCreate",
  data() {
    return {
      formData: {
        customer: "",
        date: new Date().toISOString().split("T")[0],
        items: [{ description: "Professional Services", qty: 1, price: 0 }],
        paymentMethod: "Credit Card",
        notes: "",
      },
    };
  },
  computed: {
    subtotal() {
      return this.formData.items.reduce(
        (sum, item) => sum + item.qty * item.price,
        0,
      );
    },
  },
  methods: {
    addItem() {
      this.formData.items.push({
        description: "Professional Services",
        qty: 1,
        price: 0,
      });
    },
    removeItem(index) {
      this.formData.items.splice(index, 1);
    },
    saveInvoice() {
      if (
        !this.formData.customer ||
        this.formData.items.some((item) => !item.price)
      ) {
        alert("Please fill in all required fields");
        return;
      }
      alert("Invoice saved successfully!");
      this.$router.push("/invoices");
    },
  },
};
</script>
