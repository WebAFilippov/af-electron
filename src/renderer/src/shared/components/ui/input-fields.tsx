import { HelpCircleIcon, X } from 'lucide-react'
import {
  ChangeEvent,
  FC,
  forwardRef,
  InputHTMLAttributes,
  PropsWithChildren,
  PropsWithRef,
  ReactNode,
  useState
} from 'react'

import { cn } from '@shared/lib'

import { Popover, PopoverContent, PopoverTrigger } from './popover'

type InputFieldProps = {
  id: string
  label: string
  hint?: ReactNode | string
  success?: boolean
  error?: Error | null
  value: string
} & InputHTMLAttributes<HTMLInputElement>

type FieldLayoutProps = {
  label: ReactNode
  input: ReactNode
}

type FieldLabelProps = {
  id: string
  hint: ReactNode
}

type FieldInputProps = {
  success?: boolean
  error?: Error | null
  value: string
} & InputHTMLAttributes<HTMLInputElement>

export const InputField: FC<PropsWithRef<InputFieldProps>> = forwardRef<
  HTMLInputElement,
  InputFieldProps
>(({ id, label, hint, success, error, value, ...rest }, ref) => {
  return (
    <FieldLayout
      label={
        <FieldLabel id={id} hint={hint}>
          {label}
        </FieldLabel>
      }
      input={
        <FieldInput id={id} ref={ref} success={success} error={error} value={value} {...rest} />
      }
    />
  )
})

const FieldLayout: FC<FieldLayoutProps> = ({ label, input }) => {
  return (
    <div className="flex flex-col gap-2">
      {label}
      {input}
    </div>
  )
}

const FieldLabel: FC<PropsWithChildren<FieldLabelProps>> = ({ children, id, hint }) => {
  return (
    <label
      htmlFor={id}
      className="flex h-fit w-fit items-center justify-start gap-1 text-sm font-medium leading-none text-primary/80 transition-colors user-select-none hover:text-primary"
    >
      {children}
      {hint && <FieldHint>{hint}</FieldHint>}
    </label>
  )
}

const FieldHint: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <HelpCircleIcon
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className="text-primary/50 transition-colors hover:text-primary"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="max-w-xs rounded-md bg-white p-2 text-sm shadow-md"
        side="right"
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
  ({ className, success, error, value, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value)

    const { onChange } = props

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      onChange?.(e)
    }

    const handleRemoveValue = () => {
      const event = {
        target: { value: '' }
      } as ChangeEvent<HTMLInputElement>

      setInputValue('')
      onChange?.(event)
    }

    return (
      <div className="relative w-96">
        <input
          type="text"
          ref={ref}
          value={inputValue}
          {...props}
          className={cn(
            'relative flex h-9 w-96 rounded-full bg-input px-3 text-secondary-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.2)] outline-none transition-all duration-300 placeholder:text-secondary-foreground/50 hover:shadow-[0_0_0_2px_rgba(0,0,0,1)] focus:bg-secondary focus:text-secondary-foreground focus-visible:shadow-[0_0_0_2px] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-[0_0_0_1px_rgba(0,0,0,0.2)] md:text-sm',
            value && 'pr-10',
            error &&
              'shadow-[0_0_4px_1px] shadow-destructive hover:shadow-[0_0_4px_1px] hover:shadow-destructive focus-visible:shadow-[0_0_4px_1px] focus-visible:shadow-destructive',
            success &&
              'shadow-success hover:shadow-success focus-visible:shadow-success shadow-[0_0_4px_1px] hover:shadow-[0_0_4px_1px] focus-visible:shadow-[0_0_4px_1px]',

            className
          )}
          onChange={handleOnChange}
        />

        <div className="absolute inset-y-0 end-2 flex h-full items-center justify-center gap-1">
          {value && (
            <span
              className="cursor-pointer rounded-full bg-secondary-foreground/25 p-1 text-accent transition-colors hover:bg-secondary-foreground/50"
              onClick={handleRemoveValue}
            >
              <X size={16} strokeWidth={3} />
            </span>
          )}
        </div>
      </div>
    )
  }
)

FieldInput.displayName = 'FieldInput'
InputField.displayName = 'InputField'
