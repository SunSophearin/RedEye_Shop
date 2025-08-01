                    "accountStatus", user.isEnabled() // Add account status
<script setup lang="ts">
// import { useUserProfile } from '~/composables/useUserProfile'

const { userProfile, error, loading, fetchUserProfile } = useUserProfile()

onMounted(() => {
  fetchUserProfile()
})
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin text-4xl">🌀</div>
      <p class="mt-4">Loading profile...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-700 p-4 rounded">
      <p class="font-medium">Error:</p>
      <p>{{ error }}</p>
      <UButton 
        @click="fetchUserProfile"
        class="mt-2"
        color="red"
        variant="solid"
      >
        Try Again
      </UButton>
    </div>

    <div v-else-if="userProfile" class="bg-white shadow rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-6">User Profile</h1>
      
      <div class="space-y-4">
        <div>
          <p class="text-gray-500">Email</p>
          <p class="font-medium">{{ userProfile.email }}</p>
        </div>
        
        <div>
          <p class="text-gray-500">Username</p>
          <p class="font-medium">{{ userProfile.username }}</p>
        </div>
        
        <div>
          <p class="text-gray-500">Roles</p>
          <div class="flex flex-wrap gap-2 mt-1">
            <UBadge 
              v-for="role in userProfile.roles" 
              :key="role"
              color="blue"
              variant="subtle"
            >
              {{ role }}
            </UBadge>
          </div>
        </div>
        
        <div>
             <img 
              :src="userProfile.picture" 
              alt="Profile picture"
              class="w-10 h-10 object-cover"
            />
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-8">
      <p>No profile data available</p>
    </div>
  </div>
</template>
