<script setup lang="ts">
import { ref, watch } from "vue";
import type { SelectItem } from "@nuxt/ui";

const config = useRuntimeConfig();
const { data } = await useFetch(`${config.public.API_BASE_URL}/api/delivery-fee`);
console.log("Delivery Fee Data:", data.value);
const items: any = ref<SelectItem[]>([]);
const value = ref(null);

if (data.value) {
  items.value = data.value.map((item: any) => ({
    label: [
      item.name ?? "",
      item.price != null ? `( ${item.price}$ )` : "",
      item.description ?? "",
    ]
      .filter(Boolean)
      .join(" - "),
    value: item.id,
    avatar: {
      src: item.image,
      alt: item.name,
    },
    ui: {
      label: `${item.fee}៛`,
    },
  }));
}

// Watch for items update and auto-select first item
watch(
  items,
  (newItems) => {
    if (newItems.length > 0) {
      value.value = newItems[0].value;
    }
  },
  { immediate: true }
);

// Avatar function for USelect
const avatar = computed(
  () => items.value.find((item) => item.value === value.value)?.avatar
);
</script>
<template>
  <USelect
    color="neutral"
    v-model="value"
    :items="items"
    value-key="value"
    :avatar="avatar"
    class="w-full"
    size="xl"
  />
</template>
