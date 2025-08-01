<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
const userStore = useUserStore();
import { storeToRefs } from "pinia";
import { useOrderStore } from "~/stores/order";
const config = useRuntimeConfig();
const orderStore = useOrderStore();
const { statusCount } = storeToRefs(orderStore);
const logout = async () => {
  await $fetch(`${config.public.API_BASE_URL}/api/auth/logout`, {
    method: "GET",
    credentials: "include", // 🔐 Important: Include cookie in the request
  });
  navigateTo("/login");
  userStore.clearUserProfile();
};

const items: DropdownMenuItem[][] = [
  [
    {
      label: "Profile",
      icon: "i-lucide-user",
      slot: "profile" as const,
      // onSelect: () => navigateTo("/profile"),
    },
  ],
  [
    {
      label: "My Orders",
      icon: "material-symbols:order-approve-outline-rounded",
      slot: "chip" as const,
      onSelect: () => navigateTo("/orders"),
    },
  ],
  [
    {
      label: "Logout",
      color: "error",
      icon: "lets-icons:sign-out-circle",
      onSelect: logout,
    },
  ],
];
const profilePicture = computed(() => {
  const pic = userStore.userProfile?.picture;
  if (!pic) return "";
  return pic.startsWith("http")
    ? pic
    : `${config.public.API_BASE_URL}/images/${pic}`;
});
</script>
<template>
  <ClientOnly>
    <UDropdownMenu
      v-if="userStore.userProfile"
      :items="items"
      :ui="{ content: 'w-55' }"
    >
      <template #profile="{ item }">
        <div class="flex gap-2 items-center">
          <UAvatar :src="profilePicture " alt="User Picture" />
          <div class="flex flex-col justify-center items-start">
            <p class="text-sm font-semibold">
              {{ userStore.userProfile.username }}
            </p>
            <p class="text-xs text-gray-600 truncate w-[90%]">
              {{ userStore.userProfile.email }}
            </p>
          </div>
        </div>
      </template>
      <template #chip="{ item }">
        <UChip
          :show="statusCount > 0"
          :text="statusCount"
          color="primary"
          size="xl"
        >
          <!-- Example: show order count or status -->
          <UIcon :name="item.icon" class="text-xl text-gray-600" />
        </UChip>
        <p class="text-xs">{{ item.label }}</p>
      </template>
      <UChip :show="statusCount > 0" :text="statusCount" color="info" size="xl">
        <UAvatar :src="userStore.userProfile?.picture" alt="" size="sm" />
      </UChip>
    </UDropdownMenu>
    <Icon
      v-else
      @click="navigateTo('/login')"
      class="w-8 h-8 mt-2"
      name="material-symbols:person"
    />
  </ClientOnly>
</template>
