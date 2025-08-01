import type {OrderDTO} from '~/types'
export const useOrderApi = () => {
  const config = useRuntimeConfig();
    // Use $fetch for programmatic API calls in composables
  // 1. Fetch all orders by delivery status
  const fetchOrders = async (deliveryStatus: string): Promise<OrderDTO[]> => {
    const url = `${config.public.API_BASE_URL}/api/sales/my-order/delivery-status/PENDING`;
    try {
      return await $fetch<OrderDTO[]>(url);
    } catch (error: any) {
      console.error('❌ Failed to fetch orders:', error?.message || error);
      throw new Error('Failed to fetch orders');
    }
  };

  // 2. Fetch order by ID
  const fetchOrderById = async (orderId: number): Promise<OrderDTO> => {
    const url = `${config.public.API_BASE_URL}/api/orders/${orderId}`;
    try {
      const order = await $fetch<OrderDTO>(url);
      if (!order) throw new Error('Order not found');
      return order;
    } catch (error: any) {
      // Log the entire error object for more details
      console.error('❌ Failed to fetch order:', error);
      throw new Error('Failed to fetch order');
    }
  };

  return { fetchOrders, fetchOrderById };
};