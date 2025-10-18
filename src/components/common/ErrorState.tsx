import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ 
  message = 'Something went wrong. Please try again.', 
  onRetry,
  className 
}: ErrorStateProps) {
  return (
    <Card className={`flex flex-col items-center justify-center p-8 text-center ${className || ''}`}>
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">Error</h3>
      <p className="text-gray-600 mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </Card>
  )
}
