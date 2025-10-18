import { z } from 'zod'

// Anomaly Resolution Schema
export const anomalyResolutionSchema = z.object({
  resolution_notes: z.string().min(1, 'Resolution notes are required').min(10, 'Please provide detailed resolution notes'),
})

export type AnomalyResolutionFormData = z.infer<typeof anomalyResolutionSchema>

// Insight Schema
export const insightSchema = z.object({
  insight_type: z.enum(['TREND', 'PREDICTION', 'RECOMMENDATION', 'ALERT']),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  data: z.record(z.any()),
  priority: z.number().int().min(1).max(10),
})

export type InsightFormData = z.infer<typeof insightSchema>
