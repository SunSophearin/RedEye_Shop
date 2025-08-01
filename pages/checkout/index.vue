<script setup lang="ts">
import { CheckoutAddress } from '#components'
import { useColorMode } from '#imports'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

watch(() => colorMode.value, (newVal) => {
  colorMode.preference = newVal
}, { immediate: true })
// const {getCart,cart:cartItems}=useCartStore()
interface PaymentMethod {
  key: string
  label: string
  disabled: boolean
  img: string
  description?: string
}
const paymentMethods = computed<PaymentMethod[]>(() => [
  {
    key: 'KHQR',
    label: 'KHQR',
    img: 'https://bredcambodia.com.kh/wp-content/uploads/2022/12/KHQR-available-here-logo-with-bg-1024x422.png',
    description: 'Scan to pay with KHQR',
    disabled: false,
    
  },
  {
    key: 'ABA',
    label: 'ABA',
    disabled: true,
    img: isDark.value
      ? 'https://zandokh.com/image/catalog/logo/aba-payway/aba-pay-web-dark.png'
      : 'https://zandokh.com/image/catalog/logo/aba-payway/aba-pay-web.png',
  },
  {
    key: 'ACLEDA',
    label: 'ACLEDA',
    disabled: true,
    img: isDark.value
      ? 'https://zandokh.com/image/catalog/logo/acleda/xpay/xpay-dark.png'
      : 'https://zandokh.com/image/catalog/logo/acleda/xpay/xpay.png',
  },
  
])
</script>

<template>
  <div class="w-full md:p-0 mb-10 mt-6 md:mt-0  space-y-4 ">
    <div class="mx-auto md:flex md:gap-2 lg:gap-4">
      <!-- Shipping and Payment -->
      <div class="md:w-1/2 rounded-xl md:shadow-lg px-6 md:p-6 ">
        <h1 class="text-xl md:text-xl font-bold flex items-center mb-4">
          Shipping Information
        </h1>
        <CheckoutFormUnAndPh class="w-full" />
        <div>
          <CheckoutSelectDelivery class=" mb-4 w-full" />
          <CheckoutAddress class=" mb-4" />
          <CheckoutFormPayment
            class=""
            :methods="paymentMethods"
          />
        </div>
      </div>
      <!-- Order Summary -->
      <div class="flex flex-col w-full p-2 md:w-1/2 rounded-xl md:shadow-lg md:p-6 ">
        <h1 class="text-xl md:text-xl  font-bold flex items-start">
          Your Order
        </h1>
        <CartOrderSummary class="w-full" />
      </div>
    </div>
  </div>
</template>
