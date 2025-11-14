<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="pending" class="text-center">
      <p>Loading product details...</p>
    </div>
    <div v-else-if="error || !product" class="text-center text-red-500">
      <p>Sorry, we couldn't find that product. It might not exist.</p>
      <NuxtLink to="/" class="text-blue-500 hover:underline mt-4 inline-block">Go back to all plants</NuxtLink>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <!-- Product Image Gallery -->
      <div class="aspect-square">
        <img :src="product.meta.image" :alt="`Image of ${product.meta.name}`" class="w-full h-full object-cover rounded-lg shadow-md">
        <!-- A simple gallery could be added here later by iterating over an array of images -->
      </div>

      <!-- Product Details -->
      <div class="flex flex-col">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800">{{ product.meta.name }}</h1>

        <p class="text-2xl font-semibold text-gray-700 mt-4">
          Rs. {{ product.meta.price }}
        </p>

        <div class="mt-4 text-sm font-medium">
          <p v-if="product.meta.stock > 0" class="text-green-600">
            {{ product.meta.stock }} in stock
          </p>
          <p v-else class="text-red-500">
            Out of stock
          </p>
        </div>

        <div class="prose mt-6">
          <ContentRenderer :value="product" />
        </div>

        <div class="mt-auto pt-6">
          <button
            :disabled="product.meta.stock <= 0"
            class="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">



const route = useRoute()
const slug = route.params.slug?.toString().replace(/,/g, '/') ?? ''

const { data: product, pending, error } = await useAsyncData(`product-${slug}`, () => {
  return queryCollection('content')
    .path(`/products/${slug}`)
    .first()
})

if (error.value && !product.value) {
  console.error(`Error fetching product with slug: ${slug}`, error.value)
}
</script>

<style scoped>
/* Scoped styles can be added here if needed */
.prose {
  max-width: none; /* Reset max-width from prose defaults */
}
</style>
