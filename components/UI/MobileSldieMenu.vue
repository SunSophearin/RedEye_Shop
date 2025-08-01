<script setup lang="ts">

const open = useState('isOpenMobileSlide', () => false)
const route = useRoute()

// Keyboard shortcut (for example: press "o" to toggle)
defineShortcuts({
  o: () => {
    open.value = !open.value
  }
})

// Close drawer when route changes
watch(() => route.fullPath, () => {
  open.value = false
})
</script>

<template>
  <USlideover v-model:open="open" side="left" class="bg-white/30 dark:bg-black/30 backdrop-blur-xs" :close="{
      color: 'neutral',
      variant: 'outline',
      class: 'rounded-fullg'
    }">
    <template #body>
      <NavbarMenuMobilePhone class="flex flex-col items-start space-y-4" />
    </template>
  </USlideover>
</template>
