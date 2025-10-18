import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as inventoryService from '@/services/inventory'
import type { Product, ProductCategory, Supplier, InventoryStock } from '@/types/api'

// ============================================================================
// PRODUCTS
// ============================================================================

export function useProducts(params?: {
  page?: number
  page_size?: number
  search?: string
  category?: string
  active_only?: boolean
  ordering?: string
}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => inventoryService.getProducts(params),
    staleTime: 5 * 60 * 1000,
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => inventoryService.getProduct(id),
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create product')
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      inventoryService.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] })
      toast.success('Product updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update product')
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete product')
    },
  })
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => inventoryService.searchProducts(query),
    enabled: query.length > 0,
  })
}

export function useBulkImportProducts() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.bulkImportProducts,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success(`Successfully imported ${data.success} products`)
      if (data.errors.length > 0) {
        toast.error(`${data.errors.length} products failed to import`)
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to import products')
    },
  })
}

// ============================================================================
// CATEGORIES
// ============================================================================

export function useCategories(params?: { active_only?: boolean }) {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => inventoryService.getCategories(params),
  })
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => inventoryService.getCategory(id),
    enabled: !!id,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create category')
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductCategory> }) =>
      inventoryService.updateCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] })
      toast.success('Category updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update category')
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete category')
    },
  })
}

// ============================================================================
// SUPPLIERS
// ============================================================================

export function useSuppliers(params?: {
  page?: number
  search?: string
  active_only?: boolean
  preferred_only?: boolean
}) {
  return useQuery({
    queryKey: ['suppliers', params],
    queryFn: () => inventoryService.getSuppliers(params),
  })
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: ['supplier', id],
    queryFn: () => inventoryService.getSupplier(id),
    enabled: !!id,
  })
}

export function useCreateSupplier() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      toast.success('Supplier created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create supplier')
    },
  })
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Supplier> }) =>
      inventoryService.updateSupplier(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      queryClient.invalidateQueries({ queryKey: ['supplier', variables.id] })
      toast.success('Supplier updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update supplier')
    },
  })
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.deleteSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      toast.success('Supplier deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete supplier')
    },
  })
}

export function useUpdateSupplierRating() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.updateSupplierRating,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      queryClient.invalidateQueries({ queryKey: ['supplier', id] })
      toast.success(`Rating updated to ${data.new_rating}`)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update rating')
    },
  })
}

// ============================================================================
// STOCK RECORDS
// ============================================================================

export function useStock(params?: {
  product?: string
  location?: string
  low_stock?: boolean
}) {
  return useQuery({
    queryKey: ['stock', params],
    queryFn: () => inventoryService.getStock(params),
  })
}

// ============================================================================
// STOCK OPERATIONS
// ============================================================================

export function useCheckStock() {
  return useMutation({
    mutationFn: inventoryService.checkStock,
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to check stock')
    },
  })
}

export function useReceiveStock() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.receiveStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Stock received successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to receive stock')
    },
  })
}

export function useDispatchStock() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.dispatchStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Stock dispatched successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to dispatch stock')
    },
  })
}

export function useTransferStock() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.transferStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Stock transferred successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to transfer stock')
    },
  })
}

export function useReserveStock() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: inventoryService.reserveStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Stock reserved successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to reserve stock')
    },
  })
}

export function useReorderAlerts() {
  return useQuery({
    queryKey: ['reorder-alerts'],
    queryFn: inventoryService.getReorderAlerts,
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  })
}

export function useStockValuation(location_id?: string) {
  return useQuery({
    queryKey: ['stock-valuation', location_id],
    queryFn: () => inventoryService.getStockValuation(location_id),
  })
}

// ============================================================================
// TRANSACTIONS
// ============================================================================

export function useTransactions(params?: {
  product?: string
  location?: string
  transaction_type?: string
  start_date?: string
  end_date?: string
}) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => inventoryService.getTransactions(params),
  })
}

// ============================================================================
// LOCATIONS
// ============================================================================

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: inventoryService.getLocations,
  })
}
