<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <!-- Card -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8"
      >
        <!-- Header -->
        <div class="text-center mb-8">
          <!-- Security Icon -->
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4"
          >
            <svg
              class="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>

          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Two-Factor Authentication
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Enter the 6-digit verification code sent to your email
          </p>
        </div>

        <!-- Verification Code Input -->
        <div class="mb-8">
          <label
            class="block text-sm font-semibold text-gray-900 dark:text-white mb-3"
            >Verification Code</label
          >
          <div class="flex gap-2 justify-center">
            <input
              v-for="(digit, index) in 6"
              :key="index"
              v-model="code[index]"
              type="text"
              maxlength="1"
              @input="handleInput(index)"
              @keydown="handleKeydown($event, index)"
              class="w-12 h-12 text-center text-2xl font-bold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
            Each box accepts only one digit
          </p>
        </div>

        <!-- Timer & Resend -->
        <div
          class="flex items-center justify-between mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Code expires in:
            <span class="font-semibold text-gray-900 dark:text-white"
              >{{ timeRemaining }}s</span
            >
          </div>
          <button
            @click="resendCode"
            :disabled="resendDisabled"
            :class="[
              'text-sm font-medium transition',
              resendDisabled
                ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300',
            ]"
          >
            Resend Code
          </button>
        </div>

        <!-- Verify Button -->
        <button
          @click="verifyCode"
          :disabled="code.join('').length < 6"
          :class="[
            'w-full py-3 rounded-lg font-semibold transition text-white',
            code.join('').length < 6
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600',
          ]"
        >
          Verify Code
        </button>

        <!-- Help Text -->
        <div class="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
          <p class="mb-2">Didn't receive the code?</p>
          <a
            href="#"
            class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Try another verification method
          </a>
        </div>

        <!-- Divider -->
        <div class="my-6 border-t border-gray-200 dark:border-gray-700"></div>

        <!-- Footer -->
        <div class="text-center text-xs text-gray-600 dark:text-gray-400">
          <p>
            Having trouble?
            <a
              href="#"
              class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >Contact Support</a
            >
          </p>
        </div>
      </div>

      <!-- Security Notice -->
      <div
        class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg"
      >
        <div class="flex gap-2">
          <svg
            class="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="text-xs text-blue-700 dark:text-blue-300">
            Never share your verification code with anyone
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TwoStep",
  data() {
    return {
      code: ["", "", "", "", "", ""],
      timeRemaining: 300,
      resendDisabled: false,
      resendCooldown: 60,
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    handleInput(index) {
      const value = this.code[index];
      if (!/^\d*$/.test(value)) {
        this.code[index] = "";
        return;
      }
      if (value && index < 5) {
        this.$nextTick(() => {
          this.$el.querySelector(`input:nth-of-type(${index + 2})`).focus();
        });
      }
    },
    handleKeydown(e, index) {
      if (e.key === "Backspace" && !this.code[index] && index > 0) {
        this.$nextTick(() => {
          this.$el.querySelector(`input:nth-of-type(${index})`).focus();
        });
      }
    },
    verifyCode() {
      const fullCode = this.code.join("");
      if (fullCode.length === 6) {
        alert(`Code verified: ${fullCode}`);
      }
    },
    resendCode() {
      this.resendDisabled = true;
      let countdown = this.resendCooldown;
      const interval = setInterval(() => {
        countdown--;
        if (countdown === 0) {
          this.resendDisabled = false;
          clearInterval(interval);
        }
      }, 1000);
      alert("Verification code resent!");
      this.code = ["", "", "", "", "", ""];
    },
    startTimer() {
      const interval = setInterval(() => {
        this.timeRemaining--;
        if (this.timeRemaining === 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
  },
};
</script>
