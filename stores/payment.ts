import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import useKhqrWebSocket from '~/composables/useWebSocket'
import { useAppToast } from '~/composables/useAppToast'
import {useCartStore} from '~/stores/cart'

const PAYMENT_EXPIRE_SECONDS = 120

export const usePaymentStore = defineStore('payment', () => {
  // --- State ---
  const clickPaymentProcess = ref(false)
  const paymentStatus = ref<'WAITING' | 'PAID' | 'EXPIRED' | 'ERROR'>('WAITING')
  const statusMessage = ref('')
  const qr = ref('')
  const md5 = ref('')
  const countdown = ref(PAYMENT_EXPIRE_SECONDS)
  const checkoutDisabled = ref(false)
  const cartStore = useCartStore()
  const toast = useToast();
  
  // --- Computed ---
  const qrImageUrl = computed(() =>
    qr.value
      ? `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr.value)}&size=220x220`
      : ''
  )

  const formattedCountdown = computed(() => {
    const min = Math.floor(countdown.value / 60).toString().padStart(2, '0')
    const sec = (countdown.value % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
  })

  // --- Private ---
  let pollingInterval: ReturnType<typeof setInterval> | null = null
  let stopWebSocket: (() => void) | null = null
  let stopTimeout: ReturnType<typeof setTimeout> | null = null
  let countdownInterval: ReturnType<typeof setInterval> | null = null

  // --- Actions ---
  function openModal() {
    clickPaymentProcess.value = true
  }
  function closeModal() {
    clickPaymentProcess.value = false
    stopCountdown()
  }
  function setStatus(status: typeof paymentStatus.value) {
    paymentStatus.value = status
  }
  function setMessage(msg: string) {
    statusMessage.value = msg
  }
  function setQr(qrStr: string) {
    qr.value = qrStr
  }
  function setMd5(md5Str: string) {
    md5.value = md5Str
  }
  function setCheckoutDisabled(val: boolean) {
    checkoutDisabled.value = val
  }

  function startCountdown() {
    countdown.value = PAYMENT_EXPIRE_SECONDS
    if (countdownInterval) clearInterval(countdownInterval)
    countdownInterval = setInterval(() => {
      if (countdown.value > 0) countdown.value--
      else stopCountdown()
    }, 1000)
  }
  function stopCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
  }

  function stopAllListeners() {
    if (pollingInterval) {
      clearInterval(pollingInterval)
      pollingInterval = null
    }
    if (stopWebSocket) {
      stopWebSocket()
      stopWebSocket = null
    }
    if (stopTimeout) {
      clearTimeout(stopTimeout)
      stopTimeout = null
    }
  }

  async function initiatePayment(payload: any, apiBaseUrl: string) {
    const toast = useAppToast()
    try {
      const response: any = await $fetch(`${apiBaseUrl}/api/sales/payment-khqr`, {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json' },
        body: payload,
        // body:{
        //   phoneNumber: "098655",

        // }
      })
      qr.value = response.qr
      md5.value = response.md5
      paymentStatus.value = 'WAITING'
      statusMessage.value = ''
      startCountdown()
      listenForPayment(apiBaseUrl)
    } catch (error: any) {
      const errorMsg = error?.response?._data?.message || 'An unexpected error occurred during payment. Please try again or contact support.'
      paymentStatus.value = 'ERROR'
      statusMessage.value = errorMsg
    }
  }

  function listenForPayment(apiBaseUrl: string) {
    stopAllListeners()
    if (!md5.value) return

    // WebSocket
    const { connect, disconnect } = useKhqrWebSocket(md5.value, (status) => {
      paymentStatus.value = status
      if (status === 'PAID') {
        statusMessage.value = '✅ Your payment was successful. Thank you for your business!'
        clickPaymentProcess.value = false
        stopAllListeners()
      }
    })
    connect()
    stopWebSocket = disconnect

    // Polling
    pollingInterval = setInterval(async () => {
      try {
        const result: any = await $fetch(`${apiBaseUrl}/api/sales/check-payment`, {
          method: 'POST',
          credentials: 'include',
          body: { md5: md5.value },
        })
        if (result.responseCode === 0) {
          paymentStatus.value = 'EXPIRED'
          statusMessage.value = '✅ Your payment has been confirmed. Thank you for your purchase!'
          clickPaymentProcess.value = false
          cartStore.clearCart() // Clear cart after successful payment
           toast.add({
                      title: "Payment Successful",
                      description:
                      "Thank you for your purchase! Your payment was received and your order is being processed.",
                      icon: "i-heroicons-check-circle",
                      color: "success", 
                      duration: 4000, 
                    });
          useOrderStore().fetchAllOrders();
          navigateTo('/orders')
          stopAllListeners()
        }
      } catch {
        // Optionally handle polling errors
      }
    }, 5000)

    // Expiry timeout
    stopTimeout = setTimeout(() => {
      if (paymentStatus.value === 'WAITING') {
        paymentStatus.value = 'EXPIRED'
        statusMessage.value = '⏳ The payment session has expired. Please initiate payment again if you wish to complete your order.'
        stopAllListeners()
      }
    }, PAYMENT_EXPIRE_SECONDS * 1000)
  }

  // --- Expose ---
  return {
    // State
    clickPaymentProcess,
    paymentStatus,
    statusMessage,
    qr,
    md5,
    countdown,
    checkoutDisabled,
    // Computed
    qrImageUrl,
    formattedCountdown,
    // Actions
    openModal,
    closeModal,
    setStatus,
    setMessage,
    setQr,
    setMd5,
    setCheckoutDisabled,
    startCountdown,
    stopCountdown,
    stopAllListeners,
    initiatePayment,
    listenForPayment,
  }
})
