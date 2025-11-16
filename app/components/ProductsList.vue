<template>
  <section
    id="plants"
    class="bg-neutral-100 py-16 lg:py-24"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex justify-between items-center mb-12">
        <div>
          <h2 class="text-4xl font-bold text-neutral-900 mb-3">
            Our Plants
          </h2>
          <p class="text-xl text-neutral-600">
            Discover your next green companion
          </p>
        </div>
        <!-- <div class="flex gap-4">
          <select class="px-6 py-3 rounded-lg border-2 border-gray-300 text-lg focus:border-sage focus:outline-none">
            <option>All Categories</option>
            <option>Indoor Plants</option>
            <option>Outdoor Plants</option>
            <option>Succulents</option>
            <option>Flowering Plants</option>
          </select>
          <select class="px-6 py-3 rounded-lg border-2 border-gray-300 text-lg focus:border-sage focus:outline-none">
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div> -->
      </div>

      <!-- Product Grid -->
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="bg-neutral-50 grid gap-2 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <div class="h-64 flex items-center justify-center">
            <img
              class="h-full w-full object-cover"
              :src="product.imageLink"
            >
          </div>
          <div class="px-6 py-4">
            <h3 class="text-2xl font-bold text-neutral-900 mb-1">
              {{ product.name }}
            </h3>
            <!-- <p class="text-neutral-600 mb-4 text-lg">
              {{ product.category }}
            </p> -->
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-primary-700">रू&nbsp;{{ product.price }}</span>
            </div>

            <div class="flex flex-col text-center gap-2 mt-3">
              <UButton
                icon="heroicons:shopping-cart"
                class="justify-center cursor-pointer"
                size="lg"
              >
                Add&nbsp;to&nbsp;Cart
              </UButton>

              <UButton
                :to="`/products/${product.slug}`"
                variant="outline"
                size="lg"
                class="justify-center"
                icon="heroicons:eye"
              >
                View Details
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Product } from '~~/shared/types/product.types'

defineProps<{
  products: Product[]
}>()
</script>
