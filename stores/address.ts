import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  const infoaddress = ref('')
  const city = ref('')
  const village = ref('')
  const formattedAddress = ref('')
  const error = ref('')

  function setAddressInfo(cityName: string, villageName: string, formattedAddr: string) {
    city.value = cityName
    village.value = villageName
    formattedAddress.value = formattedAddr
    infoaddress.value = cityName + ',' + villageName + ',' + formattedAddr
  }

  function setError(msg: string) {
    error.value = msg
  }

  function reset() {
    city.value = ''
    village.value = ''
    formattedAddress.value = ''
    infoaddress.value = ''
    error.value = ''
  }

  return {
    infoaddress,
    city,
    village,
    formattedAddress,
    error,
    setAddressInfo,
    setError,
    reset,
  }
})
