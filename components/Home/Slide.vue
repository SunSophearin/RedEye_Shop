<script setup lang="ts">
const items = [
  "/icons/cambodia_need_peace.jpg",
  "/icons/race_in_peace_my_hero.png",
];

</script>

<template>
  <div class="w-full pb-4" >
    <UCarousel
      v-slot="{ item }"
      loop
      dots
      :autoplay="{ delay: 4000 }"
      :items="items"
    >
      <NuxtImg
        :src="item"
        class="rounded-lg w-full h-[150px] md:h-[350px] lg:h-[480px] object-fill object-center"
      />
    </UCarousel>
  </div>
</template>
