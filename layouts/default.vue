<template>
  <div>
    <header class="bg-white border-gray-200 dark:bg-[#0a0a0a] w-full sticky top-0 z-10">
      <!-- Show banner if user is NOT logged in OR first purchase is true -->
      <UITopBannerPurchase v-if="!userStore.userProfile || userStore.userProfile.firstPurchase" />
      <Navbar />
    </header>

    <main class="mt-3 w-11/12 mx-auto md:px-4 lg:w-[88%]">
      <NuxtLoadingIndicator />
      <UIGlobalLoading />
      <slot />
    </main>

    <footer>
      <TheFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import { useFetchUserProfile } from '~/composables/useFetchUserProfile'
import { useUserStore } from '~/stores/user'
import { useOrderStore } from '~/stores/order'

const route = useRoute()
const userStore = useUserStore()
const orderStore = useOrderStore()

// Extract slugs from route params
const categorySlug = computed(() => route.params.categorytype_slug as string | undefined)
const productSlug = computed(() => route.params.product_slug as string | undefined)

// SEO: Prefer product slug over category slug
const seoTitle = computed(() => {
  if (productSlug.value) return `${productSlug.value} | Redeye`
  if (categorySlug.value) return `${categorySlug.value} | Redeye`
  return 'Redeye'
})

const seoDescription = computed(() => {
  if (productSlug.value) return `Find details about ${productSlug.value} on Redeye.`
  if (categorySlug.value) return `Discover more about ${categorySlug.value} on Redeye.`
  return 'Redeye is your trusted platform for discovering top-quality products and offers.'
})


useHead({
  title: seoTitle,
  meta: [
    { name: 'description', content: seoDescription },
    { property: 'og:title', content: seoTitle },
    { property: 'og:description', content: seoDescription },
    { name: 'twitter:card', content: 'summary_large_image' },
    // Optional: add canonical or OG image if available
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icons/logo_dark-removebg-preview.png ' },
    { rel: 'apple-touch-icon', href: '/icons/logo_dark-removebg-preview.png' }
  ]
})

onMounted(async () => {
  try {
    await useFetchUserProfile()
    await orderStore.fetchAllOrders()
  } catch (error) {
    console.error('Error loading user or orders:', error)
  }
})
</script>
