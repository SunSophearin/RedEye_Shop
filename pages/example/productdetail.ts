// stores/product.ts
import { defineStore } from 'pinia'
import type { Product, Stock } from '~/types'
import { useProductApi } from '~/composables/useProductApi'

export const useProductDetailStore = defineStore('product', () => {
  const route = useRoute()
  const product = ref<Product | null>(null)
  // const stock=ref<Stock[] >([])
  const stock = useStock()
  const stockQty = useStockQty()
  const selectedQuantity = useSelectedQuantity()

  const loading = ref(false)
  const error = ref<string | null>(null)
  // Compute selected stock based on size_id in route
  const selectedStock = computed(() => {
    const sizeId = Number(route.query.size_id)
    return stockQty.value.find((item: Stock) => Number(item.size?.id) === sizeId)
  })

  // Fetch product and update state
  const fetchProduct = async () => {
    const productId = Number(route.params.pid);
    const colorId = Number(route.query.color_id);
    loading.value = true;
    error.value = null;
    const { fetchProductById } = useProductApi()
    product.value = await fetchProductById(productId, { color_id: colorId });

    const variant: any = product.value?.productVariants?.[0];
    // console.log(variant);
    stock.value = variant || [];
    console.log('Stock fetched:', stock.value);
    stockQty.value = variant?.stocks || [];

    selectedQuantity.value = 1;
    loading.value = false;
    console.log('Product fetched from pinia:', product.value);
  };
  // async function fetchProduct() {
  //   const { fetchProductById } = useProductApi()
  //   const productId = Number(route.params.pid)
  //   const colorId = Number(route.query.color_id)

  //   // Validate IDs
  //   if (isNaN(productId) || isNaN(colorId)) {
  //     error.value = 'Product ID or Color ID is invalid.'
  //     product.value = null
  //     stock.value = []
  //     stockQty.value = []
  //     return
  //   }

  //   loading.value = true
  //   error.value = null
  //   try {
  //     product.value = await fetchProductById(productId, { color_id: colorId })
  //     const variant: any = product.value?.productVariants?.[0]
  //     stock.value = variant || []
  //     stockQty.value = variant?.stocks || []
  //     selectedQuantity.value = 1
  //   } catch (err: any) {
  //     error.value = err?.message || 'Failed to fetch product.'
  //     product.value = null
  //     stock.value = []
  //     stockQty.value = []
  //   } finally {
  //     loading.value = false
  //   }
  // }

  // Watch for color or product ID changes to refetch product
//   watch(
//   () => [
//     route.query?.color_id ?? null,
//     route.params?.pid ?? null
//   ],
//   ([colorId, pid] = [], [oldColorId, oldPid] = []) => {
//     if (colorId && pid && (colorId !== oldColorId || pid !== oldPid)) {
//       fetchProduct()
//     }
//   },
//   { immediate: true }
// )



//   // Reset quantity when size changes
//   watch(
//     () => route.query.size_id,
//     () => {
//       selectedQuantity.value = 1
//     }
//   )

//   // Allow manual quantity update
//   function setSelectedQuantity(val: number) {
//     selectedQuantity.value = val
//   }

  return {
    product,
    stock,
    stockQty,
    selectedQuantity,
    selectedStock,
    loading,
    error,
    fetchProduct,
    // setSelectedQuantity,
  }
})
