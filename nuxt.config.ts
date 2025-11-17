// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
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
  routeRules: {
    '/cart': {
      ssr: false,
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
      standalone: false,
    },
  },
  piniaPluginPersistedstate: {
    storage: 'localStorage',
  },
})
