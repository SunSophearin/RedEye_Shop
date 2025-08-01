<script setup lang="ts">
import { useProductDetailStore } from "~/stores/productDetail";
const productStore = useProductDetailStore();
const cart = useCartStore();
const route = useRoute();
const toast = useToast();
const loading = useGlobalLoading()
onMounted(async () => {
  loading.value = true
  await productStore.fetchProduct();
  if (productStore.error) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
});

function handleAddToCart() {
  if (!productStore.product || !productStore.selectedStock) {
    toast.add({
      title: "Uh oh! Something went wrong.",
      description: "Please select a size first.",
      icon: "i-heroicons-exclamation-circle-20-solid",
      duration: 3000,
      color: "warning",
    });
    return;
  }

  const variant = productStore.product.productVariants?.[0];

  cart.addToCart({
    productId: productStore.product.id,
    stockId: productStore.selectedStock.id,
    name: productStore.product.name,
    finalPrice: productStore.product.finalPrice,
    discount: productStore.product.discount,
    price: productStore.product.price,
    size: productStore.selectedStock.size?.name || "",
    sizeId: productStore.selectedStock.size?.id,
    quantity: productStore.selectedQuantity,
    colorId: Number(route.query.color_id),
    image: variant?.images?.[0] || "",
    variantId: variant?.id || 0,
  });
}
</script>

<template>
  <div  v-show="productStore.product">
    <div class="product-detail">
      <ProductDetailBreadcrumb
        :title="productStore.product?.name || 'No Product Name'"
        class="pb-6 pt-3 md:py-8 px-4 md:px-0 line-clamp-3"
      />

      <div
        class="w-full flex flex-col justify-between items-start gap-10 md:flex-row"
      >
        <!-- Left: Images -->
        <div class="w-full md:w-1/2 flex justify-end items-start">
          <ProductDetailCarousel
            :images="productStore.product?.productVariants?.[0]?.images ?? []"
          />
        </div>

        <!-- Right: Product Info -->
        <div class="w-full md:w-1/2 flex justify-start items-center">
          <div class="w-full max-w-lg px-4 py-8 md:py-0">
            <!-- Title -->
            <h2 class="text-3xl font-semibold mb-6">
              {{ productStore.product?.name || "No Product Name" }}
            </h2>

            <!-- Pricing -->
            <div class="mb-6 flex items-center">
              <span class="text-2xl font-bold mr-2">
                ${{ productStore.product?.finalPrice ?? "--" }}
              </span>
              <span
                v-if="productStore.product?.discount"
                class="line-through text-gray-500 text-xl"
              >
                ${{ productStore.product?.price ?? "--" }}
              </span>
              <span
                v-if="productStore.product?.discount"
                class="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-semibold"
              >
                -{{ productStore.product?.discount }}%
              </span>
            </div>

            <!-- Variants -->
            <div class="mb-6">
              <ProductDetailColor />
            </div>

            <div class="mb-6">
              <p class="mb-1 font-medium">Size</p>
              <ProductDetailSize />
            </div>

            <!-- Quantity & Actions -->
            <div class="mb-6">
              <ProductDetailQuantitySelector
                :max="productStore.selectedStock?.currentQuantity"
                :sizeid="productStore.selectedStock?.size?.id"
                @quantity-updated="productStore.onQuantityUpdated"
              />
            </div>

            <!-- Actions -->
            <div class="flex space-x-4">
              <UButton
                color="neutral"
                size="xl"
                class="w-max justify-center flex-grow mb-0.5"
                @click="handleAddToCart"
              >
                Add to bag
                <UIcon
                  name="streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products"
                  size="16"
                />
              </UButton>
            </div>

            <!-- Expandable Info -->
            <div class="mt-4">
              <ProductDetailAccordion />
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Items -->
      <div class="my-10 px-4">
        <ProductDetailCarouselSimilerItem />
      </div>
    </div>
  </div>
</template>
