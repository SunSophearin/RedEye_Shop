<script setup lang="ts">
import type { CartItem } from "~/types"; // You can define this type for clarity
const props = defineProps<{ item: CartItem; disabled: boolean }>();
const { fetchStock } = useProductApi();

// Use useAsyncData for data fetching
const {
  data: stockData,
  pending,
  error,
} = useAsyncData(
  `product-stock-${props.item.stockId}`, // Unique key for caching
  () => fetchStock(props.item.stockId),
  {
    immediate: true, // Fetch immediately when component mounts
    watch: [() => props.item.stockId], // Re-fetch if stockId changes
  }
);

const emit = defineEmits<{
  (e: "remove-item", id: number): void;
  (e: "update-quantity", value: { item: CartItem; quantity: number }): void;
}>();

function debouncedUpdateQuantity(newQuantity: number) {
  setTimeout(() => {
    emit("update-quantity", { item: props.item, quantity: newQuantity });
  }, 700);
}

function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}
</script>

<template>
  <li class="my-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center max-h-[92px] w-full">
        <div class="relative">
          <NuxtLink
            :to="`/product-detail-page/${item.productId}?color_id=${item.colorId}`"
          >
            <img
              :src="item.image"
              class="rounded-xl max-w-[92px] max-h-[92px] object-contain"
            />
          </NuxtLink>

          <UButton
            class="absolute -right-2 -top-2"
            size="xs"
            color="neutral"
            variant="outline"
            icon="i-heroicons-x-mark-20-solid"
            @click="emit('remove-item', item.stockId)"
          />
        </div>

        <div class="ml-4 md:ml-3 lg:ml-5 relative w-full">
          <div class="max-w-[200px] md:max-w-[300px]">
            <p class="text-base font-medium truncate">{{ item.name }} </p>
          </div>

          <div class="flex justify-between items-start">
            <div class="pt-2 space-y-2">
              <div class="flex gap-1 md:gap-2">
                <p class="font-medium text-xl">
                  {{ formatPrice(item.finalPrice) }}
                </p>
                <p
                  class="font-medium md:text-sm text-[13px] line-through text-red-500 mt-2"
                >
                  {{ formatPrice(item.price) }}
                </p>
              </div>
              <p class="text-gray-500 text-sm md:text-base">
                Size: {{ item.size }}
              </p>
            </div>
            <div>
              <div v-if="pending">Loading stock...</div>
              <div v-else-if="error">
                Error loading stock: {{ error.message }}
              </div>
              <div
                v-else-if="
                  stockData &&
                  stockData.currentQuantity !== null &&
                  stockData.currentQuantity !== undefined
                "
              >
                <ProductDetailQuantitySelector
                  class="absolute right-0 bottom-0"
                  :quantity="item.quantity"
                  :count="item.quantity"
                  :sizeid="item.sizeId"
                  :flex_column="`flex-col`"
                  :max="stockData.currentQuantity"
                  :style="'flex items-center justify-end'"
                  @quantity-updated="debouncedUpdateQuantity"
                />
              </div>
              <div v-else>Stock information not available.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
