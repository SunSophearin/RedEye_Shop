<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { Product } from "~/types";

const route = useRoute();
const config = useRuntimeConfig();
const slug = route.params.product_slug as string;
const productId: any = computed(() => extractIdFromSlug(slug));

const {
  data: product,
  pending,
  error,
} = await useFetch<Product>(
  `${config.public.API_BASE_URL}/api/products/${productId.value}`
);

const selectedColorId = ref<string | null>(null);

watchEffect(() => {
  selectedColorId.value = (route.query.color_id as string) || null;
});
</script>

<template>
  <div v-if="product">
    <h3 class="text-lg font-semibold mb-2">
      {{ product.productVariants.length }} Colors available
    </h3>

    <div class="flex gap-2 space-x-2">
      <button
        v-for="variant in product.productVariants"
        :key="variant.id"
        class="rounded-lg t p-0"
      >
        <NuxtLink
          :to="{
            path: `/${product.categoryItem.slug}/${product.slug}`,
            query: { color_id: variant.color.id },
          }"
          class="flex flex-col items-center justify-center"
        >
          <img
            :src="variant.images[0]"
            :alt="`${variant.color.name} color option`"
            class="w-16 h-20 md:w-24 md:h-32 object-cover rounded-lg"
            :class="{
              'border-2 border-natural ':
                String(selectedColorId) === String(variant.color.id),
            }"
          />
        </NuxtLink>
        <p class="mt-1 text-sm">{{ variant.color.name }}</p>
      </button>
    </div>
  </div>

  <div v-if="pending" class="text-center py-4">Loading colors...</div>
  <div v-if="error" class="text-red-500 py-4">
    Error loading product: {{ error.message }}
  </div>
</template>
