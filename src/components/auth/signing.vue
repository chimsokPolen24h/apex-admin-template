<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      loading: false,
    };
  },
  methods: {
    async loginForm() {
      this.loading = true;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email: this.email, password: this.password }
        );
        localStorage.setItem("token", response.data.token);
        this.$router.push("/");
      } catch (error) {
        this.message = error.response?.data?.message || error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="min-h-screen bg-[#060d0f] flex items-center justify-center p-4 relative overflow-hidden">

    <!-- Ambient glows -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Primary glow -->
      <div class="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[60px] bg-[radial-gradient(circle,rgba(52,211,153,0.12)_0%,transparent_70%)]"></div>
      <!-- Secondary glow -->
      <div class="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] rounded-full blur-[60px] bg-[radial-gradient(circle,rgba(16,185,129,0.07)_0%,transparent_70%)]"></div>
      <!-- Grid -->
      <div
        class="absolute inset-0"
        style="background-image: linear-gradient(rgba(52,211,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.03) 1px, transparent 1px); background-size: 40px 40px;"
      ></div>
    </div>

    <div class="relative w-full max-w-[380px]">

      <!-- Top badge -->
      <div class="flex items-center gap-2 mb-6">
        <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52,211,153)]"></div>
        <span class="text-[11px] tracking-[0.15em] text-emerald-400/70 font-mono uppercase">
          Secure Access
        </span>
      </div>

      <!-- Card -->
      <div class="bg-white/[0.03] border border-emerald-400/[0.15] rounded-[20px] px-8 py-6 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(52,211,153,0.05),0_32px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(52,211,153,0.1)]">
         <!-- Back to dashboard -->
      <div class=" mb-5">
        <router-link
          to="/"
          class="text-[11px] text-emerald-400/40 hover:text-emerald-400/80 font-mono tracking-[0.08em] transition-colors duration-200"
        >
          ← Back to Dashboard
        </router-link>
      </div>
        <!-- Icon -->
        <div class="w-11 h-11 bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 border border-emerald-400/30 rounded-xl flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(52,211,153,0.15)]">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
          </svg>
        </div>

        <!-- Header -->
        <h1 class="text-[22px] font-semibold text-[#f0fdf8] mb-1 tracking-tight">
          Welcome back
        </h1>
        <p class="text-[13px] text-emerald-400/50 font-mono mb-7">
          Sign in to continue
        </p>

        <!-- Fields -->
        <div class="flex flex-col gap-4">

          <!-- Email -->
          <div>
            <label class="block text-[10px] font-medium text-emerald-400/60 tracking-[0.12em] uppercase font-mono mb-2">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="w-full bg-emerald-400/[0.04] border border-emerald-400/[0.15] rounded-xl px-4 py-3 text-sm text-[#e8fdf5] font-mono outline-none placeholder:text-emerald-400/20 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/[0.08] transition-all duration-200"
            />
          </div>

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-[10px] font-medium text-emerald-400/60 tracking-[0.12em] uppercase font-mono">
                Password
              </label>
              <a href="#" class="text-[11px] text-emerald-400/50 hover:text-emerald-400 font-mono transition-colors duration-200">
                Forgot?
              </a>
            </div>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full bg-emerald-400/[0.04] border border-emerald-400/[0.15] rounded-xl px-4 py-3 text-sm text-[#e8fdf5] font-mono outline-none placeholder:text-emerald-400/20 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/[0.08] transition-all duration-200"
            />
          </div>

          <!-- Error -->
          <div
            v-if="message"
            class="text-xs text-red-400 bg-red-500/[0.08] border border-red-500/20 rounded-xl px-3.5 py-2.5 font-mono"
          >
            ⚠ {{ message }}
          </div>

          <!-- Submit -->
          <button
            @click="loginForm"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-emerald-950 font-semibold rounded-xl py-3 text-sm tracking-wide border-none cursor-pointer shadow-[0_4px_24px_rgba(52,211,153,0.25),0_0_0_1px_rgba(52,211,153,0.2)] hover:shadow-[0_6px_32px_rgba(52,211,153,0.4),0_0_0_1px_rgba(52,211,153,0.3)] hover:-translate-y-px active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          >
            <span v-if="!loading" class="flex items-center justify-center gap-2">
              Sign in
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              Signing in...
            </span>
          </button>
        </div>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-emerald-400/10"></div>
          <span class="text-[10px] text-emerald-400/30 font-mono tracking-[0.08em]">OR</span>
          <div class="flex-1 h-px bg-emerald-400/10"></div>
        </div>

        <!-- Footer -->
        <p class="text-center text-xs text-white/25 font-mono">
          No account?
          <router-link
            to="/signup"
            class="text-emerald-400/60 hover:text-emerald-400 transition-colors duration-200 ml-1"
          >
            Sign up
          </router-link>
        </p>
      </div>

     
    </div>
  </div>
</template>