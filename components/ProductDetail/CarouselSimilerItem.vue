<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig()

const slug = route.params.categorytype_slug as string
const id = computed(() => extractIdFromSlug(slug))
const {data:products ,pending ,error}:any = await useFetch(`${config.public.API_BASE_URL}/api/products/by-category-item/${id.value}`);
</script>

<template>
  <UCarousel
    v-if="products"
    :items="products"
    loop
    arrows
    dots
    :autoplay="{ delay: 2000 }"
    :ui="{ item: 'basis-1/2 md:basis-1/3 lg:basis-1/4 px-6' }"
  >
    <template #default="{ item }">
      <ProductsCards :sizeimage="'h-[226px] md:h-[250px] lg:h-[350px]'" :product="item" class="w-full" />
    </template>
  </UCarousel>
</template>