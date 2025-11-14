// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  content: {
    experimental: { sqliteConnector: 'native' },
  },
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
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
