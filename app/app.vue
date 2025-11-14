<template>
  <div>
    <header class="bg-white shadow-sm">
      <nav class="container mx-auto px-4 py-4">
        <NuxtLink to="/" class="text-xl font-bold text-green-700">Evergreen Plants</NuxtLink>
      </nav>
    </header>

    <main class="bg-gray-50 min-h-screen">
      <NuxtPage />
    </main>

    <footer class="bg-gray-100 mt-auto">
      <div class="container mx-auto px-4 py-6 text-center text-gray-600">
        <p>&copy; 2024 Evergreen Plants. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// This is the main application layout.
// The <NuxtPage /> component will render the current page based on the route.
</script>
