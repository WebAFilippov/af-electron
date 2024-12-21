// 'use client'
import { HelpCircle, X } from 'lucide-react'
import { FC, InputHTMLAttributes, ReactNode, useRef } from 'react'

import { cn } from '@shared/lib'

import { Label } from './label'

interface InputLabelWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  inputValue: string
  setInputValue: (value: string) => void
  loading?: boolean
  error?: string | null
  help?: ReactNode | string
}

export const InputLabelWithIcon: FC<InputLabelWithIconProps> = (
  { className, label = 'Label for input', inputValue, setInputValue, loading, error, help },
  props
) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClearInput = () => {
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="input-loader-icon" className="flex items-center gap-2 font-normal">
        {label} <HelpCircle size={16} strokeWidth={2} aria-hidden="true" />
      </Label>
      <div className="relative">
        <input
          id="input-loader-icon"
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pe-9 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          {...props}
        />
        {inputValue && (
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-primary/50 outline-offset-2 transition-colors hover:text-primary focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Clear input"
            onClick={handleClearInput}
          >
            <X size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}

export const InputField = ({ id, label, hint }) => {
  return (
    <FieldLayout
      label={
        <FieldLabel id={id} hint={hint}>
          {label}
        </FieldLabel>
      }
      input={<FieldInput id={id} />}
    />
  )
}

export const FieldLayout = ({ label, input }, ref) => {
  return (
    <div className="space-y-2">
      {label}
      {input}
    </div>
  )
}

export const FieldLabel = ({ children, id, hint }) => {
  return (
    <label htmlFor={id}>
      {children}
      {hint && <HelpCircle size={16} strokeWidth={2} aria-hidden="true" />}
    </label>
  )
}

export const FieldInput = ({ id }, props) => {
  return <input id={id} type="text" {...props} />
}

