export const useKhqrWebSocket = (orderId: string) => {
  const config = useRuntimeConfig()
  const message = ref<string | null>(null)
  const isConnected = ref(false)
  let socket: WebSocket | null = null

  const connect = () => {
    socket = new WebSocket(`ws://localhost:8080/khqr/${orderId}`) // Adjust URL if needed
    // socket = new WebSocket(`${config.public.apiHost}/khqr/${orderId}`) // Adjust URL if needed

    socket.onopen = () => {
      isConnected.value = true
      console.log("✅ WebSocket connected")
    }

    socket.onmessage = (event) => {
      message.value = event.data
      console.log("💬 WebSocket message:", event.data)
    }

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error)
    }

    socket.onclose = () => {
      isConnected.value = false
      console.log("❌ WebSocket disconnected")
    }
  }

  const disconnect = () => {
    socket?.close()
  }

  onBeforeUnmount(() => {
    disconnect()
  })

  return { connect, disconnect, message, isConnected }
}
