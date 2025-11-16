<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const cartStore = useCartStore()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
])
</script>

<template>
  <UHeader
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full',
      size: 'xl',
    }"
    mode="slideover"
  >
    <template #left>
      <nuxt-link
        class="inline-flex gap-2 items-center"
        to="/"
      >
        <div class="rounded-full h-14 w-14 bg-primary-950">
          <img
            src="/images/logo-transparent.png"
            class="hfull w-full"
            alt=""
          >
        </div>
        <div class="flex flex-col">
          <span class="font-extrabold text-xl lg:text-2xl text-primary-900">Evergreen</span>
          <span class="text-sm lg:text-base text-primary-900">Plant Nursery</span>
        </div>
      </nuxt-link>
    </template>

    <UNavigationMenu
      :items="items"
    />

    <template #right>
      <UButton
        to="/cart"
        icon="i-heroicons-shopping-cart"
        size="sm"
        class="mr-2 lg:mr-0"
      >
        Cart ({{ cartStore.itemCount }})
      </UButton>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
