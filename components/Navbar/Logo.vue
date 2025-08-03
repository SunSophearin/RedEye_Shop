<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useColorMode } from "#imports";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const imgtoggle = computed(() => {
  return isDark.value
    ? "/icons/logo_dark-removebg-preview.png"
    : "/icons/logo_light-removebg-preview.png";
});
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <div class="flex md:items-center md:justify-center">
    <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
      <NuxtImg loading="lazy" v-if="mounted" :src="imgtoggle" alt="" class="w-18 md:w-32 object-cover" />
    </NuxtLink>
  </div>
</template>

