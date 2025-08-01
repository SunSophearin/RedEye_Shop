<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import type { OrderDTO } from "~/types";

defineProps<{ orders: OrderDTO[] }>();

const formatOrderDate = (dateStr: string) => {
  return useDateFormat(dateStr, "dddd, MMMM D, YYYY hh:mm A").value;
};
</script>

<template>
  <div>
    <div
      v-for="(order, index) in orders"
      :key="index"
      class="p-10 shadow-md rounded-lg mb-4"
    >
      <div class="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
        <p>#{{ order?.orderId }}</p>
        <p class="text-gray-400">{{ formatOrderDate(order?.createAt) }}</p>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col w-1/2 justify-between gap-2 ">
          <div
            v-for="(orderDetail, idx) in order?.saleDetails"
            :key="idx"
            class="flex gap-2  shadow-md p-2 rounded-lg"
          >
            <NuxtImg
              :src="orderDetail?.images?.[0]"
              class="w-19 h-28 object-cover rounded-md"
              alt="Product Image"
            />
            <div class="flex flex-col justify-start">
              <p class="text-lg font-semibold">
                {{ orderDetail?.productName }}
              </p>
              <p class="text-gray-500">
                Quantity: {{ orderDetail?.quantity }}
              </p>
              <p class="text-gray-500">
                Price: ${{ orderDetail?.price?.toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
        <div class="shadow-md py-2 px-4 rounded-lg w-1/2">
          <p class="text-lg font-semibold">Order Summary</p>
          <p class="text-gray-500">
            Total: ${{ order?.finalPrice?.toFixed(2) }}
          </p>
          <p class="text-gray-500">
            Status Payment: {{ order?.status }}
          </p>
          <p class="text-gray-500">
            Delivery Address: {{ order?.address }}
          </p>
          <p class="text-gray-500">
            Phone Number: {{ order?.phoneNumber }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="orders.length === 0" class="text-center text-gray-400 py-10">
      No orders in this status.
    </div>
  </div>
</template>
