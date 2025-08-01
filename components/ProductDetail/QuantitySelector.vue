<script lang="ts" setup>
import { useId } from "#imports";
import { useProductDetailStore } from '~/stores/productDetail'
const productStore = useProductDetailStore()
const toast = useToast();
// Props
const props = defineProps({
  disabled: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
  count: { type: Number, default: 1 },
  sizeid: { type: [Number, String], default: null },
  max: { type: Number, default: 3 },
  style: { type: String, default: "" },
  flex_column: { type: String, default: "" },
});

const stockQty = computed(() => productStore.stockQty)

// 🔎 Find selected product based on query or prop
const selectedImportProduct = computed(() => {
  const sizeId = props.sizeid?.toString();
  return (
    stockQty.value.find((item) => item.size?.id?.toString() === sizeId) || null
  );
});

// Quantity logic
const min = ref(1);
const max = computed(() => props.max);
const count = ref(props.count);

// Reset quantity on size change
watch(selectedImportProduct, (newVal, oldVal) => {
  if (newVal?.size?.id !== oldVal?.size?.id) {
    count.value = 1;
  }
});

const inc = () => {
  if (count.value < max.value) count.value++;
};
const dec = () => {
  if (count.value > min.value) count.value--;
};

// Emit change
const emit = defineEmits<{
  (e: "quantity-updated", value: number): void;
}>();
watch(count, (val) => emit("quantity-updated", val));

// Stock warning
const stockMessage = computed(() => {
  const qty = props.max ?? 0;
  return qty > 0 && qty <= 2 ? `(${qty} left in stock)` : "";
});

const inputId = useId();
const iconSize = ref(20)

onMounted(() => {
  if(process.client){

    iconSize.value = window.innerWidth >= 768 ? 30 : 15
  }
})

</script>

<template>
  <div class="flex md:flex-row justify-start items-center md:gap-2 md:mb-1" :class="flex_column">
    <p class="text-[13px] md:text-base">Quantity</p>
    <p class="md:text-sm text-[13px] text-red-500">
      {{ stockMessage }}
    </p>
  </div>
  <div :class="props.style">
    <div class="inline-flex flex-col items-center">
      <div class="flex border border-gray-700 rounded-md h-8 md:h-8 lg:h-11">
        <UButton
          type="button"
          :disabled="count <= min || props.disabled"
          class="rounded-r-none cursor-pointer"
          :class="props.small && '!p-1'"
          :aria-controls="inputId"
          variant="ghost"
          color="neutral"
          aria-label="Decrease value"
          @click="dec"
        >
          <UIcon name="i-heroicons-minus" :size="iconSize " />
        </UButton>
        <input
          :id="inputId"
          v-model="count"
          type="number"
          role="spinbutton"
          disabled
          aria-label="Quantity Selector"
          class="w-3 md:w-2 lg:w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none disabled:placeholder-disabled-900"
          :class="!props.small && 'mx-2'"
          :min="min"
          :max="max"
        />
        <UButton
          color="neutral"
          type="button"
          :disabled="count >= max || !props.sizeid"
          class="rounded-l-none cursor-pointer"
          :class="props.small && '!p-1'"
          :aria-controls="inputId"
          variant="ghost"
          aria-label="Increase value"
          @click="inc"
        >
          <UIcon name="i-heroicons-plus" :size="iconSize " />
        </UButton>
      </div>
    </div>
  </div>
</template>