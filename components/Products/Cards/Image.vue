<template>
  <div class="w-full h-full overflow-hidden">
    <img
      class="w-full object-cover transition-transform duration-900 ease-in-out hover:scale-105"
      :class="props.sizeimage"
      :src="currentImage"
      alt="Product image"
      @mouseover="currentImage = props.img[1]"
      @mouseout="currentImage = props.img[0]"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  img: string[];
  sizeimage?: string;
}

const props = defineProps<Props>();

// Always start with the first image
const currentImage = ref(props.img[0]);
</script>
