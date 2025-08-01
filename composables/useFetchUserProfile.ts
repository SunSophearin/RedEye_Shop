export interface UserProfile {
  email: string
  roles: string[]
  username: string
  picture: string
  firstPurchase: boolean
}
import { useUserStore } from '~/stores/user'
export const useFetchUserProfile = async () => {
  const config = useRuntimeConfig()
  const userStore = useUserStore()
  const loading = ref(true)
  const error = ref<string | null>(null)
  const profile= ref<UserProfile | null>(null)

  try {
    const response = await $fetch<UserProfile>(`${config.public.API_BASE_URL}/api/auth/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      }
    })

    const user: UserProfile = {
      email: response.email,
      roles: response.roles || [],
      username: response.username || response.email,
      picture: response.picture || '',
      firstPurchase: response.firstPurchase
    }

    // Update Pinia state
    userStore.setUserProfile(user)

    // Update form
    profile.value = user
    userStore.setUser({
      name: user.username,
      phone: '',
      role: user.roles?.[0] || ''
    })
  } catch (err: any) {
    error.value = err?.data?.error || err?.message || 'Failed to fetch profile'
    userStore.clearUserProfile()
    return null
  } finally {
    loading.value = false
  }

  return { loading, error,profile }
}
