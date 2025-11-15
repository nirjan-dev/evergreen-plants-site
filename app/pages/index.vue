<template>
  <main>
    <HeroSection />
    <FeaturesSection />
    <ProductsList
      v-if="data?.products"
      :products="data?.products"
    />
  </main>
</template>

<script setup lang="ts">
// This page component simply renders the HomePage component.
// This is done to satisfy the multi-word component name linting rule,
// as the actual homepage logic is in HomePage.vue.

const { data } = await useFetch('/api/products')
</script>
