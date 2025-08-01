<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()
const {
  pendingOrders,
  outForDeliveryOrders,
  pickedUpOrders,
} = storeToRefs(orderStore)
const items = [
  {
    label: 'Purchasing',
    icon: 'meteor-icons:bag-shopping',
    slot: 'purchasing' as const,
  },
  {
    label: 'Out for delivery',
    icon: 'material-symbols-light:delivery-truck-speed-outline',
    slot: 'delivery' as const,
  },
  {
    label: 'Picked up',
    icon: 'streamline:programming-browser-check-checkmark-pass-window-app-code-programming-success-check-apps',
    slot: 'pickup' as const,
  },
] satisfies TabsItem[]
</script>

<template>
  <div class="w-full md:w-5/6 p-4 mx-auto">
    <UIBreadcrumb :title="'Orders'" class="mb-4"/>
    <UTabs color="neutral" :items="items" variant="link" :ui="{ trigger: 'grow' }" class="gap-4 w-full cursor-pointer">

      <!-- Tab: Purchasing -->
      <template #purchasing>
        <OrderItemList :orders="pendingOrders" />
      </template>

      <!-- Tab: Out for Delivery -->
      <template #delivery>
        <OrderItemList :orders="outForDeliveryOrders" />
      </template>

      <!-- Tab: Picked up -->
      <template #pickup>
        <OrderItemList :orders="pickedUpOrders" />
      </template>

    </UTabs>
  </div>
</template>
