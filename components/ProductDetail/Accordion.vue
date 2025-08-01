<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const items = [
  {
    slot: "slotTop" as const,
    content:
      "Choose a primary and a neutral color from your Tailwind CSS theme.",
  },
  {
    icon: "lsicon:sales-return-outline",
    label: "Fast Delivery",
    slot: "slotBottom" as const,
    content:
      "Choose a primary and a neutral color from your Tailwind CSS theme.",
  },
] satisfies AccordionItem[];

const slotTopItems = [
  {
    icon: "/icons/fast-delivery.svg",
    title: "Fast Delivery",
    desc: "From 1 - 3 days",
  },
  {
    icon: "/icons/hotline.svg",
    title: "Support hotline",
    desc: "(+855) 96 496 2121",
  },
  {
    icon: "/icons/payment-form.svg",
    title: "Another Service",
    desc: "Some description",
  },
];
const slotBottomItems = [
  {
    title: "Return Window",
    desc: "7 days from delivery",
  },
  {
    title: "Refund",
    desc: "Full refund for unused items",
  },
  {
    title: "Condition",
    desc: "Original packaging required",
  },
  {
    title: "Return Shipping",
    desc: "Covered by us (Max $1)",
  },
];
function chunkArray(arr: any[], size: number) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const slotTopRows = chunkArray(slotTopItems, 2);
const slotTBottomRows = chunkArray(slotBottomItems, 2);
const active = ref("0");
</script>

<template>
  <UAccordion :items="items" v-model="active" >
    <template #slotTop="{ item }">
      <div>
        <div
          v-for="(row, rowIndex) in slotTopRows"
          :key="rowIndex"
          class="flex gap-4 mb-4"
        >
          <div
            v-for="(col, colIndex) in row"
            :key="colIndex"
            class="flex items-center gap-2 flex-1 "
          >
          <div class="rounded-full p-2 bg-white">
            <NuxtImg
              :src="col.icon"
              class="w-8 h-8 inline-block "
              :alt="col.title"
            />
          </div>
            
            <div>
              <h3 class="md:text-lg">{{ col.title }}</h3>
              <p class="text-gray-500 md:text-sm text-[12px]">{{ col.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #slotBottom="{ item }">
      <div class="flex flex-col gap-4">
        <div
          v-for="(row, rowIndex) in slotTBottomRows"
          :key="rowIndex"
          class="flex gap-4 mb-2"
        >
          <div
            v-for="(col, colIndex) in row"
            :key="colIndex"
            class="flex items-center gap-2 flex-1"
          >
            <div>
              <h3 class="md:text-lg">{{ col.title }}</h3>
              <p class="text-gray-500 md:text-sm text-[12px]">{{ col.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UAccordion>
</template>
