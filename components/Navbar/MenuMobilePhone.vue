<script setup lang="ts">
import { fectMenubar } from "~/services/MenubarService";
import type { CategoryDto } from "~/types";

// Load menubar data using useAsyncData as usual
const { data: categories } = await useAsyncData<CategoryDto[]>("menubar", () =>
  fectMenubar()
);

// Transform categories → navigation menu items
const menubar = computed(() =>
  (categories.value || []).map((category: any) => ({
    label: category.name,
    class:
      "text-black dark:text-[#FFFFFF] text-3xl Oswald uppercase py-3 tracking-wide",
    children: (category.categoryTypes || []).map((type: any) => ({
      label: type.name,
      class:
        "text-[#212121] dark:text-[#E0E0E0] Oswald uppercase tracking-wide",
      children: (type.categoryItems || []).map((item: any) => ({
        label: item.name,
        slug: item.slug,
        to: `/${item.slug}`,
        class: "dark:text-[#BDBDBD] Oswald capitalize tracking-wide",
      })),
    })),
  }))
);
</script>

<template>
  <MotionGroup preset="slideVisibleLeft" :duration="390">
    <div>
      <UNavigationMenu
        orientation="vertical"
        v-if="menubar"
        size="md"
        color="neutral"
        highlight
        highlight-color="neutral"
        :items="menubar"
        class="text-2xl data-[orientation=horizontal]:border-b border-default data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48 w-full"
      />
    </div>
  </MotionGroup>
</template>
<style scoped>
span.truncate {
  font-size: 40px !important;
}
</style>
