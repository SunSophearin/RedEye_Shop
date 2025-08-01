<script setup lang="ts">
import { NavbarMenuDesktop } from "#components";

const isopenMobileSldie = useState("isOpenMobileSlide");
</script>

<template>
  <nav
    class="flex justify-end items-center container mx-auto px-2 md:p-4 lg:w-[98%] relative"
  >
    <NavbarMenuDesktop
      class="hidden absolute left-1 top-1 md:flex md:w-full items-center justify-start"
    />
    <div class="w-full z-1 md:w-1/2 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <UIcon
          size="35"
          name="i-heroicons-bars-3-20-solid"
          class="md:hidden"
          color="neutral"
          variant="subtle"
          @click="isopenMobileSldie = !isopenMobileSldie"
        />
        <NavbarLogo />
      </div>

      <NavbarRight />
    </div>
  </nav>
</template>
