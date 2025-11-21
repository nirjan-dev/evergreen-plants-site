<script lang="ts" setup>
</script>

<template>
  <div>
    <section id="about" class="bg-neutral-200 py-20">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Hero Section -->
        <div class="text-center mb-12">
          <h2 class="text-5xl font-bold text-neutral-900 mb-6">
            Our Story
          </h2>
          <p class="text-xl text-neutral-600 max-w-lg mx-auto">
            A family-run nursery dedicated to bringing the beauty of nature to homes across Jhapa
          </p>
        </div>

        <!-- Story Content -->
        <div class="grid md:grid-cols-2 gap-12 py-6 mb-12">
          <div class="h-96 flex items-center justify-center">
            <img class="h-full w-full object-cover rounded-2xl" src="/images/nursery.jpeg" alt="flowers">
          </div>
          <div class="flex flex-col justify-center">
            <h3 class="text-3xl font-bold text-neutral-900 mb-6">
              Growing Together Since 2024
            </h3>
            <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
              Evergreen Plants is a proud women-run family business based in Chandragadhi, Jhapa. What started as a passion for gardening has blossomed into a thriving nursery dedicated to sharing the joy of plants with our community.
            </p>
            <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
              We believe that everyone deserves a green space, no matter how big or small. Each plant in our nursery is carefully selected and nurtured with love, ensuring you receive healthy, vibrant plants ready to thrive in your home.
            </p>
            <p class="text-lg text-neutral-600 leading-relaxed">
              Our mission is simple: to make plant parenthood accessible, enjoyable, and rewarding for everyone in Jhapa and beyond.
            </p>
          </div>
        </div>

        <!-- Values Section -->
        <div class="mb-12">
          <h3 class="text-3xl py-12 font-bold text-neutral-900 mb-12 text-center">
            What We Stand For
          </h3>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-neutral-50 rounded-xl p-8 text-center">
              <div class="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-neutral-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 class="text-2xl font-bold text-neutral-900 mb-4">
                Quality Care
              </h4>
              <p class="text-lg text-neutral-600">
                Every plant is hand-selected and lovingly cared for until it reaches your home
              </p>
            </div>
            <div class="bg-neutral-50 rounded-xl p-8 text-center">
              <div class="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-neutral-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 class="text-2xl font-bold text-neutral-900 mb-4">
                Community First
              </h4>
              <p class="text-lg text-neutral-600">
                Supporting local families and building a greener community together
              </p>
            </div>
            <div class="bg-neutral-50 rounded-xl p-8 text-center">
              <div class="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-neutral-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 class="text-2xl font-bold text-neutral-900 mb-4">
                Expert Guidance
              </h4>
              <p class="text-lg text-neutral-600">
                Free care tips and ongoing support to help your plants flourish
              </p>
            </div>
          </div>
        </div>

        <!-- Women Empowerment Section -->
        <div class="bg-neutral-50 py-12  rounded-2xl p-12 text-center">
          <div class="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-neutral-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 class="text-3xl font-bold text-neutral-900 mb-4">
            Proudly Women-Led
          </h3>
          <p class="text-xl px-6 text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Evergreen Plants is run by the women of our family, bringing passion, dedication, and care to every aspect of the business. We're proud to contribute to women's entrepreneurship in Nepal while doing what we love.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
