<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
// await userStore.fetchUserProfile()

</script>

<template>
  <div>
    <p>Welcome admin: {{ userStore.userProfile?.username }}</p>
    <h1>{{ userStore.userProfile }}</h1>
  </div>
  
</template>