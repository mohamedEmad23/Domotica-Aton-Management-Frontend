import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UseFormRegister, FieldError } from 'react-hook-form'

interface BaseFormFieldProps {
  label: string
  name: string
  error?: FieldError
  required?: boolean
  className?: string
}

interface InputFormFieldProps extends BaseFormFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'datetime-local'
  placeholder?: string
  register: UseFormRegister<any>
}

interface TextareaFormFieldProps extends BaseFormFieldProps {
  placeholder?: string
  rows?: number
  register: UseFormRegister<any>
}

interface SelectFormFieldProps extends BaseFormFieldProps {
  options: Array<{ value: string; label: string }>
  placeholder?: string
  value?: string
  onChange: (value: string) => void
}

export function InputFormField({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  required,
  register,
  className,
}: InputFormFieldProps) {
  return (
    <div className={`space-y-2 ${className || ''}`}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  )
}

export function TextareaFormField({
  label,
  name,
  placeholder,
  rows = 4,
  error,
  required,
  register,
  className,
}: TextareaFormFieldProps) {
  return (
    <div className={`space-y-2 ${className || ''}`}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        {...register(name)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  )
}

export function SelectFormField({
  label,
  name,
  options,
  placeholder,
  value,
  onChange,
  error,
  required,
  className,
}: SelectFormFieldProps) {
  return (
    <div className={`space-y-2 ${className || ''}`}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={name}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  )
}
