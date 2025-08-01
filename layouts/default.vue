<template>
  <div>
    <header class="bg-[#ffffff] border-gray-200 dark:bg-[#0a0a0a] w-full sticky top-0 z-10">
      <!-- Show banner if user NOT logged in OR user.firstPurchase is true -->
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
import { useFetchUserProfile } from '~/composables/useFetchUserProfile'

const userStore = useUserStore()
const orderStore = useOrderStore()

onMounted(async () => {
  try {
    await useFetchUserProfile()
    await orderStore.fetchAllOrders()
  } catch (error) {
    console.error(error)
  }
})
</script>
