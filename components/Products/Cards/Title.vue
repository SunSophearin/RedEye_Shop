<template>
    <div>
        <p class="text-[13px] line-clamp-3 md:text-[15px] truncate text-ellipsis font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
            {{ title}}
        </p>
    </div>
</template>
<script setup lang="ts">
const props=defineProps({title: String});
</script>