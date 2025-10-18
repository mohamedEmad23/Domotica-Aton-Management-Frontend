// ============================================================================
// ANALYTICS MODULE TYPES
// ============================================================================

export type AnomalyType = 'STOCK_DISCREPANCY' | 'COST_SPIKE' | 'DELAY' | 'QUALITY_ISSUE' | 'BUDGET_OVERRUN'
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type AnomalyStatus = 'DETECTED' | 'ACKNOWLEDGED' | 'RESOLVED' | 'IGNORED'
export type InsightType = 'TREND' | 'PREDICTION' | 'RECOMMENDATION' | 'ALERT'

export interface Anomaly {
  id: string
  anomaly_type: AnomalyType
  severity: Severity
  status: AnomalyStatus
  title: string
  description: string
  affected_entity_type: string
  affected_entity_id: string
  detected_at: string
  acknowledged_by?: string
  acknowledged_by_name?: string
  acknowledged_at?: string
  resolved_by?: string
  resolved_by_name?: string
  resolved_at?: string
  resolution_notes?: string
  created_at: string
  updated_at: string
}

export interface Insight {
  id: string
  insight_type: InsightType
  title: string
  description: string
  data: Record<string, any>
  priority: number
  is_dismissed: boolean
  dismissed_by?: string
  dismissed_by_name?: string
  dismissed_at?: string
  created_at: string
  updated_at: string
}

export interface AnalyticsCache {
  id: string
  cache_key: string
  cache_data: Record<string, any>
  expires_at: string
  created_at: string
  updated_at: string
}

// Chart Data Types
export interface TrendData {
  date: string
  value: number
  label?: string
}

export interface CategoryData {
  category: string
  value: number
  percentage?: number
}

export interface MetricData {
  label: string
  value: number | string
  change?: number
  trend?: 'up' | 'down' | 'stable'
}

// Form Data Types
export interface AnomalyFormData {
  resolution_notes: string
}

export interface InsightFormData {
  insight_type: InsightType
  title: string
  description: string
  data: Record<string, any>
  priority: number
}
