<script setup lang="ts">
import type { Product } from '~/types'
import { extractIdFromSlug } from '~/utils/slug'
import { useProductApi } from '~/composables/useProductApi'

const { fetchProducts } = useProductApi()
const route = useRoute()

// 1. Extract slug and convert to ID
const slug = route.params.categorytype_slug as string
const id = computed(() => extractIdFromSlug(slug))

// 2. Fetch the data using useAsyncData
const { data: products, error } = await useAsyncData<Product[]>(
  computed(() => `products-${id.value}`),
  () => fetchProducts(id.value as number)
)

// 3. Throw Nuxt 404 if product not found -- ONLY if api throws meaningful error
if (error?.value?.statusCode === 404) {
  console.error('Product not found:', error.value)
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>

<template>
  <div v-if="products?.length===0" >
    <UINotFound />
  </div>
  <div v-else class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
    <ProductsCards
     :sizeimage="'h-[246px] md:h-[380px]'"
      v-for="product in products ?? []"
      :key="product.id"
      :product="product"
      class="w-full"
    />
  </div>
</template>
