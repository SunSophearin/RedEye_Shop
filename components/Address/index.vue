<template>
  
  <div class="max-w-lg mx-auto  ">
    <h1 class="text-2xl font-bold mb-6 text-start">Add Your Address</h1>
    <GMapMap
      class="relative h-48 md:h-[300px] rounded-lg overflow-hidden"
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
      <button
        @click="goToMyLocation"
        class="absolute bottom-6 right-6 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
      >
        ទៅកាន់ទីតាំងបច្ចុប្បន្ន
      </button>
    </GMapMap>

    <div v-if="error" class="text-red-600 text-center">{{ error }}</div>

    <div v-if="city || village" class="mt-4  rounded-lg p-4 shadow-inner">
      <div v-if="city" class="mb-1">
        <span class="font-semibold text-blue-800">ទីក្រុង/ស្រុក៖</span>
        <span class="font-bold text-blue-900">{{ city }}</span>
      </div>
      <div v-if="village" class="mb-1">
        <span class="font-semibold text-blue-800">ភូមិ/តំបន់៖</span>
        <span class="font-bold text-blue-900">{{ village }}</span>
      </div>
      <div v-if="formattedAddress" class="text-xs text-gray-500 mt-2">
        ({{ formattedAddress }})
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";
const config = useRuntimeConfig();

const markerPosition = ref({ lat: 11.5621, lng: 104.8885 }); // Phnom Penh center
const error = ref("");
const city = ref("");
const village = ref("");
const formattedAddress = ref("");

// Map options
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
};

// Get location info from Google Geocoding API
async function getLocationInfo({ lat, lng }: { lat: number, lng: number }) {
  city.value = "";
  village.value = "";
  formattedAddress.value = "";
  try {
    const apiKey = 'AIzaSyDrF9yF5glyM52dLm4aAU8o4fPU3O0n6Uc';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=km`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" || !data.results.length) {
      console.warn("Cannot find city or village for this location.");
      return;
    }

    let foundCity = "";
    let foundVillage = "";
    for (const comp of data.results[0].address_components) {
      if (comp.types.includes("locality")) foundCity = comp.long_name;
      else if (comp.types.includes("sublocality")) foundVillage = comp.long_name;
      else if (comp.types.includes("administrative_area_level_3") && !foundVillage) foundVillage = comp.long_name;
      else if (comp.types.includes("administrative_area_level_2") && !foundCity) foundCity = comp.long_name;
    }
    city.value = foundCity;
    village.value = foundVillage;
    formattedAddress.value = data.results[0].formatted_address;
    console.log("Update the location details:", { city: foundCity, village: foundVillage, address: data.results[0].formatted_address });
  } catch (e) {
    error.value = "បញ្ហាក្នុងការទាញយកអាសយដ្ឋាន។";
    console.error("Error fetching location info:", e);
  }
}

// Watch marker position and update address info
watch(markerPosition, (newPos) => {
  getLocationInfo(newPos);
}, { immediate: true });

function goToMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        markerPosition.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        error.value = "";
      },
      () => {
        error.value = "មិនអាចយកទីតាំងបច្ចុប្បន្នបានទេ។";
      }
    );
  } else {
    error.value = "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រការទទួលយកទីតាំងទេ។";
  }
}

function onMarkerDragEnd(event: any) {
  const { latLng } = event;
  markerPosition.value = {
    lat: latLng.lat(),
    lng: latLng.lng(),
  };
}

</script>
