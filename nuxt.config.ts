// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
