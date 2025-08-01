<template>
  <div class="flex justify-center items-center min-h-screen">
    <div
      class="max-w-sm w-full rounded-lg shadow-lg p-6 space-y-6 border border-gray-200 dark:border-gray-700"
    >
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
        <p class="text-zinc-500 dark:text-zinc-400">
          By logging in, you accept our
          <a class="text-blue-500 hover:text-blue-700" href="#">terms</a>
          and
          <a class="text-blue-500 hover:text-blue-700" href="#"
            >privacy policy</a
          >.
        </p>
      </div>
      <div class="space-y-4">
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="email"
            >Email</label
          >
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            type="email"
            id="email"
            placeholder="manish@example.com"
          />
        </div>
        <div class="flex items-center space-x-2">
          <hr class="flex-grow border-zinc-200 dark:border-zinc-700" />
          <span class="text-zinc-400 dark:text-zinc-300 text-sm">OR</span>
          <hr class="flex-grow border-zinc-200 dark:border-zinc-700" />
        </div>
        <button
          @click="loginWithGoogle"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full bg-black text-white"
        >
          <div class="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-5 h-5 mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
              <line x1="21.17" x2="12" y1="8" y2="8"></line>
              <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
              <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
            </svg>
            Login with Google
          </div>
        </button>
        <button
          @click="loginWithFacebook"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full  text-black dark:bg-black dark:text-white"
        >
          <div class="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 mr-2"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
            Login with Facebook
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config=useRuntimeConfig()
const loginWithGoogle = () => {
  // window.location.href = "http://localhost:8080/oauth2/authorization/google";
  window.location.href = `${config.public.API_BASE_URL}/oauth2/authorization/google`;
};

const loginWithFacebook = () => {
  // window.location.href = "http://localhost:8080/oauth2/authorization/facebook";
  window.location.href = `${config.public.API_BASE_URL}/oauth2/authorization/facebook`;
};
// const { isOpenCart } = useAddCart()
const { closeCart } = useCartStore()
onMounted(()=>{
  closeCart()
})
const token=useCookie('token').value
</script>
