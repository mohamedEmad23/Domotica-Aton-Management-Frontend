// API Response Types
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiError {
  detail?: string
  message?: string
  field_errors?: Record<string, string[]>
  [key: string]: any
}

// Type guards for runtime type checking
export function isPaginatedResponse<T>(data: any): data is PaginatedResponse<T> {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.count === 'number' &&
    (data.next === null || typeof data.next === 'string') &&
    (data.previous === null || typeof data.previous === 'string') &&
    Array.isArray(data.results)
  )
}

export function isApiError(error: any): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    (typeof error.detail === 'string' || typeof error.message === 'string')
  )
}

// ============================================================================
// ACCOUNTS MODULE
// ============================================================================

export interface User {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  department: Department
  phone: string
  display_name: string
  is_active: boolean
}

export type Department = 
  | 'SALES'
  | 'TECHNICAL'
  | 'PMO'
  | 'PROCUREMENT'
  | 'OPERATIONS'
  | 'ADMIN'
  | ''

export const DEPARTMENT_LABELS: Record<Department, string> = {
  'SALES': 'Sales',
  'TECHNICAL': 'Technical Office',
  'PMO': 'Project Management',
  'PROCUREMENT': 'Procurement & Supply Chain',
  'OPERATIONS': 'Operations',
  'ADMIN': 'Administration',
  '': 'Not Assigned',
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  user: User
}

export interface CSRFTokenResponse {
  csrfToken: string
}

// ============================================================================
// INVENTORY MODULE
// ============================================================================

export interface ProductCategory {
  id: string
  name: string
  description?: string
  parent?: string
  full_path: string
  product_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Supplier {
  id: string
  name: string
  contact_person?: string
  email?: string
  phone?: string
  address?: string
  payment_terms?: string
  lead_time_days: number
  minimum_order_amount: string
  rating: string
  total_orders: number
  on_time_deliveries: number
  on_time_delivery_rate: number
  is_active: boolean
  is_preferred: boolean
  created_at: string
  updated_at: string
}

export type UnitOfMeasure = 'PCS' | 'M' | 'KG' | 'L' | 'SET' | 'BOX' | 'ROLL' | 'PACK'

export const UNIT_OF_MEASURE_LABELS: Record<UnitOfMeasure, string> = {
  'PCS': 'Pieces',
  'M': 'Meters',
  'KG': 'Kilograms',
  'L': 'Liters',
  'SET': 'Sets',
  'BOX': 'Boxes',
  'ROLL': 'Rolls',
  'PACK': 'Packs',
}

export interface Product {
  id: string
  sku: string
  name: string
  description?: string
  category?: string
  category_name?: string
  unit_of_measure: UnitOfMeasure
  weight?: string
  dimensions?: string
  standard_cost: string
  last_purchase_cost?: string
  primary_supplier?: string
  supplier_name?: string
  alternative_suppliers?: string[]
  specifications?: Record<string, any>
  current_stock_level: number
  available_stock: number
  total_reserved: number
  is_active: boolean
  is_serialized: boolean
  created_by?: string
  created_at: string
  updated_at: string
}

export interface ProductFormData {
  sku: string
  name: string
  description?: string
  category?: string
  unit_of_measure: UnitOfMeasure
  weight?: string
  dimensions?: string
  standard_cost: string
  primary_supplier?: string
  specifications?: Record<string, any>
  is_active: boolean
}

export type LocationType = 'WAREHOUSE' | 'OFFICE' | 'VEHICLE' | 'SITE' | 'SUPPLIER'

export interface InventoryLocation {
  id: string
  code: string
  name: string
  description?: string
  address?: string
  location_type: LocationType
  manager?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface InventoryStock {
  id: string
  product: string
  product_name?: string
  location: string
  location_name?: string
  quantity_on_hand: number
  quantity_reserved: number
  quantity_available: number
  reorder_point: number
  max_stock_level: number
  needs_reorder: boolean
  stock_status: string
  last_counted_at?: string
  last_counted_by?: string
  created_at: string
  updated_at: string
}

export type TransactionType = 
  | 'RECEIVE'
  | 'DISPATCH'
  | 'RETURN'
  | 'TRANSFER'
  | 'ADJUSTMENT'
  | 'RESERVE'
  | 'UNRESERVE'
  | 'DAMAGE'
  | 'COUNT'

export interface InventoryTransaction {
  id: string
  stock_record: string
  product_name?: string
  location_name?: string
  transaction_type: TransactionType
  quantity_change: number
  reference_number?: string
  notes?: string
  created_by?: string
  created_at: string
}

export interface StockOperationRequest {
  product_id: string
  location_id: string
  quantity: number
  reference_number?: string
  notes?: string
}

export interface StockTransferRequest {
  product_id: string
  from_location_id: string
  to_location_id: string
  quantity: number
  notes?: string
}

export interface StockCheckResponse {
  available: boolean
  quantity_available: number
  quantity_requested: number
  shortfall: number
}

export interface ReorderAlert {
  product_id: string
  product_sku: string
  product_name: string
  location_id: string
  location_name: string
  quantity_available: number
  reorder_point: number
  shortfall: number
  suggested_order_quantity: number
}

// Legacy type aliases for backward compatibility
export type Category = ProductCategory
export type Stock = InventoryStock
