import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as analyticsService from '@/services/analytics'
import type { Anomaly, Insight } from '@/types/analytics'

// ============================================================================
// ANOMALIES
// ============================================================================

export function useAnomalies(params?: {
  page?: number
  page_size?: number
  anomaly_type?: string
  severity?: string
  status?: string
}) {
  return useQuery({
    queryKey: ['anomalies', params],
    queryFn: () => analyticsService.getAnomalies(params),
    refetchInterval: 2 * 60 * 1000, // Auto-refresh every 2 minutes
  })
}

export function useAnomaly(id: string) {
  return useQuery({
    queryKey: ['anomaly', id],
    queryFn: () => analyticsService.getAnomaly(id),
    enabled: !!id,
  })
}

export function useCreateAnomaly() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: analyticsService.createAnomaly,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anomalies'] })
      toast.success('Anomaly created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create anomaly')
    },
  })
}

export function useUpdateAnomaly() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Anomaly> }) =>
      analyticsService.updateAnomaly(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['anomalies'] })
      queryClient.invalidateQueries({ queryKey: ['anomaly', variables.id] })
      toast.success('Anomaly updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update anomaly')
    },
  })
}

export function useDeleteAnomaly() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: analyticsService.deleteAnomaly,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anomalies'] })
      toast.success('Anomaly deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete anomaly')
    },
  })
}

export function useAcknowledgeAnomaly() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: analyticsService.acknowledgeAnomaly,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['anomalies'] })
      queryClient.invalidateQueries({ queryKey: ['anomaly', id] })
      toast.success('Anomaly acknowledged successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to acknowledge anomaly')
    },
  })
}

export function useResolveAnomaly() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, resolution_notes }: { id: string; resolution_notes: string }) =>
      analyticsService.resolveAnomaly(id, resolution_notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['anomalies'] })
      queryClient.invalidateQueries({ queryKey: ['anomaly', variables.id] })
      toast.success('Anomaly resolved successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to resolve anomaly')
    },
  })
}

// ============================================================================
// INSIGHTS
// ============================================================================

export function useInsights(params?: {
  page?: number
  page_size?: number
  insight_type?: string
  is_dismissed?: boolean
}) {
  return useQuery({
    queryKey: ['insights', params],
    queryFn: () => analyticsService.getInsights(params),
  })
}

export function useInsight(id: string) {
  return useQuery({
    queryKey: ['insight', id],
    queryFn: () => analyticsService.getInsight(id),
    enabled: !!id,
  })
}

export function useCreateInsight() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: analyticsService.createInsight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insights'] })
      toast.success('Insight created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create insight')
    },
  })
}

export function useDismissInsight() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: analyticsService.dismissInsight,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['insights'] })
      queryClient.invalidateQueries({ queryKey: ['insight', id] })
      toast.success('Insight dismissed successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to dismiss insight')
    },
  })
}

export function useGenerateInsights() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: analyticsService.generateInsights,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['insights'] })
      toast.success(`Generated ${data.count} new insights`)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to generate insights')
    },
  })
}

// ============================================================================
// CACHE
// ============================================================================

export function useCache(cache_key: string) {
  return useQuery({
    queryKey: ['cache', cache_key],
    queryFn: () => analyticsService.getCache(cache_key),
    enabled: !!cache_key,
  })
}

export function useSetCache() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ cache_key, cache_data, expires_in_seconds }: { 
      cache_key: string
      cache_data: Record<string, any>
      expires_in_seconds?: number
    }) => analyticsService.setCache(cache_key, cache_data, expires_in_seconds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cache', variables.cache_key] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to set cache')
    },
  })
}

export function useClearCache() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: analyticsService.clearCache,
    onSuccess: (_, cache_key) => {
      queryClient.invalidateQueries({ queryKey: ['cache', cache_key] })
      toast.success('Cache cleared successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to clear cache')
    },
  })
}
