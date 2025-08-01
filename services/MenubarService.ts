export const fectMenubar = async () => {
  const config = useRuntimeConfig();
  try {
    // const {data:menu}=await useFetch('http://localhost:8080/api/category');
    const { data: menu } = await useFetch(`${config.public.API_BASE_URL}/api/category`);
        return menu.value;
  } catch (error) {
    console.error('Failed to fetch menubar:', error);
    throw error;
  }
}