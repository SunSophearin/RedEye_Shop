<script setup lang="ts">
const orderId = 'ABC123' // Replace with your actual order ID
const { connect, message, isConnected } = useKhqrWebSocket(orderId)

onMounted(() => {
  connect()
})

// watch(message, (newVal) => {
//   if (newVal === 'PAID') {
//     console.log('🎉 Payment completed!')
//     // You can redirect, update UI, show modal etc.
//   }
// })
</script>

<template>
  <div>
    <p v-if="isConnected">🟢 Connected to payment system</p>
    <p v-else>🔴 Not connected</p>
    <p>Message: {{ message }}</p>
  </div>
</template>
