<script setup lang="ts">
import { useProductDetailStore } from '~/stores/productDetail'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productStore = useProductDetailStore()

function selectSize(sizeId: number) {
  router.push({
    path: `/${route.params.categorytype_slug}/${route.params.product_slug}`,
    query: { ...route.query, size_id: sizeId }
  })
}
</script>

<template>
  <div class="flex flex-wrap gap-4 mt-2 ">
    <template v-for="s in productStore.stock" :key="s.size?.id">
      <!-- Out of Stock -->
      <div
        v-if="s.currentQuantity === 0"
        class="flex items-center gap-1 border border-gray-300 dark:border-gray-700 rounded px-3 py-1 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 cursor-not-allowed select-none"
      >
        <span>{{ s.size?.name }}</span>
        <span class="text-xs">(Out of Stock)</span>
      </div>

      <!-- In Stock -->
      <UButton
        v-else
        :label="s.size?.name"
        size="lg"
        color="neutral"
        variant="outline"
        class="min-w-[48px] justify-center cursor-pointer px-10"
        :class="{
          'border-black border dark:border-white':
            Number(route.query.size_id) === s.size?.id
        }"
        @click="selectSize(s.size?.id)"
      />
      
    </template>
  </div>
</template>
