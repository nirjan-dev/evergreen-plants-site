<template>
  <main>
    <HeroSection />
    <FeaturesSection />
    <ProductsList :products="products" />
  </main>
</template>

<script setup lang="ts">
// This page component simply renders the HomePage component.
// This is done to satisfy the multi-word component name linting rule,
// as the actual homepage logic is in HomePage.vue.

const products = [
  {
    name: 'Monstera Deliciosa',
    category: 'Indoor Plant',
    price: 'रू 850',
  },
  {
    name: 'Snake Plant',
    category: 'Indoor Plant',
    price: 'रू 550',
  },
  {
    name: 'Jade Plant',
    category: 'Succulent',
    price: 'रू 450',
  },
  {
    name: 'Peace Lily',
    category: 'Flowering Plant',
    price: 'रू 700',
  },
  {
    name: 'Aloe Vera',
    category: 'Succulent',
    price: 'रू 400',
  },
  {
    name: 'Spider Plant',
    category: 'Indoor Plant',
    price: 'रू 500',
  },
  {
    name: 'Pothos',
    category: 'Indoor Plant',
    price: 'रू 600',
  },
  {
    name: 'ZZ Plant',
    category: 'Indoor Plant',
    price: 'रू 750',
  },
]


</script>
