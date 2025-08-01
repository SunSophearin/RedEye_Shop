export interface CategoryTypeDto {
  id: number
  name: string
  slug: string
  categoryItems: CategoryItemDto[]
}
export interface CategoryItemDto {
  id: number
  name: string
  slug: string
}
export interface CategoryDto {
  id: number
  name: string
  code?: string
  description?: string
  categoryTypes: CategoryTypeDto[]
}


export interface Product {
  id: number;
  name: string;
  slug: string;
  discount: number;
  description: string;
  price: number;
  finalPrice: number;
  createAt: string; // ISO Date string
  updateAt: string;
  category: Category;
  categoryType: CategoryType;
  categoryItem: CategoryItemDto;
  productVariants: ProductVariant[];
  menuFacturer: Manufacturer;
  newArrival: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  code: string;
  description: string;
  categoryTypes: CategoryType[];
}

export interface CategoryType {
  id: number;
  slug: string;
  name: string;
  code: string | null;
  description: string | null;
  categoryitems: CategoryItemDto[];
}

export interface Stock {
  id: number;
  currentQuantity: number;
  averageImportPrice: number;
  lastUpdated: string;
  size: Size;
}

export interface ImportStock {
  id: number;
  quantity: number;
  importPricePerUnit: number;
  importDate: string | null;
}

export interface ProductVariant {
  id: number;
  color: Color;
  images: string[];
  stocks: Stock[];
  importStocks: ImportStock[];
}

export interface Color {
  id: number;
  name: string;
  colorCode: string; // Hex color code
}

export interface Size {
  id: number
  name: string
}
export interface OrderDetailDTO {
  id: number
  price: number
  discount: number
  finalPrice: number
  quantity: number
  productName: string
  productVariantName: string
  sizeName: string
  colorName: string
  images: string[]
}
export interface OrderDTO {
  id: number
  orderId: string
  transactionId: string
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'
  deliveryStatus: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  notes: string | null
  quantity: number
  finalPrice: number
  phoneNumber: string
  address: string
  latitude: number
  longitude: number
  createAt: string
  updateAt: string
  userName: string | null
  saleDetails: OrderDetailDTO[]
}

export interface Manufacturer {
  id: number;
  name: string;
}
export interface CartItem {
  productId: number
  stockId: number
  name: string
  price: number
  discount: number
  finalPrice: number
  size: string
  sizeId: number
  colorId: number
  quantity: number
  image: string
  variantId: number
}