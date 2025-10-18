import api from "./api"
import type { 
  Product, 
  ProductCategory,
  Supplier,
  InventoryStock,
  InventoryTransaction,
  InventoryLocation,
  StockCheckResponse,
  ReorderAlert,
  PaginatedResponse 
} from "@/types/api"

// Products
export const getProducts = async (params?: {
  page?: number
  page_size?: number
  search?: string
  category?: string
  active_only?: boolean
  ordering?: string
}) => {
  const { data } = await api.get<PaginatedResponse<Product>>("/inventory/api/products/", { params })
  return data
}

export const getProduct = async (id: string) => {
  const { data } = await api.get<Product>(`/inventory/api/products/${id}/`)
  return data
}

export const createProduct = async (product: Partial<Product>) => {
  const { data } = await api.post<Product>("/inventory/api/products/", product)
  return data
}

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const { data } = await api.put<Product>(`/inventory/api/products/${id}/`, product)
  return data
}

export const deleteProduct = async (id: string) => {
  await api.delete(`/inventory/api/products/${id}/`)
}

export const searchProducts = async (query: string) => {
  const { data } = await api.get<Product[]>(`/inventory/api/products/search/?q=${query}`)
  return data
}

export const bulkImportProducts = async (products: Partial<Product>[]) => {
  const { data } = await api.post<{ success: number; errors: any[] }>("/inventory/api/products/bulk_import/", { products })
  return data
}

// Categories
export const getCategories = async (params?: { active_only?: boolean }) => {
  const { data } = await api.get<PaginatedResponse<ProductCategory>>("/inventory/api/categories/", { params })
  return data
}

export const getCategory = async (id: string) => {
  const { data } = await api.get<ProductCategory>(`/inventory/api/categories/${id}/`)
  return data
}

export const createCategory = async (category: Partial<ProductCategory>) => {
  const { data } = await api.post<ProductCategory>("/inventory/api/categories/", category)
  return data
}

export const updateCategory = async (id: string, category: Partial<ProductCategory>) => {
  const { data } = await api.put<ProductCategory>(`/inventory/api/categories/${id}/`, category)
  return data
}

export const deleteCategory = async (id: string) => {
  await api.delete(`/inventory/api/categories/${id}/`)
}

// Suppliers
export const getSuppliers = async (params?: { 
  page?: number
  search?: string
  active_only?: boolean
  preferred_only?: boolean
}) => {
  const { data } = await api.get<PaginatedResponse<Supplier>>("/inventory/api/suppliers/", { params })
  return data
}

export const getSupplier = async (id: string) => {
  const { data } = await api.get<Supplier>(`/inventory/api/suppliers/${id}/`)
  return data
}

export const createSupplier = async (supplier: Partial<Supplier>) => {
  const { data } = await api.post<Supplier>("/inventory/api/suppliers/", supplier)
  return data
}

export const updateSupplier = async (id: string, supplier: Partial<Supplier>) => {
  const { data } = await api.put<Supplier>(`/inventory/api/suppliers/${id}/`, supplier)
  return data
}

export const deleteSupplier = async (id: string) => {
  await api.delete(`/inventory/api/suppliers/${id}/`)
}

export const updateSupplierRating = async (id: string) => {
  const { data } = await api.post<{ message: string; new_rating: number }>(`/inventory/api/suppliers/${id}/update_rating/`)
  return data
}

// Stock Records
export const getStock = async (params?: { 
  product?: string
  location?: string
  low_stock?: boolean
}) => {
  const { data } = await api.get<PaginatedResponse<InventoryStock>>("/inventory/api/stock/", { params })
  return data
}

// Stock Operations
export const checkStock = async (data: { 
  product_id: string
  quantity: number
  location_id: string
}) => {
  const { data: response } = await api.post<StockCheckResponse>("/inventory/api/operations/check_stock/", data)
  return response
}

export const receiveStock = async (data: {
  product_id: string
  location_id: string
  quantity: number
  reference_number?: string
  notes?: string
}) => {
  const { data: response } = await api.post("/inventory/api/operations/receive_stock/", data)
  return response
}

export const dispatchStock = async (data: {
  product_id: string
  location_id: string
  quantity: number
  reference_number?: string
  notes?: string
}) => {
  const { data: response } = await api.post("/inventory/api/operations/dispatch_stock/", data)
  return response
}

export const transferStock = async (data: {
  product_id: string
  from_location_id: string
  to_location_id: string
  quantity: number
  notes?: string
}) => {
  const { data: response } = await api.post("/inventory/api/operations/transfer_stock/", data)
  return response
}

export const reserveStock = async (data: {
  product_id: string
  location_id: string
  quantity: number
  reference_number?: string
  notes?: string
}) => {
  const { data: response } = await api.post("/inventory/api/operations/reserve_stock/", data)
  return response
}

export const getReorderAlerts = async () => {
  const { data } = await api.get<{ alerts: ReorderAlert[] }>("/inventory/api/operations/reorder_alerts/")
  return data
}

export const getStockValuation = async (location_id?: string) => {
  const { data } = await api.get<{
    total_value: string
    by_category: Array<{ category: string; value: string; quantity: number }>
    by_location: Array<{ location: string; value: string }>
  }>("/inventory/api/operations/stock_valuation/", {
    params: { location_id },
  })
  return data
}

// Transactions
export const getTransactions = async (params?: {
  product?: string
  location?: string
  transaction_type?: string
  start_date?: string
  end_date?: string
}) => {
  const { data } = await api.get<PaginatedResponse<InventoryTransaction>>("/inventory/api/transactions/", { params })
  return data
}

// Locations
export const getLocations = async () => {
  const { data } = await api.get<PaginatedResponse<InventoryLocation>>("/inventory/api/locations/")
  return data
}
