import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { OrderDTO } from '~/types'

export const useOrderStore = defineStore('order', () => {
  const pendingOrders = ref<OrderDTO[]>([])
  const outForDeliveryOrders = ref<OrderDTO[]>([])
  const pickedUpOrders = ref<OrderDTO[]>([])

  const config = useRuntimeConfig()

  /**
   * 🔄 Fetch all user orders grouped by delivery status
   */
  const fetchAllOrders = async () => {
    try {
      const data = await $fetch<Record<string, OrderDTO[]>>(
        `${config.public.API_BASE_URL}/api/sales/grouped`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )

      // Handle each status group with fallback to empty array if undefined
      pendingOrders.value = data.PENDING || []
      outForDeliveryOrders.value = data.OUT_FOR_DELIVERY || []
      pickedUpOrders.value = data.PICKED_UP || []

    } catch (error: any) {
      console.error('❌ Error fetching grouped orders:', error)

      // On error, fallback to empty state
      pendingOrders.value = []
      outForDeliveryOrders.value = []
      pickedUpOrders.value = []
    }
  }

  // Computed properties
  const statusCount = computed(() =>
    pendingOrders.value.length + outForDeliveryOrders.value.length
  )
  const outForDeliveryCount = computed(() =>
    outForDeliveryOrders.value.length
  )

  return {
    // State
    pendingOrders,
    outForDeliveryOrders,
    pickedUpOrders,

    // Actions
    fetchAllOrders,

    // Getters
    statusCount,
    outForDeliveryCount,
  }
})
