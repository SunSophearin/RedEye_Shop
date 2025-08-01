import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.public.mapApiKey;

  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: { key: apiKey, libraries: 'places' },
  });
});
