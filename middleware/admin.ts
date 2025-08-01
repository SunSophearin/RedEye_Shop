
import { useUserStore } from '~/stores/user'
import { useFetchUserProfile } from '~/composables/useFetchUserProfile'

export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return
  const userStore = useUserStore()

  if (!userStore.userProfile) {
    const { error } = await useFetchUserProfile()
    if (error.value) {
      console.error('Error fetching user profile:', error.value)
      return navigateTo('/forbidden')
    }
  }

  if (!userStore.hasRole('ROLE_ADMIN')) {
    return navigateTo('/forbidden')
  }
})
