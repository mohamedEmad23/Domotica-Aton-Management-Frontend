import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    icon?: LucideIcon
  }
  children?: ReactNode
}

export function PageHeader({ title, description, action, children }: PageHeaderProps) {
  const ActionIcon = action?.icon

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        {children}
        {action && (
          <Button onClick={action.onClick}>
            {ActionIcon && <ActionIcon className="h-4 w-4 mr-2" />}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}
