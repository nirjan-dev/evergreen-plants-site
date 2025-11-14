<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Our Plants</h1>
    <div v-if="pending" class="text-center">
      <p>Loading products...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>Sorry, we couldn't load the products. Please try again later.</p>
    </div>
    <div v-else-if="products && products.length > 0" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id">
        <NuxtLink :to="product.path" class="block border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div class="aspect-square overflow-hidden">
            <img :src="product.meta.image" :alt="`Image of ${product.meta.name}`" class="w-full h-full object-cover">
          </div>
          <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-900 truncate">{{ product.meta.name }}</h2>
            <p class="text-md text-gray-700 mt-1">Rs. {{ product.meta.price }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      <p>No products found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { data: products, pending, error } = await useAsyncData(route.path, () => {
  return queryCollection('content')
    .where('extension', '=', 'md')
    .all()
})
</script>
