import {defineStore} from 'pinia'
import type {Product} from '~/types'
import {useProductApi} from '~/composables/useProductApi'
export const useProductsStore = defineStore('products',()=> {
    // const useProductApi = useProductApi()
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const fetchProducts = async (category: string) => {
        loading.value = true
        error.value = null
        try {
            const { fetchProductsByCategory }:any = useProductApi()
            products.value = await fetchProductsByCategory(category)
        } catch (error:any) {
            error.value = error instanceof Error ? error.message : 'Failed to fetch products.'        
        } finally {
            loading.value = false
        }
    }

        return {
            products,
            loading,
            error,
            fetchProducts
        }
    })