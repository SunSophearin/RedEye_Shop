<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
const props = defineProps<{
  title: string;
}>();
const items = ref<BreadcrumbItem[]>([
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/'
  },
  {
    label: 'ProductDetail',
    icon: 'i-lucide-box',
  },
  {
    label: props.title,
    icon: 'i-lucide-tag',
    class: 'text-black dark:text-white',
  }
])
</script>

<template>
  <UBreadcrumb  :items="items" />
</template>
