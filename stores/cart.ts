import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import { ref, computed, onMounted } from 'vue'
import type { CartItem } from '~/types'

const SECRET_KEY = 'your-secret-key-123' // 🔒 Move to .env for production

function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
}

function decrypt(data: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch {
    return '[]'
  }
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])
  const loading = ref(false)
  const cartCount = ref(0)
  const isOpen = ref(false)
  

  const cartItems = computed(() => cart.value)

  function openCart() {
    isOpen.value = true
  }

  function closeCart() {
    isOpen.value = false
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  function updateCartCount(cartData: CartItem[] = cart.value) {
    cartCount.value = cartData.reduce((sum, item) => sum + item.quantity, 0)
  }

  function saveCart(cartData: CartItem[]) {
    const encrypted = encrypt(JSON.stringify(cartData))
    Cookies.set('cart', encrypted, { expires: 7 })
    cart.value = [...cartData] // 🔁 Important: trigger reactivity
    updateCartCount(cartData)
  }

  function loadCart(): CartItem[] {
    const cookie = Cookies.get('cart')
    let cartData: CartItem[] = []
    if (cookie) {
      try {
        const decrypted = decrypt(cookie)
        cartData = JSON.parse(decrypted).map((item: any) => ({
          ...item,
          quantity: Number(item.quantity) || 0,
          finalPrice: Number(item.finalPrice) || 0,
        }))
      } catch {
        cartData = []
      }
    }
    cart.value = [...cartData]
    updateCartCount(cartData)
    return cartData
  }

  function getCart(): CartItem[] {
    return cart.value.length ? cart.value : loadCart()
  }

  async function addToCart(item: CartItem) {
    loading.value = true
    try {
      await new Promise((resolve) => setTimeout(resolve, 300)) // Fake delay
      const cartData = getCart()
      const existing = cartData.find(
        (c) =>
          c.stockId === item.stockId &&
          c.sizeId === item.sizeId &&
          c.colorId === item.colorId
      )
      if (existing) {
        existing.quantity += item.quantity
      } else {
        cartData.push(item)
      }
      saveCart(cartData)

      const toast = useToast()
      toast.add({
        title: 'ជោគជ័យ',
        description: 'បានបន្ថែមទំនិញទៅក្នុងរទេះ។',
        duration: 3000,
        icon: 'i-heroicons-shopping-cart',
        color: 'neutral',
        closeIcon: 'i-heroicons-x-mark-20-solid',
      })
    } finally {
      loading.value = false
    }
  }

  async function updateItemQuantity(
    stockId: number,
    sizeId: number,
    colorId: number,
    newQuantity: number
  ) {
    loading.value = true
    try {
      const cartData = getCart()
      const index = cartData.findIndex(
        (item) =>
          item.stockId === stockId &&
          item.sizeId === sizeId &&
          item.colorId === colorId
      )
      if (index >= 0) {
        if (newQuantity <= 0) {
          cartData.splice(index, 1)
        } else {
          cartData[index].quantity = newQuantity
        }
        saveCart(cartData)
      }
    } finally {
      loading.value = false
    }
  }

  async function removeFromCart(
    stockId: number,
    sizeId: number,
    colorId: number
  ) {
    await updateItemQuantity(stockId, sizeId, colorId, 0)
  }
  function clearCart() {
  cart.value = []
  Cookies.remove('cart') // optional: remove from browser cookie
  updateCartCount([])
}

  // ✅ Load cart from cookie when store initializes
  onMounted(() => {
    loadCart()
  })

  return {
    // state
    cart,
    cartItems,
    cartCount,
    isOpen,
    loading,

    // actions
    addToCart,
    removeFromCart,
    updateItemQuantity,
    getCart,
    openCart,
    closeCart,
    toggleCart,
    clearCart
  }
})
