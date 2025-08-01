<template>
  <div class="w-full">
    <!-- <ClientOnly> -->
    <HomeSlider class="w-full" />
    <!-- <ProductsCards :products="product" class="w-full" /> -->
    <div class="grid gap-4 py-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ProductsCards
        :sizeimage="'h-[246px] md:h-[380px]'"
        v-for="product in products ?? []"
        :key="product.id"
        :product="product"
        class="w-full"
      />
    </div>
    <!-- </ClientOnly> -->
  </div>
</template>
<script setup lang="ts">
import HomeSlider from "@/components/Home/Slide.vue";

const { fetchProducts } = useProductApi();

const products = await fetchProducts();
</script>
