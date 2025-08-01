<template>
  <div class="flex items-center justify-end gap-2">
    <div class=" flex items-center gap-4">
      <UChip :show="cartStore.cartCount > 0" color="error" :text="cartStore.cartCount" size="3xl">
        <Icon
          @click="cartStore.toggleCart"
          class="w-6 h-6  cursor-pointer"
          name="streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products"
        />
      </UChip>

      <NavbarRightDropDownProfile
        :userProfile="userProfile"
      />
    </div>

    <div>
      <UIColorModeButton class="w-10 h-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
// const { isOpenCart, cartCount } = useAddCart();
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()
const userProfile:any = useState('user-profile')

</script>
