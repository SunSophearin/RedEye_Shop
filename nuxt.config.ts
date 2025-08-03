// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/icons/logo_dark-removebg-preview.png' }
      ]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  components: true,
   runtimeConfig: {
    public: {
      // API_BASE_URL: process.env.API_BASE_URL || 'null',
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
      mapApiKey: process.env.NUXT_PUBLIC_MAP_API_KEY,
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            }
          }
        }
      },
    }
  },
  vite: {
    optimizeDeps: {
      include: ["@fawmi/vue-google-maps", "fast-deep-equal"],
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  routeRules: {
  '/admin/**': { appMiddleware: 'admin' },
  '/checkout/**': { appMiddleware: 'auth' }
  },
  imports: {
    dirs: [
      'state',
      'stores',
    ]
  },

})