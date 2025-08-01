<script setup lang="ts">
import type { OrderDTO } from '~/types'

defineProps<{ orders: OrderDTO[] }>()

const formatOrderDate = (dateStr: string) => {
  return useDateFormat(dateStr, "YYYY-MM-DD HH:mm").value
}
</script>

<template>
  <div v-if="orders.length === 0" class="text-center text-gray-400 p-4">
    No orders found.
  </div>

  <div v-for="(order, index) in orders.toReversed()" :key="index" class="p-4 shadow-md rounded-lg mb-4">
    <div class="flex justify-between items-center border-gray-200 dark:border-gray-700 border-b pb-2 mb-2">
      <p class="font-medium text-blue-600">#{{ order.orderId }}</p>
      <p class="text-sm text-gray-500">{{ formatOrderDate(order.createAt) }}</p>
    </div>

    <div class="flex flex-col md:flex-row gap-2  md:gap-4">
      <div class="md:w-1/2 space-y-2">
        <div
          v-for="(detail, idx) in order.saleDetails"
          :key="idx"
          class="flex gap-2  p-2 rounded"
        >
          <NuxtImg
            :src="detail.images?.[0]"
            class="w-16 h-20 object-cover rounded"
          />
          <div>
            <p class="font-semibold">{{ detail.productName }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Qty: {{ detail.quantity }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Price: ${{ detail.price.toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <div class="md:w-1/2  md:p-4 rounded">
        <p class="font-medium mb-1">Summary</p>
        <p class="text-sm text-gray-700 dark:text-gray-400">Total: ${{ order.finalPrice.toFixed(2) }}</p>
        <p class="text-sm text-gray-700 dark:text-gray-400">Status Payment: {{ order.status }}</p>
        <p class="text-sm text-gray-700 dark:text-gray-400">Phone: {{ order.phoneNumber }}</p>
        <p class="text-sm text-gray-700 dark:text-gray-400">Address: {{ order.address }}</p>
      </div>
    </div>
  </div>
</template>
