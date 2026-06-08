<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4"
  >
    <div class="text-center">
      <!-- Error Icon/Illustration -->
      <div class="mb-8">
        <div
          class="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full mb-4"
        >
          <svg
            class="w-12 h-12 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Error Code & Message -->
      <h1
        class="text-6xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-2"
      >
        {{ errorCode }}
      </h1>
      <h2
        class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4"
      >
        {{ errorTitle }}
      </h2>
      <p
        class="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
      >
        {{ errorMessage }}
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <router-link
          to="/dashboard"
          class="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition inline-flex items-center gap-2 w-full sm:w-auto justify-center"
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
              d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4-4"
            ></path>
          </svg>
          Back to Dashboard
        </router-link>
        <button
          @click="refreshPage"
          class="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition inline-flex items-center gap-2 w-full sm:w-auto justify-center"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
          Refresh Page
        </button>
      </div>

      <!-- Additional Info -->
      <div
        class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
      >
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Need help?</p>
        <a
          href="mailto:support@company.com"
          class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          Contact Support
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  data() {
    return {
      errorCode: "404",
      errorTitle: "Page Not Found",
      errorMessage:
        "The page you are looking for might have been removed or is temporarily unavailable.",
    };
  },
  methods: {
    refreshPage() {
      window.location.reload();
    },
  },
};
</script>
