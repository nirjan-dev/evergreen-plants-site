<template>
  <section
    id="product-detail"
    class="bg-white py-20"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div>
          <div class="bg-sand rounded-2xl h-96 mb-6 flex items-center justify-center">
            <img
              :src="product?.imageLink"
              :alt="product?.name"
              class="w-full h-full object-cover rounded-2xl"
            >
          </div>
          <!-- <div class="grid grid-cols-4 gap-4">
            <div class="bg-sand rounded-lg h-24 flex items-center justify-center">
              <p class="text-gray-400 text-sm">
                [Thumb]
              </p>
            </div>
            <div class="bg-sand rounded-lg h-24 flex items-center justify-center">
              <p class="text-gray-400 text-sm">
                [Thumb]
              </p>
            </div>
            <div class="bg-sand rounded-lg h-24 flex items-center justify-center">
              <p class="text-gray-400 text-sm">
                [Thumb]
              </p>
            </div>
            <div class="bg-sand rounded-lg h-24 flex items-center justify-center">
              <p class="text-gray-400 text-sm">
                [Thumb]
              </p>
            </div>
          </div> -->
        </div>

        <!-- Product Info -->
        <div>
          <!-- <p class="text-sage font-semibold text-xl mb-3">
            Indoor Plant
          </p> -->
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            {{ product?.title }}
          </h2>
          <!-- <div class="flex items-center mb-6">
            <div class="flex text-yellow-500 text-2xl">
              ★★★★★
            </div>
            <span class="text-gray-600 ml-3 text-lg">(24 reviews)</span>
          </div> -->
          <p class="text-3xl font-bold text-sage mb-8">
            रू {{ product?.price }}
          </p>

          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Description
            </h3>
            <p class="text-lg text-gray-600 leading-relaxed">
              {{ product?.description }}
            </p>
          </div>

          <!-- <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Care Instructions
            </h3>
            <ul class="space-y-3 text-lg text-gray-600">
              <li class="flex items-start">
                <span class="text-sage mr-3 text-2xl">•</span>
                <span>Bright, indirect sunlight</span>
              </li>
              <li class="flex items-start">
                <span class="text-sage mr-3 text-2xl">•</span>
                <span>Water when top 2 inches of soil is dry</span>
              </li>
              <li class="flex items-start">
                <span class="text-sage mr-3 text-2xl">•</span>
                <span>Likes humid environments</span>
              </li>
              <li class="flex items-start">
                <span class="text-sage mr-3 text-2xl">•</span>
                <span>Feed monthly during growing season</span>
              </li>
            </ul>
          </div> -->

          <div class="mb-8">
            <label class="block text-lg font-semibold text-gray-900 mb-3">Quantity</label>
            <div class="flex items-center gap-4">
              <button class="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-sage text-xl">
                -
              </button>
              <span class="text-2xl font-semibold px-6">1</span>
              <button class="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-sage text-xl">
                +
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <UButton
              size="xl"
              class="justify-center"
              icon="i-heroicons-shopping-cart"
            >
              Add to Cart
            </UButton>
            <!-- <button class="w-16 h-16 border-2 border-sage text-sage rounded-lg hover:bg-sage hover:text-white transition">
              <svg
                class="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug?.toString().replace(/,/g, '/') ?? ''

const { data, error } = await useFetch('/api/products/get-product-by-slug', {
  params: {
    slug,
  },
})
const product = data.value?.product
if (error.value && !product) {
  console.error(`Error fetching product with slug: ${slug}`, error.value)
}
</script>

<style scoped>
/* Scoped styles can be added here if needed */
.prose {
  max-width: none; /* Reset max-width from prose defaults */
}
</style>
