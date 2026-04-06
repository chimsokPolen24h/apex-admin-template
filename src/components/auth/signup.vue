<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      message: "",
      loading: false,
      success: false,
      agreed: false,
    };
  },
  computed: {
    passwordStrength() {
      const p = this.password;
      if (!p) return 0;
      let score = 0;
      if (p.length >= 8) score++;
      if (/[A-Z]/.test(p)) score++;
      if (/[0-9]/.test(p)) score++;
      if (/[^A-Za-z0-9]/.test(p)) score++;
      return score;
    },
    strengthLabel() {
      return ["", "Weak", "Fair", "Good", "Strong"][this.passwordStrength];
    },
    strengthColorClass() {
      return ["", "bg-red-500", "bg-yellow-400", "bg-emerald-400", "bg-emerald-400"][this.passwordStrength];
    },
    strengthTextClass() {
      return ["", "text-red-400", "text-yellow-400", "text-emerald-400", "text-emerald-400"][this.passwordStrength];
    },
    passwordsMatch() {
      return this.confirmPassword && this.password === this.confirmPassword;
    },
    passwordsMismatch() {
      return this.confirmPassword && this.password !== this.confirmPassword;
    },
  },
  methods: {
    async signupForm() {
      this.message = "";
      if (!this.agreed) {
        this.message = "Please agree to the Terms of Service.";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.message = "Passwords do not match.";
        return;
      }
      this.loading = true;
      try {
        await axios.post("http://localhost:5000/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.success = true;
        setTimeout(() => this.$router.push("/signin"), 2000);
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
<div class="min-h-screen bg-[#060d0f] flex items-center justify-center p-4 relative overflow-y-auto">

    <!-- Ambient glows -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[80px]"></div>
      <div class="absolute bottom-10 right-16 w-72 h-72 bg-emerald-600/10 rounded-full blur-[60px]"></div>
      <div class="absolute top-2/3 left-8 w-56 h-56 bg-emerald-400/5 rounded-full blur-[50px]"></div>
      <div class="absolute inset-0"
        style="background-image: linear-gradient(rgba(52,211,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.03) 1px, transparent 1px); background-size: 40px 40px;">
      </div>
    </div>

    <div class="relative w-full max-w-sm pt-36">

       
      <!-- Top badge -->
      <div class="flex items-center gap-2 mb-6">
        <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52,211,153)]"></div>
        <span class="text-[11px] tracking-[0.15em] text-emerald-400/70 font-mono uppercase">Create Account</span>
      </div>

      <!-- Success state -->
      <div v-if="success" class="bg-emerald-400/5 border border-emerald-400/20 rounded-2xl p-12 text-center shadow-[0_0_40px_rgba(52,211,153,0.1)]">
        <div class="w-14 h-14 bg-emerald-400/10 border border-emerald-400/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-[#f0fdf8] mb-2 tracking-tight">Account created!</h2>
        <p class="text-sm text-emerald-400/50 font-mono">Redirecting to login...</p>
      </div>

      <!-- Card -->
      <div v-else class="bg-white/[0.03] border border-emerald-400/[0.15] rounded-2xl p-4 backdrop-blur-2xl shadow-[0_32px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(52,211,153,0.1)]">
          <!-- Back link -->
      <div class="mb-5">
        <router-link to="/" class="text-[11px] text-emerald-400/40 hover:text-emerald-400/80 font-mono tracking-wider transition-colors">
          ← Back to Dashboard
        </router-link>
      </div>
        <!-- Icon -->
        <div class="w-11 h-11 bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 border border-emerald-400/30 rounded-xl flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(52,211,153,0.15)]">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>

        <!-- Header -->
        <h1 class="text-[22px] font-semibold text-[#f0fdf8] mb-1 tracking-tight">Get started</h1>
        <p class="text-[13px] text-emerald-400/50 font-mono mb-7">Create your free account</p>

        <!-- Fields -->
        <div class="flex flex-col gap-4">

          <!-- Name -->
          <div>
            <label class="block text-[10px] font-medium text-emerald-400/60 tracking-[0.12em] uppercase font-mono mb-2">
              Full Name
            </label>
            <input
              v-model="name"
              type="text"
              placeholder="John Doe"
              class="w-full bg-emerald-400/[0.04] border border-emerald-400/[0.15] rounded-xl px-4 py-3 text-sm text-[#e8fdf5] font-mono outline-none placeholder:text-emerald-400/20 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/[0.08] transition-all duration-200"
            />
          </div>

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
            <label class="block text-[10px] font-medium text-emerald-400/60 tracking-[0.12em] uppercase font-mono mb-2">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Min. 8 characters"
              class="w-full bg-emerald-400/[0.04] border border-emerald-400/[0.15] rounded-xl px-4 py-3 text-sm text-[#e8fdf5] font-mono outline-none placeholder:text-emerald-400/20 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/[0.08] transition-all duration-200"
            />
            <!-- Strength bar -->
            <div v-if="password" class="mt-2">
              <div class="flex gap-1 mb-1">
                <div
                  v-for="i in 4" :key="i"
                  class="flex-1 h-[3px] rounded-full transition-all duration-300"
                  :class="i <= passwordStrength ? strengthColorClass : 'bg-emerald-400/10'"
                ></div>
              </div>
              <span class="text-[10px] font-mono" :class="strengthTextClass">{{ strengthLabel }}</span>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-[10px] font-medium text-emerald-400/60 tracking-[0.12em] uppercase font-mono mb-2">
              Confirm Password
            </label>
            <div class="relative">
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="••••••••"
                class="w-full bg-emerald-400/[0.04] border rounded-xl px-4 py-3 pr-11 text-sm text-[#e8fdf5] font-mono outline-none placeholder:text-emerald-400/20 focus:ring-2 focus:ring-emerald-400/[0.08] transition-all duration-200"
                :class="{
                  'border-emerald-400/50': passwordsMatch,
                  'border-red-500/50':     passwordsMismatch,
                  'border-emerald-400/[0.15]': !confirmPassword,
                }"
              />
              <div v-if="confirmPassword" class="absolute right-3.5 top-1/2 -translate-y-1/2">
                <svg v-if="passwordsMatch" class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                <svg v-else class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Terms -->
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="agreed"
              type="checkbox"
              class="mt-0.5 w-3.5 h-3.5 accent-emerald-400 flex-shrink-0 cursor-pointer"
            />
            <span class="text-[12px] text-white/25 font-mono leading-relaxed">
              I agree to the
              <a href="#" class="text-emerald-400/60 hover:text-emerald-400 transition-colors">Terms of Service</a>
              and
              <a href="#" class="text-emerald-400/60 hover:text-emerald-400 transition-colors">Privacy Policy</a>
            </span>
          </label>

          <!-- Error -->
          <div v-if="message" class="text-xs text-red-400 bg-red-500/[0.08] border border-red-500/20 rounded-xl px-3.5 py-2.5 font-mono">
            ⚠ {{ message }}
          </div>

          <!-- Submit -->
          <button
            @click="signupForm"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-emerald-950 font-semibold rounded-xl py-3 text-sm tracking-wide shadow-[0_4px_24px_rgba(52,211,153,0.25)] hover:shadow-[0_6px_32px_rgba(52,211,153,0.4)] hover:-translate-y-px active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          >
            <span v-if="!loading" class="flex items-center justify-center gap-2">
              Create Account
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              Creating...
            </span>
          </button>
        </div>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-emerald-400/10"></div>
          <span class="text-[10px] text-emerald-400/30 font-mono tracking-widest">OR</span>
          <div class="flex-1 h-px bg-emerald-400/10"></div>
        </div>

        <!-- Footer -->
        <p class="text-center text-xs text-white/25 font-mono">
          Already have an account?
          <router-link to="/signin" class="text-emerald-400/60 hover:text-emerald-400 transition-colors ml-1">
            Sign in
          </router-link>
        </p>
      </div>

     
    </div>
  </div>
</template>