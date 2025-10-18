import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
}

const statusColors: Record<string, string> = {
  // Common statuses
  ACTIVE: 'bg-green-100 text-green-800 hover:bg-green-100',
  INACTIVE: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  PENDING: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  COMPLETED: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  CANCELLED: 'bg-red-100 text-red-800 hover:bg-red-100',
  
  // RFQ statuses
  DRAFT: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  SUBMITTED: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  QUOTED: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  WON: 'bg-green-100 text-green-800 hover:bg-green-100',
  LOST: 'bg-red-100 text-red-800 hover:bg-red-100',
  
  // Project/Task statuses
  PLANNING: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  ON_HOLD: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  REVIEW: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  DONE: 'bg-green-100 text-green-800 hover:bg-green-100',
  BLOCKED: 'bg-red-100 text-red-800 hover:bg-red-100',
  TODO: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  
  // Priority levels
  LOW: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  MEDIUM: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  HIGH: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  URGENT: 'bg-red-100 text-red-800 hover:bg-red-100',
  CRITICAL: 'bg-red-100 text-red-800 hover:bg-red-100',
  
  // PO/Shipment statuses
  APPROVED: 'bg-green-100 text-green-800 hover:bg-green-100',
  ORDERED: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  RECEIVED: 'bg-green-100 text-green-800 hover:bg-green-100',
  IN_TRANSIT: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  CUSTOMS: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  DELIVERED: 'bg-green-100 text-green-800 hover:bg-green-100',
  
  // Work Order statuses
  SCHEDULED: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  
  // Quality statuses
  PASS: 'bg-green-100 text-green-800 hover:bg-green-100',
  FAIL: 'bg-red-100 text-red-800 hover:bg-red-100',
  
  // Anomaly statuses
  DETECTED: 'bg-red-100 text-red-800 hover:bg-red-100',
  ACKNOWLEDGED: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  RESOLVED: 'bg-green-100 text-green-800 hover:bg-green-100',
  IGNORED: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  
  // Quote statuses
  SENT: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  ACCEPTED: 'bg-green-100 text-green-800 hover:bg-green-100',
  REJECTED: 'bg-red-100 text-red-800 hover:bg-red-100',
  EXPIRED: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  
  // Material Request statuses
  DISPATCHED: 'bg-green-100 text-green-800 hover:bg-green-100',
}

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  
  return (
    <Badge 
      variant={variant} 
      className={cn(colorClass, className)}
    >
      {status.replace(/_/g, ' ')}
    </Badge>
  )
}
