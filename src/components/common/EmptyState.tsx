import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <Card className={`flex flex-col items-center justify-center p-12 text-center ${className || ''}`}>
      {Icon && <Icon className="h-16 w-16 text-gray-400 mb-4" />}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Card>
  )
}
