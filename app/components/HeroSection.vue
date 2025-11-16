<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    label: 'Shop Plants',
    to: '/#plants',
    icon: 'i-heroicons-shopping-cart',
  },
  {
    label: 'Our Story',
    to: '/about',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-heroicons-arrow-right',
  },
])
</script>

<template>
  <UPageHero
    title="Bring Nature Home"
    description="Quality plants delivered to your doorstep in Jhapa. We're a family-run nursery dedicated to helping you create your green sanctuary."
    headline="Welcome to Evergreen"
    orientation="horizontal"
    reverse
    :links="links"
  >
    <img
      src="/images/hero.jpg"
      alt=""
    >
  </UPageHero>
</template>
