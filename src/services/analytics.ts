import api from "./api"
import type { PaginatedResponse } from "@/types/api"
import type { Anomaly, Insight, AnalyticsCache } from "@/types/analytics"

// ============================================================================
// ANOMALIES
// ============================================================================

export const getAnomalies = async (params?: {
  page?: number
  page_size?: number
  anomaly_type?: string
  severity?: string
  status?: string
}) => {
  const { data } = await api.get<PaginatedResponse<Anomaly>>("/analytics/api/anomalies/", { params })
  return data
}

export const getAnomaly = async (id: string) => {
  const { data } = await api.get<Anomaly>(`/analytics/api/anomalies/${id}/`)
  return data
}

export const createAnomaly = async (anomaly: Partial<Anomaly>) => {
  const { data } = await api.post<Anomaly>("/analytics/api/anomalies/", anomaly)
  return data
}

export const updateAnomaly = async (id: string, anomaly: Partial<Anomaly>) => {
  const { data } = await api.put<Anomaly>(`/analytics/api/anomalies/${id}/`, anomaly)
  return data
}

export const deleteAnomaly = async (id: string) => {
  await api.delete(`/analytics/api/anomalies/${id}/`)
}

export const acknowledgeAnomaly = async (id: string) => {
  const { data } = await api.post<Anomaly>(`/analytics/api/anomalies/${id}/acknowledge/`)
  return data
}

export const resolveAnomaly = async (id: string, resolution_notes: string) => {
  const { data } = await api.post<Anomaly>(`/analytics/api/anomalies/${id}/resolve/`, { resolution_notes })
  return data
}

// ============================================================================
// INSIGHTS
// ============================================================================

export const getInsights = async (params?: {
  page?: number
  page_size?: number
  insight_type?: string
  is_dismissed?: boolean
}) => {
  const { data } = await api.get<PaginatedResponse<Insight>>("/analytics/api/insights/", { params })
  return data
}

export const getInsight = async (id: string) => {
  const { data } = await api.get<Insight>(`/analytics/api/insights/${id}/`)
  return data
}

export const createInsight = async (insight: Partial<Insight>) => {
  const { data } = await api.post<Insight>("/analytics/api/insights/", insight)
  return data
}

export const dismissInsight = async (id: string) => {
  const { data } = await api.post<Insight>(`/analytics/api/insights/${id}/dismiss/`)
  return data
}

export const generateInsights = async () => {
  const { data } = await api.post<{ message: string; count: number }>("/analytics/api/insights/generate/")
  return data
}

// ============================================================================
// CACHE
// ============================================================================

export const getCache = async (cache_key: string) => {
  const { data } = await api.get<AnalyticsCache>(`/analytics/api/cache/${cache_key}/`)
  return data
}

export const setCache = async (cache_key: string, cache_data: Record<string, any>, expires_in_seconds?: number) => {
  const { data } = await api.post<AnalyticsCache>("/analytics/api/cache/", {
    cache_key,
    cache_data,
    expires_in_seconds,
  })
  return data
}

export const clearCache = async (cache_key: string) => {
  await api.delete(`/analytics/api/cache/${cache_key}/`)
}
