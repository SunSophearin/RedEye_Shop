<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/cart'
import type { CartItem } from '~/types'
import { vAutoAnimate } from '@formkit/auto-animate'
import {useAppToast} from '~/composables/useAppToast'

const userStore = useUserStore()
const toast=useAppToast()
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore) // ✅ REACTIVE BINDING

const formatPrice = (amount?: number | null) =>
  typeof amount === 'number' && !isNaN(amount)
    ? `$${amount.toFixed(2)}`
    : '$0.00'

const subtotal = computed(() =>
  cartItems.value.reduce(
    (sum, item) =>
      sum +
      (typeof item.finalPrice === 'number' ? item.finalPrice : 0) *
        (typeof item.quantity === 'number' ? item.quantity : 0),
    0
  )
)

const FirstPurchase = computed(() => {
  if (userStore.userProfile?.firstPurchase) {
    return subtotal.value * 0.1;
  }
  return 0;
});

const total = computed(() => subtotal.value - FirstPurchase.value);


const updateQuantity = async ({
  item,
  quantity,
}: {
  item: CartItem
  quantity: number
}) => {
  loading.value = true
  await cartStore.updateItemQuantity(
    item.stockId,
    item.sizeId,
    item.colorId,
    quantity
  )
  loading.value = false
}

const removeItem = async (stockId: number) => {
  const item = cartItems.value.find((i) => i.stockId === stockId)
  if (!item) return
  loading.value = true
  await cartStore.removeFromCart(item.stockId, item.sizeId, item.colorId)
  loading.value = false
}

const goToCheckout = () => {
  cartStore.closeCart()
  router.push('/checkout')
}


</script>

<template>
  <div class="text-left h-full flex flex-col">
    <!-- Cart Header -->
    <div class="block justify-between items-center">
      <p v-if="cartItems.length" class="font-medium mt-2">
        {{ cartItems.length }} item(s)
      </p>
    </div>

    <!-- Cart Items -->
    <div class="flex flex-col h-full justify-between overflow-hidden">
      <!-- Items List -->
      <div v-if="cartItems.length" class="flex flex-col flex-grow overflow-hidden">
        <ul
          v-auto-animate
          class="flex flex-col flex-grow overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <CartLineItem
            v-for="item in cartItems"
            :key="item.importId"
            :item="item"
            :disabled="loading"
            @remove-item="removeItem"
            @update-quantity="updateQuantity"
          />
        </ul>
      </div>

      <!-- Empty Cart -->
      <div
        v-else
        class="flex flex-col flex-grow overflow-auto text-center mt-20"
      >
        <UIcon
          name="i-heroicons-shopping-bag-20-solid"
          class="w-10 h-10 self-center"
        />
        <p class="text-lg mt-4">No items in cart</p>
      </div>

      <!-- Summary Section -->
      <div v-if="cartItems.length" class="pb-1 mt-3 md:pb-6">
        <div class="flex justify-between pb-4 border-t border-slate-800 pt-6">
          <div class="flex flex-col grow pr-2 text-slate-400">
            <p>Subtotal</p>
            <p v-if="!userStore.userProfile || userStore.userProfile.firstPurchase" class="mt-2">Enjoy 10% OFF Your First Purchase</p>
          </div>
          <div class="flex flex-col text-right">
            <p>{{ formatPrice(subtotal) }}</p>
            <p v-if="!userStore.userProfile || userStore.userProfile.firstPurchase" class="mt-2">- {{ formatPrice(FirstPurchase) }}</p>
            <p class="mt-3 text-sm font-normal text-gray-500">
              Calculated at checkout
            </p>
          </div>
        </div>
        <div class="flex justify-between font-medium pb-4 mb-4">
          <p>Total</p>
          <p>{{ formatPrice(total) }}</p>
        </div>

        <UButton
          :loading="loading"
          v-if="route.path !== '/checkout'"
          class="w-full mb-4 justify-center"
          size="xl"
          color="neutral"
          @click="goToCheckout"
        >
          Proceed to Checkout
        </UButton>

        <CheckoutPaymentProcess v-else />
      </div>
    </div>
  </div>
</template>
