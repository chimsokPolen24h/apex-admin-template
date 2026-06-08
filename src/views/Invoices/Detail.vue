<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header with Back Button -->
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
              Invoice Details
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Invoice #INV-001
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="printInvoice"
            class="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H7a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2zm-6-4h.01M12 8v4m0 0v4m0-4h4m-4 0H8"
              ></path>
            </svg>
            Print
          </button>
          <button
            @click="downloadInvoice"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>

    <!-- Invoice Container -->
    <div class="p-4 sm:p-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
      >
        <!-- Receipt Style Content -->
        <div class="p-6 sm:p-12">
          <!-- Invoice Header -->
          <div
            class="flex items-center justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
          >
            <div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">
                INVOICE
              </div>
              <p class="text-gray-600 dark:text-gray-400 mt-2">
                Invoice #INV-001
              </p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Acme Corp
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Professional Services
              </p>
            </div>
          </div>

          <!-- Company & Customer Info -->
          <div class="grid grid-cols-2 gap-8 mb-8">
            <!-- From -->
            <div>
              <p
                class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2"
              >
                From
              </p>
              <div class="text-gray-900 dark:text-white">
                <p class="font-semibold">Your Company Name</p>
                <p class="text-sm">123 Business Street</p>
                <p class="text-sm">New York, NY 10001</p>
                <p class="text-sm">info@company.com</p>
                <p class="text-sm">+1-555-0100</p>
              </div>
            </div>

            <!-- To -->
            <div>
              <p
                class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2"
              >
                To
              </p>
              <div class="text-gray-900 dark:text-white">
                <p class="font-semibold">Acme Corporation</p>
                <p class="text-sm">456 Corporate Ave</p>
                <p class="text-sm">Los Angeles, CA 90001</p>
                <p class="text-sm">contact@acme.com</p>
                <p class="text-sm">+1-555-0200</p>
              </div>
            </div>
          </div>

          <!-- Invoice Metadata -->
          <div
            class="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <p
                class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
              >
                Invoice Date
              </p>
              <p class="text-gray-900 dark:text-white font-medium">
                June 1, 2024
              </p>
            </div>
            <div>
              <p
                class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
              >
                Due Date
              </p>
              <p class="text-gray-900 dark:text-white font-medium">
                June 30, 2024
              </p>
            </div>
            <div>
              <p
                class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase"
              >
                Status
              </p>
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
              >
                Paid
              </span>
            </div>
          </div>

          <!-- Items Table -->
          <div class="mb-8">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b-2 border-gray-300 dark:border-gray-600">
                  <th
                    class="text-left py-3 font-semibold text-gray-900 dark:text-white"
                  >
                    Description
                  </th>
                  <th
                    class="text-center py-3 font-semibold text-gray-900 dark:text-white w-20"
                  >
                    Qty
                  </th>
                  <th
                    class="text-right py-3 font-semibold text-gray-900 dark:text-white w-24"
                  >
                    Unit Price
                  </th>
                  <th
                    class="text-right py-3 font-semibold text-gray-900 dark:text-white w-24"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="py-3 text-gray-900 dark:text-white">
                    Professional Services - Consulting
                  </td>
                  <td class="text-center text-gray-900 dark:text-white">10</td>
                  <td class="text-right text-gray-900 dark:text-white">
                    $200.00
                  </td>
                  <td
                    class="text-right font-semibold text-gray-900 dark:text-white"
                  >
                    $2,000.00
                  </td>
                </tr>
                <tr>
                  <td class="py-3 text-gray-900 dark:text-white">
                    Software License - Annual
                  </td>
                  <td class="text-center text-gray-900 dark:text-white">1</td>
                  <td class="text-right text-gray-900 dark:text-white">
                    $500.00
                  </td>
                  <td
                    class="text-right font-semibold text-gray-900 dark:text-white"
                  >
                    $500.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Summary -->
          <div class="flex justify-end mb-8">
            <div class="w-64">
              <div
                class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              >
                <span>Subtotal</span>
                <span>$2,500.00</span>
              </div>
              <div
                class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              >
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div
                class="flex justify-between py-3 text-lg font-bold text-gray-900 dark:text-white"
              >
                <span>Total</span>
                <span>$2,500.00</span>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div
            class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-8 border border-blue-200 dark:border-blue-700"
          >
            <p
              class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2"
            >
              Notes
            </p>
            <p class="text-sm text-gray-900 dark:text-white">
              Thank you for your business! Payment is due within 30 days. Please
              include invoice number with payment.
            </p>
          </div>

          <!-- Payment Terms -->
          <div
            class="text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6"
          >
            <p>
              If you have any questions, please contact us at
              invoice@company.com
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceDetail",
  data() {
    return {
      invoice: {
        id: 1,
        number: "INV-001",
        customer: "Acme Corp",
        status: "Paid",
      },
    };
  },
  methods: {
    printInvoice() {
      window.print();
    },
    downloadInvoice() {
      alert("Invoice downloaded as PDF");
    },
  },
};
</script>
