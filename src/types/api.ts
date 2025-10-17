// API Response Types
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: "admin" | "manager" | "employee" | "field_tech"
  is_active: boolean
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  user: User
  message: string
}

export interface ApiError {
  detail?: string
  message?: string
  [key: string]: any
}

// Inventory Types
export interface Product {
  id: number
  sku: string
  name: string
  description: string
  category: number
  category_name?: string
  unit_of_measure: string
  reorder_level: number
  unit_price: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  description: string
  parent: number | null
  is_active: boolean
}

export interface Stock {
  id: number
  product: number
  product_name?: string
  location: number
  location_name?: string
  quantity: number
  last_updated: string
}

export interface Supplier {
  id: number
  name: string
  contact_person: string
  email: string
  phone: string
  address: string
  is_active: boolean
  rating: number
}
