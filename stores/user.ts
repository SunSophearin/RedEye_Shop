
import { defineStore } from 'pinia'

// Define a type for the user
export interface UserProfile {
  email: string
  roles: string[]
  username: string
  picture: string
  firstPurchase: boolean
}

export const useUserStore = defineStore('user', () => {
  const userProfile = ref<UserProfile | null>(null)
  const formInfoUser = ref({ name: '', phone: '', role: '' })
  const loading = ref(false)
  const error = ref<string | null>(null)

  const clearUserProfile = () => {
    userProfile.value = null
    error.value = null
    loading.value = false
    formInfoUser.value = { name: '', phone: '', role: '' }
  }

  const setUserProfile = (profile: UserProfile) => {
    userProfile.value = profile
  }

  const setUser = ({ name, phone, role }: { name: string; phone: string; role: string }) => {
    formInfoUser.value = { name, phone, role }
  }

  const updateName = (name: string) => {
    formInfoUser.value.name = name
  }

  const updatePhone = (phone: string) => {
    formInfoUser.value.phone = phone
  }

  const hasRole = (role: string) => {
    return userProfile.value?.roles.includes(role) ?? false
  }

  return {
    // state
    userProfile,
    formInfoUser,
    loading,
    error,

    // actions
    clearUserProfile,
    setUser,
    setUserProfile,
    updateName,
    updatePhone,
    hasRole
  }
})
