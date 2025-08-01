<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)
const error = ref(null)
const token = useCookie('token')
const fetchUser = async () => {
  // const token = localStorage.getItem('token')
  if (!token) {
    error.value = 'No token found. Please log in.'
    return
  }
  try {
    user.value = await $fetch('https://ecommerceshop-production.up.railway.app/api/auth/profile', {
      method: 'GET',
      credentials: 'include'
    })
  } catch (err) {
    error.value = err?.data?.message || err.message || 'Failed to fetch user profile'
    user.value = null
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <div>
    <h1>{{ token }}</h1>
    <h1 v-if="user">
      {{ user }}
    </h1>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
