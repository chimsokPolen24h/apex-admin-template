<template>
  <div class="h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border-b border-white/10 dark:border-gray-700/30 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-sm">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
            POS System
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Professional Point of Sale Management</p>
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
          <div class="relative hidden sm:block">
            <input v-model="searchQuery" type="text" placeholder="Search products..."
              class="w-48 px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/30 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition" />
            <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <!-- Cart Toggle Button (mobile only) -->
          <button @click="cartOpen = !cartOpen"
            class="lg:hidden relative flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042L5.960 9.541a1 1 0 00.894.559h7.26a1 1 0 00.894-.559l2.424-9.696a1 1 0 00-.009-.042L16.78 3H3z"></path>
            </svg>
            <span>Cart</span>
            <span v-if="cartItems.length > 0"
              class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {{ cartItems.length }}
            </span>
          </button>

          <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/30 backdrop-blur-sm">
            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            Live
          </span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-hidden relative">
      <div class="h-full flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 lg:p-8 max-w-7xl mx-auto w-full overflow-hidden">

        <!-- Products Section -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Mobile Search -->
          <div class="relative mb-4 sm:hidden">
            <input v-model="searchQuery" type="text" placeholder="Search products..."
              class="w-full px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/30 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition text-sm" />
            <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <!-- Category Tabs -->
          <div class="mb-4 sm:mb-5">
            <div class="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
              <button v-for="category in categories" :key="category" @click="selectedCategory = category"
                :class="['px-4 py-2 rounded-lg font-medium whitespace-nowrap transition text-sm backdrop-blur-sm border',
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20'
                    : 'bg-white/40 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 border-white/20 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-800/60']">
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="flex-1 overflow-y-auto scrollbar-hide">
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pr-2">
              <div v-for="product in filteredProducts" :key="product.id"
                class="group bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 flex flex-col">
                <div class="w-full aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center relative overflow-hidden">
                  <svg class="w-12 sm:w-16 h-12 sm:h-16 text-gray-400/50 group-hover:text-gray-400/70 transition" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
                  </svg>
                  <div v-if="product.stock > 0" class="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                    {{ product.stock }}
                  </div>
                  <div v-else class="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span class="text-white font-bold text-lg">Out of Stock</span>
                  </div>
                </div>
                <div class="flex-1 p-3 sm:p-4 flex flex-col">
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    {{ product.name }}
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">{{ product.category }}</p>
                  <div class="mt-auto">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                        ${{ product.price }}
                      </span>
                    </div>
                    <button @click="addToCart(product)" :disabled="product.stock === 0"
                      :class="['w-full py-2 rounded-lg font-semibold transition text-xs sm:text-sm transform hover:scale-105 active:scale-95',
                        product.stock === 0
                          ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
                          : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50']">
                      <span v-if="product.stock === 0">Out</span>
                      <span v-else>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="filteredProducts.length === 0" class="col-span-2 sm:col-span-3 xl:col-span-4 flex items-center justify-center py-12">
                <div class="text-center">
                  <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">No products found</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ✅ Desktop Cart Sidebar (lg and above) -->
        <div class="hidden lg:flex w-96 flex-col h-full">
          <div class="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl shadow-black/5 dark:shadow-black/20 flex flex-col h-full overflow-hidden">
            <!-- Cart Header -->
            <div class="p-4 sm:p-6 border-b border-white/20 dark:border-gray-700/30 bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30">
              <div class="flex items-center justify-between mb-1">
                <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042L5.960 9.541a1 1 0 00.894.559h7.26a1 1 0 00.894-.559l2.424-9.696a1 1 0 00-.009-.042L16.78 3H3z"></path>
                  </svg>
                  Order Summary
                </h2>
              </div>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <span class="font-semibold text-emerald-600 dark:text-emerald-400">{{ cartItems.length }}</span>
                item{{ cartItems.length !== 1 ? 's' : '' }}
              </p>
            </div>

            <!-- Cart Items -->
            <div class="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div v-if="cartItems.length === 0" class="h-full flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Cart is empty</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">Add items to get started</p>
                </div>
              </div>

              <div v-for="(item, index) in cartItems" :key="index"
                class="bg-white/40 dark:bg-gray-700/40 rounded-xl p-3 sm:p-4 border border-white/20 dark:border-gray-600/30 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
                <div class="flex justify-between items-start mb-3">
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900 dark:text-white text-sm">{{ item.name }}</h4>
                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">${{ item.price }}</p>
                  </div>
                  <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded transition">✕</button>
                </div>
                <div class="flex items-center gap-2">
                  <button @click="decreaseQuantity(index)" class="px-2.5 py-1.5 bg-white/60 dark:bg-gray-600/60 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-white/80 dark:hover:bg-gray-600/80 transition hover:scale-110 active:scale-95 transform">−</button>
                  <input v-model.number="item.quantity" type="number" min="1"
                    class="flex-1 text-center bg-white/40 dark:bg-gray-700/40 border border-white/20 dark:border-gray-600/30 rounded-lg text-sm text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                  <button @click="increaseQuantity(index)" class="px-2.5 py-1.5 bg-white/60 dark:bg-gray-600/60 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-white/80 dark:hover:bg-gray-600/80 transition hover:scale-110 active:scale-95 transform">+</button>
                  <span class="ml-auto font-bold text-gray-900 dark:text-white text-sm bg-gradient-to-r from-emerald-500/20 to-blue-500/20 px-3 py-1.5 rounded-lg">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Cart Summary -->
            <div v-if="cartItems.length > 0" class="p-4 sm:p-6 border-t border-white/20 dark:border-gray-700/30 bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 space-y-3 sm:space-y-4">
              <div class="space-y-2">
                <div class="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal:</span>
                  <span class="font-semibold text-gray-900 dark:text-white">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span>Tax (10%):</span>
                  <span class="font-semibold text-gray-900 dark:text-white">${{ tax.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 pb-3 border-b border-white/20 dark:border-gray-700/30">
                  <span>Discount:</span>
                  <span class="font-semibold text-gray-900 dark:text-white">$0.00</span>
                </div>
                <div class="flex justify-between text-base sm:text-lg font-bold text-gray-900 dark:text-white bg-gradient-to-r from-emerald-500/10 to-blue-500/10 px-3 py-2.5 rounded-lg">
                  <span>Total:</span>
                  <span>${{ total.toFixed(2) }}</span>
                </div>
              </div>
              <div class="flex gap-2 sm:gap-3 pt-2">
                <button @click="clearCart" class="flex-1 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition transform hover:scale-105 active:scale-95">Clear</button>
                <button @click="checkout" class="flex-1 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition transform hover:scale-105 active:scale-95">Checkout</button>
              </div>
            </div>

            <div v-else class="p-4 sm:p-6 border-t border-white/20 dark:border-gray-700/30 text-center">
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Select items to begin</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Mobile: Overlay backdrop -->
      <transition name="fade">
        <div v-if="cartOpen" @click="cartOpen = false"
          class="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40">
        </div>
      </transition>

      <!-- Mobile: Slide-over Cart Panel -->
      <transition name="slide">
        <div v-if="cartOpen"
          class="lg:hidden fixed top-0 right-0 h-full w-80 max-w-full bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl border-l border-white/20 dark:border-gray-700/30 shadow-2xl z-50 flex flex-col">
          <!-- Close button -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-white/20 dark:border-gray-700/30">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042L5.960 9.541a1 1 0 00.894.559h7.26a1 1 0 00.894-.559l2.424-9.696a1 1 0 00-.009-.042L16.78 3H3z"></path>
              </svg>
              Order Summary
            </h2>
            <button @click="cartOpen = false"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Mobile Cart Items -->
          <div class="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
            <div v-if="cartItems.length === 0" class="h-full flex items-center justify-center">
              <div class="text-center">
                <svg class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Cart is empty</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">Add items to get started</p>
              </div>
            </div>
            <div v-for="(item, index) in cartItems" :key="'m-' + index"
              class="bg-white/60 dark:bg-gray-700/40 rounded-xl p-3 border border-white/20 dark:border-gray-600/30 hover:border-emerald-500/30 transition-all">
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 dark:text-white text-sm">{{ item.name }}</h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400">${{ item.price }}</p>
                </div>
                <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-600 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded transition">✕</button>
              </div>
              <div class="flex items-center gap-2">
                <button @click="decreaseQuantity(index)" class="px-2.5 py-1.5 bg-white/60 dark:bg-gray-600/60 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-white/80 transition">−</button>
                <input v-model.number="item.quantity" type="number" min="1"
                  class="flex-1 text-center bg-white/40 dark:bg-gray-700/40 border border-white/20 dark:border-gray-600/30 rounded-lg text-sm text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                <button @click="increaseQuantity(index)" class="px-2.5 py-1.5 bg-white/60 dark:bg-gray-600/60 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-white/80 transition">+</button>
                <span class="ml-auto font-bold text-gray-900 dark:text-white text-sm bg-gradient-to-r from-emerald-500/20 to-blue-500/20 px-3 py-1.5 rounded-lg">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Mobile Cart Summary -->
          <div v-if="cartItems.length > 0" class="p-4 border-t border-white/20 dark:border-gray-700/30 space-y-3">
            <div class="space-y-2">
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Subtotal:</span>
                <span class="font-semibold text-gray-900 dark:text-white">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Tax (10%):</span>
                <span class="font-semibold text-gray-900 dark:text-white">${{ tax.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 pb-2 border-b border-white/20 dark:border-gray-700/30">
                <span>Discount:</span>
                <span class="font-semibold text-gray-900 dark:text-white">$0.00</span>
              </div>
              <div class="flex justify-between text-base font-bold text-gray-900 dark:text-white bg-gradient-to-r from-emerald-500/10 to-blue-500/10 px-3 py-2.5 rounded-lg">
                <span>Total:</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
            <div class="flex gap-2 pt-1">
              <button @click="clearCart" class="flex-1 py-2.5 rounded-lg font-semibold text-sm bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition">Clear</button>
              <button @click="checkout" class="flex-1 py-2.5 rounded-lg font-bold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg transition">Checkout</button>
            </div>
          </div>
          <div v-else class="p-4 border-t border-white/20 dark:border-gray-700/30 text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Select items to begin</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pos",
  data() {
    return {
      searchQuery: "",
      selectedCategory: "All",
      cartItems: [],
      cartOpen: false,
      categories: ["All", "Electronics", "Accessories", "Beverages", "Snacks"],
      products: [
        { id: 1,  name: "Wireless Headphones", category: "Electronics",  price: 79.99,  stock: 15 },
        { id: 2,  name: "USB-C Cable",          category: "Accessories",  price: 12.99,  stock: 50 },
        { id: 3,  name: "Phone Case",            category: "Accessories",  price: 24.99,  stock: 32 },
        { id: 4,  name: "Screen Protector",      category: "Accessories",  price: 9.99,   stock: 48 },
        { id: 5,  name: "Coffee Maker",          category: "Electronics",  price: 99.99,  stock: 8  },
        { id: 6,  name: "Iced Coffee",           category: "Beverages",    price: 5.99,   stock: 0  },
        { id: 7,  name: "Protein Bar",           category: "Snacks",       price: 3.99,   stock: 100},
        { id: 8,  name: "Wireless Mouse",        category: "Electronics",  price: 39.99,  stock: 25 },
        { id: 9,  name: "Keyboard",              category: "Electronics",  price: 89.99,  stock: 12 },
        { id: 10, name: "Laptop Stand",          category: "Accessories",  price: 34.99,  stock: 18 },
        { id: 11, name: "Juice Bottle",          category: "Beverages",    price: 4.49,   stock: 45 },
        { id: 12, name: "Chips Bag",             category: "Snacks",       price: 2.99,   stock: 60 },
      ],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((p) => {
        const matchCategory = this.selectedCategory === "All" || p.category === this.selectedCategory;
        const matchSearch   = p.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchCategory && matchSearch;
      });
    },
    subtotal() { return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); },
    tax()      { return this.subtotal * 0.1; },
    total()    { return this.subtotal + this.tax; },
  },
  methods: {
    addToCart(product) {
      if (product.stock === 0) return;
      const existing = this.cartItems.find((item) => item.id === product.id);
      if (existing) { existing.quantity += 1; }
      else          { this.cartItems.push({ ...product, quantity: 1 }); }
    },
    removeFromCart(index)    { this.cartItems.splice(index, 1); },
    increaseQuantity(index)  { this.cartItems[index].quantity += 1; },
    decreaseQuantity(index)  {
      if (this.cartItems[index].quantity > 1) { this.cartItems[index].quantity -= 1; }
      else { this.removeFromCart(index); }
    },
    clearCart() { this.cartItems = []; },
    checkout() {
      if (this.cartItems.length === 0) return;
      alert(`✓ Checkout successful!\nTotal: $${this.total.toFixed(2)}\n\nThank you for your purchase!`);
      this.cartItems = [];
      this.cartOpen  = false;
    },
  },
};
</script>

<style scoped>
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from,  .slide-leave-to      { transform: translateX(100%); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,   .fade-leave-to     { opacity: 0; }
</style>