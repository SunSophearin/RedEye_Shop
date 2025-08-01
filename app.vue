<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator :duration="2000" />
      <USlideover
      class="bg-white/30 dark:bg-black/30 backdrop-blur-xs"
        v-model:open="cartStore.isOpen"
        title="Order Summary"
        description="Review items in your cart"
        close-icon="i-heroicons-x-mark-20-solid"
      >
        <template #body>
          <CartOrderSummary />
        </template>
      </USlideover>
      <UIMobileSldieMenu />
      <UApp>
        <NuxtPage />
      </UApp>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
<!-- nuxi dev --host 0.0.0.0 -->