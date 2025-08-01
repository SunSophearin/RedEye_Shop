<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAddressStore } from '~/stores/address'
const config = useRuntimeConfig()

const addressStore = useAddressStore()

const markerPosition = ref({ lat: 11.5621, lng: 104.8885 }) // Phnom Penh center

const mapOptions = {
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  clickableIcons: true,
  keyboardShortcuts: false,
  disableDoubleClickZoom: false,
  draggable: true,
  scrollwheel: true,
}

async function getLocationInfo({ lat, lng }: { lat: number; lng: number }) {
  addressStore.setError('')
  try {
    const apiKey = 'AIzaSyDrF9yF5glyM52dLm4aAU8o4fPU3O0n6Uc'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=km`
    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'OK' || !data.results.length) {
      console.warn('Cannot find city or village for this location.')
      return
    }

    let foundCity = ''
    let foundVillage = ''
    for (const comp of data.results[0].address_components) {
      if (comp.types.includes('locality')) foundCity = comp.long_name
      else if (comp.types.includes('sublocality')) foundVillage = comp.long_name
      else if (comp.types.includes('administrative_area_level_3') && !foundVillage) foundVillage = comp.long_name
      else if (comp.types.includes('administrative_area_level_2') && !foundCity) foundCity = comp.long_name
    }

    addressStore.setAddressInfo(foundCity, foundVillage, data.results[0].formatted_address)
  } catch (e) {
    addressStore.setError('បញ្ហាក្នុងការទាញយកអាសយដ្ឋាន។')
    console.error('Error fetching location info:', e)
  }
}

watch(markerPosition, (newPos) => {
  getLocationInfo(newPos)
}, { immediate: false })

function goToMyLocation() {
  if (navigator.geolocation) {
    getLocationInfo(markerPosition.value) // Fetch initial location info
    navigator.geolocation.getCurrentPosition(
      (position) => {
        markerPosition.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        addressStore.setError('')
      },
      () => {
        addressStore.setError('មិនអាចយកទីតាំងបច្ចុប្បន្នបានទេ។')
      }
    )
  } else {
    addressStore.setError('កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រការទទួលយកទីតាំងទេ។')
  }
}

function onMarkerDragEnd(event: any) {
  const { latLng } = event
  markerPosition.value = {
    lat: latLng.lat(),
    lng: latLng.lng(),
  }
}
</script>
<template>
  <div class="w-full">
    <h1 class="text-xl md:text-xl font-bold mb-4 text-start">Add Your Address</h1>
    <GMapMap
      class="relative h-48 md:h-[200px] rounded-lg overflow-hidden"
      :center="markerPosition"
      :zoom="15"
      :options="mapOptions"
      style="width: 100%"
    >
      <GMapMarker
        :position="markerPosition"
        :draggable="true"
        @dragend="onMarkerDragEnd"
      />
      <UIcon name="material-symbols:my-location" @click="goToMyLocation" class="w-6 h-6 absolute bottom-6 cursor-pointer right-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition" />
    </GMapMap>

    <div v-if="addressStore.error" class="text-red-600 text-center">{{ addressStore.error }}</div>

    <div v-if="addressStore.city || addressStore.village" class="mt-4 rounded-lg p-4 shadow-inner">
      <div v-if="addressStore.city" class="mb-1">
        <span class="font-semibold text-blue-800">ទីក្រុង/ស្រុក៖</span>
        <span class="font-bold text-blue-900">{{ addressStore.city }}</span>
      </div>
      <div v-if="addressStore.village" class="mb-1">
        <span class="font-semibold text-blue-800">ភូមិ/តំបន់៖</span>
        <span class="font-bold text-blue-900">{{ addressStore.village }}</span>
      </div>
      <div v-if="addressStore.formattedAddress" class="text-xs text-gray-500 mt-2">
        ({{ addressStore.formattedAddress }})
      </div>
    </div>
  </div>
</template>
<style>
.gm-control-active{
  display: none !important;
}
</style>