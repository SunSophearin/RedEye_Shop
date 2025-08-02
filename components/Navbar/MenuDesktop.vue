<script setup lang="ts">
import { ref, computed } from "vue";
import { fectMenubar } from "~/services/MenubarService";
import type { CategoryDto } from "~/types";
const route = useRoute();
// 🔁 Menu refresh key to force re-render of UNavigationMenu (workaround for closing behavior)
const menuKey = ref(0);

// ✅ Function to close the menu by incrementing the key
const closeMenu = () => {
  menuKey.value++; // force a re-render
};
watch(
  () => route.fullPath,
  () => {
    closeMenu();
  }
);
// 🔄 Fetch categories using useAsyncData
const { data: categories } = await useAsyncData<CategoryDto[]>("menubar", () =>
  fectMenubar()
);

// 🔽 Build navigation menu items
const navigationMenu = computed(() =>
  (categories.value || []).map((category) => ({
    label: category.name,
    slot: "category" as const,
    class: "text-black dark:text-[#FFFFFF] tracking-wide text-2xl Oswald uppercase py-2",
    children: (category.categoryTypes || []).map((type) => ({
      label: type.name,
      class:"tracking-wide",
      children: (type.categoryItems || []).map((item) => ({
        label: item.name,
        slug: item.slug,
        class:"tracking-wide",
      })),
    })),
  }))
);
</script>

<template>
  <UNavigationMenu
    :key="menuKey"
    :items="navigationMenu"
    :ui="{
      viewport: 'w-full',
      content: 'w-full',
      childList: 'w-full',
      childLinkDescription: 'text-balance line-clamp-2',
    }"
    class="w-full"
  >
    <!-- ✅ Category Slot -->
    <template #category-content="{ item }">
      <div
        class="grid w-full grid-cols-1 lg:grid-cols-4 gap-8 p-8 bg-white dark:bg-[#262626] shadow-2xl rounded-xl"
      >
        <!-- Left: Subcategories -->
        <div
          class="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div v-motion-pop
            v-for="child in item.children"
            :key="child.label"
            class="bg-gradient-to-br from-white dark:from-[#262626] to-gray-100 dark:to-black hover:from-gray-100 dark:hover:from-gray-400 hover:to-white dark:hover:to-black transition rounded-lg p-5 shadow group"
          >
            <p
              class="text-lg uppercase font-bold text-gray-800 dark:text-white mb-3 group-hover:text-neutral transition"
            >
              {{ child.label }}
            </p>

            <ul class="space-y-1 text-base">
              <li v-for="(subItem, index) in child.children" :key="index">
                <!-- ✅ Close menu on link click -->
                <NuxtLink
                  :to="`/${subItem.slug}`"
                  @click="closeMenu"
                  class="text-gray-500 dark:text-white hover:text-black flex flex-col cursor-pointer transition"
                >
                  <p class="capitalize">{{ subItem.label }}</p>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right: Image Ads -->
        <div
          class="col-span-1 h-80 lg:col-span-2 rounded-lg flex items-center gap-5 overflow-hidden"
        >
          <NuxtImg
            class="w-1/2 h-full object-cover rounded-lg shadow-lg transition-transform hover:scale-105 duration-300 ease-in-out"
            src="https://zandokh.com/image/catalog/banner/2025/ZANDO/Category%20lifestyle,%20sportlife,%20smartcasual/Update%20May/Replace/casual-men.jpg"
            alt="Ad One"
          />
          <NuxtImg
            class="w-1/2 h-full object-cover rounded-lg shadow-lg transition-transform hover:scale-105 duration-300 ease-in-out"
            src="https://zandokh.com/image/catalog/banner/2025/ZANDO/Category%20lifestyle,%20sportlife,%20smartcasual/Update%20May/Replace/casual-women.jpg"
            alt="Ad Two"
            :modifiers="{ roundCorner: '0:100' }"
          />
        </div>
      </div>
    </template>
  </UNavigationMenu>
</template>
