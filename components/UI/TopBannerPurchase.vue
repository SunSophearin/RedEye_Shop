<script setup lang="ts">
import { ref } from 'vue'
import { NuxtLink } from '#components'

const isVisible = ref(true)
const closeBanner = () => {
  isVisible.value = false
}
</script>

<template>
  <div
    v-if="isVisible"
    id="bottom-banner"
    tabindex="-1"
    class="flex w-full p-2 bg-black dark:bg-[#262626] border-b dark:border-gray-600 justify-center relative"
    aria-label="Promotional banner"
  >
    <p class="flex items-center text-sm text-gray-200 dark:text-gray-300 font-normal space-x-2">
      <span class="inline-flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full w-6 h-6 mr-2">
        <svg
          class="w-4 h-4 text-gray-600 dark:text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M18.435 7.546A2.32 2.32 0 0 1 17.7 5.77a3.354 3.354 0 0 0-3.47-3.47 2.322 2.322 0 0 1-1.776-.736 3.357 3.357 0 0 0-4.907 0 2.281 2.281 0 0 1-1.776.736 3.414 3.414 0 0 0-2.489.981 3.372 3.372 0 0 0-.982 2.49 2.319 2.319 0 0 1-.736 1.775 3.36 3.36 0 0 0 0 4.908A2.317 2.317 0 0 1 2.3 14.23a3.356 3.356 0 0 0 3.47 3.47 2.318 2.318 0 0 1 1.777.737 3.36 3.36 0 0 0 4.907 0 2.36 2.36 0 0 1 1.776-.737 3.356 3.356 0 0 0 3.469-3.47 2.319 2.319 0 0 1 .736-1.775 3.359 3.359 0 0 0 0-4.908ZM8.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 9.063a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2.207-6.856-6 6a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
      </span>
      <span class="text-[8px] md:text-sm">
        ENJOY 10% OFF YOUR FIRST PURCHASE
        <NuxtLink
          to="/checkout"
          class="font-bold text-blue-400 hover:underline ml-1"
        >
          SIGN UP NOW
        </NuxtLink>
      </span>
    </p>
    <!-- Close Button -->
    <button
      @click="closeBanner"
      aria-label="Close banner"
      class="absolute right-2 top-2 text-gray-300 hover:text-red-400 focus:outline-none"
      type="button"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>
