<script setup lang="ts">
import type { Product } from "~/types";

const props = defineProps<{
  product: Product;
  sizeimage?: string;
}>();
const color = ref("#00C16A");

const chip = computed(() => ({ backgroundColor: color.value }));
</script>

<template>
  <!-- class="rounded-lg border border-gray-200 bg-white p-1 md:p-2 shadow-sm dark:border-[#0a0a0a] dark:bg-[#0a0a0a]" -->
  <div class="rounded-lg p-1 md:p-2">
    <div class="w-full rounded-t-2xl overflow-hidden relative">
      <NuxtLink
        :to="{
          path: `/${props.product.categoryItem.slug}/${props.product.slug}`,
          query: { color_id: props.product.productVariants?.[0]?.color?.id },
        }"
        class="block w-full h-full"
      >
        <ProductsCardsImage
          :sizeimage="props.sizeimage"
          :img="props.product.productVariants?.[0]?.images"
        />
        <span
          v-if="props.product.discount"
          class="absolute top-0 left-0 me-2 rounded bg-red-500 px-2.5 py-0.5 text-md font-medium text-white"
        >
          -{{ props.product.discount }}%
        </span>
      </NuxtLink>
    </div>
    <div class="py-4 space-y-4 px-1">
      <div class="relative flex items-center gap-2">
        <!-- Final Price -->
        <div
          class="relative flex items-start font-bold leading-tight ordinal"
          :class="{ 'text-red-500': props.product.discount > 0 }"
        >
          <span class="absolute top-[-3px] text-[11px] text-gray-500">$</span>
          <span class="pl-2 text-[15px] md:text-[18px]">{{
            props.product.finalPrice
          }}</span>
        </div>

        <!-- Original Price (Strikethrough) -->
        <div
          v-if="props.product.discount > 0"
          class="relative flex items-start line-through text-gray-600 dark:text-gray-300 leading-tight ordinal"
        >
          <span class="absolute top-[-3px] text-[11px] text-gray-500">$</span>
          <span class="pl-2 text-[14px] md:text-[16px] font-medium">{{
            props.product.price
          }}</span>
        </div>
      </div>

      <ProductsCardsTitle :title="props.product.name" />
      <div>
        <UAvatarGroup
          size="xl"
          v-for="(item, index) in props.product.productVariants"
          :key="index"
        >
          <UAvatar
            size="sm"
            :style="{ backgroundColor: item.color?.colorCode || '#ccc' }"
          />
        </UAvatarGroup>
      </div>
    </div>
  </div>
</template>
