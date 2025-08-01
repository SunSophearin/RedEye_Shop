<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const toast = useToast?.() || { add: console.log };

interface PaymentMethod {
  key: string;
  label: string;
  img: string;
  onClick?: () => void;
  url?: string;
  description?: string;
  disabled?: boolean;
}

const paymentMethods = defineProps<{
  methods: PaymentMethod[];
}>();

// ✅ Define Zod schema
const schema = z.object({
  paymentMethod: z.enum(
    paymentMethods.methods.map((m) => m.key) as [string, ...string[]],
    {
      required_error: "Please select a payment method",
    }
  ),
});

type Schema = z.output<typeof schema>;

// ✅ Use Nuxt's useState instead of reactive
const state = useState<Partial<Schema>>('payment-method-state', () => ({
  paymentMethod: undefined,
}));


function onSubmit(event: FormSubmitEvent<Schema>) {
  const method = paymentMethods.methods.find(
    (m) => m.key === state.value.paymentMethod
  );
  if (method?.url) {
    window.open(method.url, "_blank");
  }
  toast.add({
    title: "Payment",
    description: `You selected ${method?.label} payment.`,
    color: "success",
  });
}

function handlePaymentClick(method: PaymentMethod) {
  state.value.paymentMethod = method.key;
  console.log(`Clicked payment method: ${method.key}`);
}
onMounted(() => {
  // Find the first enabled (not disabled) payment method
  const firstEnabled = paymentMethods.methods.find(m => !m.disabled)
  if (firstEnabled) {
    state.value.paymentMethod = firstEnabled.key
  }
})
</script>


<template>
  <div class="pb-1">
    <h1 class="text-xl md:text-xl font-bold mb-4">Add Your Payment Method</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField
        name="paymentMethod"
        class="text-2xl font-bold mb-4 text-black"
      >
        <div class="flex gap-4 flex-col">
          <UButton
          v-for="method in paymentMethods.methods"
            :disabled=" method.disabled"
            :key="method.key"
            :active="state.paymentMethod === method.key"
            active-variant="subtle"
            active-color="neutral"
            color="neutral"
            variant="ghost"
            type="button"
            class="cursor-pointer"
            @click="handlePaymentClick(method)"
          >
            <img
              :src="method.img"
              :alt="method.label"
              class="h-10 md:h-[30px]"
            />
            <div
              v-if="method.key === 'KHQR'"
              class="flex flex-col justify-start items-start"
            >
              <h1 class="text-sm md:text-lg font-bold">KHQR PAY</h1>
              <p class="md:text-sm text-gray-500">{{ method.description }}</p>
            </div>
          </UButton>
        </div>
      </UFormField>
    </UForm>
  </div>
</template>
