import { defineStore } from 'pinia'
import { ref, computed, watch, onMounted, watchEffect } from 'vue'
import type { Product, Stock } from '~/types'
import { useRoute } from '#imports'
import { extractIdFromSlug } from '~/utils/slug'
import { useProductApi } from '~/composables/useProductApi'
import { useGlobalLoading } from '~/composables/useGlobalLoading'

export const useProductDetailStore = defineStore('productDetail', () => {
  const loading = useGlobalLoading()
  const route = useRoute()
  const product = ref<Product | null>(null)
  const stock = ref<Stock[]>([])
  const stockQty = ref<Stock[]>([])
  const selectedQuantity = ref<number>(1)
  // const loading = ref(false)
  const error = ref<string | null>(null)

  const selectedStock = computed(() => {
    const sizeId = Number(route.query.size_id)
    return stockQty.value.find((item: Stock) => Number(item.size?.id) === sizeId) || null
  })

  const fetchProduct = async () => {
    const slug = route.params.product_slug as string
    const productId: any = computed(() => extractIdFromSlug(slug))
    console.log('productId:', productId.value)
    // const productId = Number(route.params.pid)
    const colorId = Number(route.query.color_id)

    // ✅ Validate IDs before calling API
    if (isNaN(productId.value) || isNaN(colorId)) {
      error.value = 'Product ID or Color ID is invalid.'
      product.value = null
      stock.value = []
      stockQty.value = []
      selectedQuantity.value = 1
      loading.value = false
      return
    }

    error.value = null
    try {
      // loading.value = true
      // await new Promise(resolve => setTimeout(resolve, 10000))
      const { fetchProductById } = useProductApi()
      product.value = await fetchProductById(productId.value, { color_id: colorId })
      const variant: any = product.value?.productVariants?.[0]
      stock.value = variant?.stocks || []
      stockQty.value = variant?.stocks || []
      selectedQuantity.value = 1
    } catch (err: any) {
      error.value = err?.message || 'Failed to fetch product.'
      product.value = null
      stock.value = []
      stockQty.value = []
      selectedQuantity.value = 1
    } finally {
      loading.value = false
    }
  }

  // Watch for color change to fetch product
  watch(() => route.query.color_id, fetchProduct)

  watch(
    () => route.query.size_id,
    () => {
      selectedQuantity.value = 1
    }
  )


  function setSelectedQuantity(val: number) {
    selectedQuantity.value = val
  }
  const onQuantityUpdated = (val: number) => {
    setSelectedQuantity(val)
  }

  return {
    product,
    stock,
    stockQty,
    selectedQuantity,
    selectedStock,
    loading,
    error,
    fetchProduct,
    setSelectedQuantity,
    onQuantityUpdated
  }
})
