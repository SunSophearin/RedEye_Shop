// composables/useGlobalLoading.ts

export const useGlobalLoading = () => {
  return useNuxtApp().$globalLoading as Ref<boolean>
}
