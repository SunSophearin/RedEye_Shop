<script lang="ts" setup>
const toast = useToast();
const inputValue = ref("");

function subscribeNewsletter() {
  toast.add({
    title: `Subscribed user with email: ${inputValue.value}`,
    closeIcon: "i-heroicons-x-mark-20-solid",
  });
}

const categories = [
  {
    label: "About",
    subcategories: [
      {
        subcategoryLabel: "About us",
      },
      {
        subcategoryLabel: "Order pickup",
      },
      {
        subcategoryLabel: "Purchase status",
      },
      {
        subcategoryLabel: "Track orders",
      },
    ],
  },
  {
    label: "How to buy",
    subcategories: [
      {
        subcategoryLabel: "Payment methods",
      },
      {
        subcategoryLabel: "Order pickup",
      },
      {
        subcategoryLabel: "Purchase status",
      },
      {
        subcategoryLabel: "Track orders",
      },
    ],
  },
  {
    label: "Help",
    subcategories: [
      {
        subcategoryLabel: "Help centers",
      },
      {
        subcategoryLabel: "Security & fraud",
      },
      {
        subcategoryLabel: "Feedback",
      },
      {
        subcategoryLabel: "Contact",
      },
    ],
  },
];

const socialIcons = [
  {
    id: 0,
    name: "Nuxt Twitter Icon",
    icon: "hugeicons:facebook-02",
    link: "https://www.facebook.com/zi.rin.75",
  },
  {
    id: 1,
    name: "Nuxt Discord Icon",
    icon: "line-md:telegram",
    link: "https://t.me/SunSophearin",
  },
  {
    id: 2,
    name: "Nuxt GitHub Icon",
    icon: "line-md:github-loop",
    link: "https://github.com/SunSophearin",
  },
];
</script>

<template>
  <footer
    class="md:pt-12 pt-2 border-t border-slate-200 dark:border-slate-800 text-center"
  >
    <div
      class="block sm:flex justify-between   md:mb-10 max-w-7xl px-6 mx-auto"
    >
      <div
        v-for="{ label, subcategories } in categories"
        :key="label"
        class="py-4 text-center sm:text-left"
      >
        <div class="text-lg  md:leading-7 font-bold font-body md:mb-2">
          {{ label }}
        </div>
        <ul>
          <li
            v-for="{ subcategoryLabel, link } in subcategories"
            :key="subcategoryLabel"
            class="text-sm text-gray-600 dark:text-gray-400 mb-2   hover:underline hover:text-natural-400 cursor-pointer"
          >
            <NuxtLink :to="link">
              {{ subcategoryLabel }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <form class="  mb-4 mt-5 sm:mt-0" @submit.prevent="subscribeNewsletter">
        <p class="text-white text-base text-center md:text-left mb-2">
          Subscribe to our newsletter
        </p>
        <div class="flex md:justify-center md:items-center  gap-1">
          <UInput
            v-model="inputValue"
            type="email"
            placeholder="you@example.com"
            class="w-5/7"
          />
          <UButton type="submit" class="ml-2 w-2/7 " color="neutral">
            Subscribe
          </UButton>
        </div>
      </form>
    </div>
    <div class="border-t border-slate-200 dark:border-slate-800 py-8">
      <div
        class="max-w-7xl px-6 mx-auto flex justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-5 sm:gap-0"
      >
        <div>
          <NuxtImg
            width="250"
            class="mx-2"
            loading="lazy"
            fetch-priority="low"
            src="/icons/We-accept-payment–for-web-footer-1.png"
          />
        </div>

        <div>
          <p
            class="flex items-center justify-center leading-5 text-center text-gray-600 dark:text-white/50 font-body text-sm"
          >
            Copyright © 2025-Present Mrr.Black - SOPHEARIN SUN License
          </p>
        </div>

        <div>
          <ul class="flex gap-4">
            <li v-for="icon in socialIcons" :key="icon.id">
              <a :href="icon.link" target="_blank" :aria-label="icon.name">
                <u-icon :name="icon.icon" size="24"></u-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
