// ~/composables/useAppToast.ts
import { useToast } from '#imports'

export function useAppToast() {
  const toast = useToast()

  function success(message: string, title = 'Success') {
    toast.add({
      title,
      description: message,
      icon: 'i-heroicons-check-circle',
      color: 'success',
      duration: 3000,
    })
  }

  function error(message: string, title = 'Error') {
    toast.add({
      title,
      description: message,
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error',
      duration: 3000,
    })
  }

  function info(message: string, title = 'Info') {
    toast.add({
      title,
      description: message,
      icon: 'i-heroicons-information-circle',
      color: 'warning',
      duration: 3000,
    })
  }

  return {
    success,
    error,
    info,
  }
}
