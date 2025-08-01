<script setup lang="ts">
const props = defineProps<{
  images: string[]
}>()
const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev() {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}
function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index

  carousel.value?.emblaApi?.scrollTo(index)
}
</script>

<template>
  <div class="flex-1 w-full md:h-[650px]">
    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      arrows
      :items="props.images"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="w-full max-w-xs mx-auto "
      @select="onSelect"
    >
      <NuxtImg :src="item" width="320" height="300" class="rounded-lg " loading="lazy"/>
    </UCarousel>

    <div class="flex gap-3 pt-3 max-w-xs mx-auto">
      <div
        v-for="(item, index) in props.images"
        :key="index"
        class="size-19 opacity-25 hover:opacity-100 transition-opacity cursor-pointer"
        :class="{ 'opacity-100': activeIndex === index }"
        @click="select(index)"
      >
        <NuxtImg :src="item" class="rounded-lg w-full object-cover" loading="lazy"/>
      </div>
    </div>
  </div>
</template>

