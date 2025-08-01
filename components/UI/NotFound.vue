<template>
  <div class="w-full mx-auto flex justify-between items-center">
    <!-- component -->
    <main class="h-screen w-full flex flex-col justify-center items-center">
      <h1 class="text-9xl md:text-[300px] font-extrabold tracking-widest">404</h1>
      <div class="bg-red-500 px-2 md:px-4 md:py-2 text-sm md:text-5xl rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
        <a
          class="relative inline-block text-sm font-medium text-red-500 group active:text-red-500 focus:outline-none focus:ring"
        >
          <span
            class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-red-500 group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

          <span
            class="relative block px-8 py-3 bg-[#1A2238] border border-current"
          >
            <NuxtLink to="/">Go Home</NuxtLink>
          </span>
        </a>
      </button>
    </main>
  </div>
</template>
