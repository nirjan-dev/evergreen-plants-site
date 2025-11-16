<script lang="ts">
</script>

<template>
  <!-- HEADER / NAVIGATION -->
  <header class="shadow-sm sticky top-0 z-50 bg-primary-50">
    <nav class="max-w-7xl mx-auto px-6 py-5">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <nuxt-link
          to="/"
          class="flex items-center space-x-3"
        >
          <div>
            <img
              src="/images/logo.jpeg"
              alt="Logo"
              class="w-12 h-12 rounded-full"
            >
          </div>
          <div>
            <h1 class="text-2xl font-bold ">
              EVERGREEN
            </h1>
            <p class="text-sm ">
              Plant Nursery
            </p>
          </div>
        </nuxt-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <nuxt-link
            to="/"
            class="active-page text-lg hover:-light transition"
          >Home</nuxt-link>
          <a
            href="#products"
            class="text-lg hover: transition"
          >Shop</a>
          <a
            href="#about"
            class="text-lg hover: transition"
          >About</a>
          <a
            href="#contact"
            class="text-lg hover: transition"
          >Contact</a>
          <UButton>
            Cart (0)
          </UButton>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden">
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>
