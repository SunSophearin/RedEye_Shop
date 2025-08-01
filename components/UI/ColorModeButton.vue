<template>
  <div class="flex justify-center items-center ">
    <button
      @click="toggleDarkMode"
      class="h-12 w-12 rounded-lg p-2 cursor-pointer"
    >
       <u-icon
        name="line-md:moon-to-sunny-outline-loop-transition"
        class="fill-gray-800 block dark:hidden"
        size="24"
      ></u-icon>
      <u-icon 
        name="line-md:sunny-outline-to-moon-loop-transition"
        class="fill-yellow-500 hidden dark:block"
        size="24"
      ></u-icon>
      
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')
console.log(colorMode.value);
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  colorMode.preference = isDark.value ? 'dark' : 'light'
}

watch(() => colorMode.value, (newVal) => {
  isDark.value = newVal === 'dark'
}, { immediate: true })
</script>

<style>
:root {
  --background: #fff;
  --text: rgba(0, 0, 0, 0.8);
}

html.dark {
  /* --background: #091a28; */
  --background: #0a0a0a;
  --text: #ebf4f1;
}

html.sepia {
  --background: #f1e7d0;
  --text: #433422;
}

body {
  background-color: var(--background);
  color: var(--text);
  transition: background-color 0.3s, color 0.3s;
}
</style>
