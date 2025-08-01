<!-- components/GlobalLoading.vue -->
<template>
  <div class="vl-parent">
    <client-only>
      <Loading
        :color="isDark ? '#FFFFFF' : '#000000'"
        loader="bars"
        lock-scroll
        v-model:active="isLoading"
        :is-full-page="true"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import { useColorMode } from "#imports";
import { useGlobalLoading } from "~/composables/useGlobalLoading";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const isLoading = useGlobalLoading();
</script>
