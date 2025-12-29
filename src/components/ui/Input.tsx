import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva(
    'flex w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            size: {
                default: 'h-12 px-4', // MD (48px)
                sm: 'h-10 px-3 text-sm',
                lg: 'h-14 px-5 text-xl', // Senior Friendly (56px)
            },
            hasError: {
                true: 'border-red-500 focus-visible:ring-red-500',
            },
        },
        defaultVariants: {
            size: 'default',
            hasError: false,
        },
    }
)

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
    label?: string
    helperText?: string
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, size, hasError, label, helperText, error, id, ...props }, ref) => {
        const generatedId = React.useId()
        const inputId = id || generatedId
        const isError = hasError || !!error

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-900"
                    >
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    type={type}
                    className={cn(inputVariants({ size, hasError: isError, className }))}
                    ref={ref}
                    aria-invalid={isError}
                    aria-describedby={
                        error ? `${inputId}-error` : helperText ? `${inputId}-description` : undefined
                    }
                    {...props}
                />
                {error ? (
                    <p id={`${inputId}-error`} className="text-sm font-medium text-red-500">
                        {error}
                    </p>
                ) : helperText ? (
                    <p id={`${inputId}-description`} className="text-sm text-secondary-500">
                        {helperText}
                    </p>
                ) : null}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
