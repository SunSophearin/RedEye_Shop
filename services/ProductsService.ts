
// export const fetchProducts = async (categoryId = null) => {
//   try {
//     const url = categoryId
//       ? `http://localhost:8080/api/products/by-category-type/${categoryId}`
//       : `http://localhost:8080/api/products`;

//     const { data: products } = await useFetch(url);
//     return products.value;
//   } catch (error) {
//     console.error('Failed to fetch products:', error);
//     throw error;
//   }
// };
// export const fetchProductById = async (productId:any) => {
//   try {
//     const { data: product } = await useFetch(`http://localhost:8080/api/products/${productId}`);
//     return product.value;
//   } catch (error) {
//     console.error('Failed to fetch product:', error);
//     throw error;
//   }
// };