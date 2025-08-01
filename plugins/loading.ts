// plugins/loading.ts

export default defineNuxtPlugin((nuxtApp) => {
  const globalLoading = ref(false)

  // Correct way to make it injectable across app
  nuxtApp.provide('globalLoading', globalLoading)
})
