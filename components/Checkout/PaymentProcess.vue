<template>
  <div>
    <UButton
      class="w-full mb-4 justify-center"
      size="xl"
      color="neutral"
      @click="handlePaymentClick"
      :disabled="
        paymentStatus === 'PAID' ||
        paymentStatus === 'EXPIRED' ||
        checkoutDisabled
      "
    >
      Checkout
    </UButton>

    <UModal
      v-if="
        qrImageUrl && paymentStatus !== 'ERROR' && paymentStatus !== 'EXPIRED'
      "
      v-model:open="clickPaymentProcess"
      title="ស្កេន QR Code ដើម្បីបង់ប្រាក់ "
      :description="` ${formattedCountdown} វិនាទី`"
      class="rounded-lg"
    >
      <template #body>
        <img src="../../public/icons/khqr2.png" alt="" class="w-1/2 mx-auto relative">
        <!-- <div class="text-center text-blue-600 text-2xl font-mono">
            ⏳ {{ formattedCountdown }}
          </div> -->
          <p class="absolute top-[161px] md:top-[200px] left-1/3 transform -translate-x-1/5  text-center text-gray-600 text-sm font-bold">$ {{ total }}</p>
        <img
            :src="qrImageUrl"
            alt="QR Code"
            class="border-2 border-blue-200 rounded-lg shadow-md w-2/5  object-contain absolute top-3/4  left-1/2 transform -translate-x-1/2 -translate-y-3/5"
          />
        </img>
        
        <!-- <div class="flex flex-col items-center space-y-4">
          <p class="font-medium text-lg text-gray-700">ស្កេន QR Code នេះ៖</p>
          <div class="text-center text-blue-600 text-2xl font-mono">
            ⏳ {{ formattedCountdown }}
          </div>
          <img
            :src="qrImageUrl"
            alt="QR Code"
            class="border-2 border-blue-200 rounded-lg shadow-md w-56 h-56 object-contain"
          />
        </div> -->
      </template>
    </UModal>

    <div
      v-if="statusMessage"
      class="mt-4 text-center font-semibold"
      :class="{
        'text-green-600': paymentStatus === 'PAID',
        'text-red-600':
          paymentStatus === 'EXPIRED' || paymentStatus === 'ERROR',
        'text-blue-600': paymentStatus === 'WAITING',
      }"
    >
      {{ statusMessage }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { usePaymentStore } from "~/stores/payment";
import { useUserStore } from "~/stores/user";
import { useAddressStore } from "~/stores/address";
import { useCartStore } from "~/stores/cart";
import { useToast } from "#imports"; // Or your toast composable

const toast = useToast();
const total:any= useState('total')
const paymentStore = usePaymentStore();
const userStore = useUserStore();
const addressStore = useAddressStore();
const cartStore = useCartStore();

const phoneError = ref("");
const addressError = ref("");

const { formInfoUser } = storeToRefs(userStore);
const { infoaddress } = storeToRefs(addressStore);
const { cart } = storeToRefs(cartStore);
const {
  clickPaymentProcess,
  paymentStatus,
  statusMessage,
  qrImageUrl,
  formattedCountdown,
  checkoutDisabled,
} = storeToRefs(paymentStore);

const config = useRuntimeConfig();

function isValidPhone(phone: string | undefined): boolean {
  if (!phone) return false;
  return /^0\d{8,9}$/.test(phone);
}

function handlePaymentClick() {
  addressError.value = "";
  phoneError.value = "";

  // Validate phone
  if (!isValidPhone(formInfoUser.value.phone)) {
    const msg =
      "Please enter a valid phone number (must start with 0 and have 9-10 digits)";
    phoneError.value = msg;
    toast.add({
      title: "Error",
      description: msg,
      color: "warning",
    });
    return;
  }

  // Validate address
  if (!infoaddress.value || infoaddress.value.trim().length < 5) {
    const msg = "Please select your address";
    addressError.value = msg;
    toast.add({
      title: "Error",
      description: msg,
      color: "error",
    });
    return;
  }

  if (checkoutDisabled.value) return;
  paymentStore.setCheckoutDisabled(true);
  setTimeout(() => paymentStore.setCheckoutDisabled(false), 2000);
  paymentStore.openModal();
  paymentStore.initiatePayment(
    {
      address: infoaddress.value,
      username: formInfoUser.value.name,
      phoneNumber: formInfoUser.value.phone,
      saleDetailDTOS: cart.value,
    },
    config.public.API_BASE_URL
  );
}

// Watch for payment errors and show toast
watch(paymentStatus, (newStatus) => {
  if (newStatus === "ERROR") {
    toast.add({
      title: "Payment Error",
      description: statusMessage.value || "Payment failed. Please try again.",
      color: "error",
    });
    // Optionally: paymentStore.closeModal()
  }
});
onBeforeUnmount(paymentStore.stopAllListeners);
</script>
