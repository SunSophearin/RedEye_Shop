
import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return
  const userStore = useUserStore()

  if (!userStore.userProfile) {
      return navigateTo('/login')
  }

  if (!userStore.hasRole('ROLE_USER')) {
    return navigateTo('/login')
  }
})
