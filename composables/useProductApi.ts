// ~/composables/useProductApi.ts
import type { Product, Stock } from '~/types';

export const useProductApi = () => {
  const config = useRuntimeConfig();
  // const errorStore = useErrorStore()
  // Use $fetch for programmatic API calls in composables
  // 1. Fetch all products (optionally by category)
  const fetchProducts = async (categoryId: number | null = null): Promise<Product[]> => {
  const url = categoryId
    ? `${config.public.API_BASE_URL}/api/products/by-category-item/${categoryId}`
    : `${config.public.API_BASE_URL}/api/products`;

  try {
    return await $fetch<Product[]>(url);
  } catch (error: any) {
    if (error?.response?.status === 404) {
      // Expected: e.g. category empty → treat as empty list
      return [];
    }

    // Unexpected: network/server error → custom error message or logging
    console.error('🧨 Unexpected fetch error:', error);
    throw new Error('Failed to load products, please try again later.');
  }
};


  // 2. Fetch product by ID
  const fetchProductById = async (
  productId: Number,
  query: Record<string, any> = {}
): Promise<Product> => {
  const url = `${config.public.API_BASE_URL}/api/products/${productId}`;
  try {
    const product = await $fetch<Product>(url, { params: query });
    if (!product) throw new Error('Product not found');
    return product;
  } catch (error: any) {
    // Log the entire error object for more details
    console.error('❌ Failed to fetch product:', error);
    throw new Error('Failed to fetch product');
  }
};

  // 3. Fetch stock by stockId
  const fetchStock = async (stockId: number): Promise<Stock> => {
    const url = `${config.public.API_BASE_URL}/api/products/get_stock_by_id/${stockId}`;
    try {
      const stock = await $fetch<Stock>(url);
      if (!stock) throw new Error('Stock not found');
      return stock;
    } catch (error: any) {
      console.error('❌ Failed to fetch stock:', error?.message || error);
      throw new Error('Failed to fetch stock');
    }
  };

  return {
    fetchProducts,
    fetchProductById,
    fetchStock,
  };
};
