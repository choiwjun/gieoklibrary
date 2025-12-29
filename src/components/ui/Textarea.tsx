import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    helperText?: string
    error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, helperText, error, id, ...props }, ref) => {
        const textareaId = id || React.useId()
        const isError = !!error

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-900"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    id={textareaId}
                    className={cn(
                        'flex min-h-[120px] w-full rounded-lg border border-secondary-300 bg-white px-4 py-3 text-lg ring-offset-background placeholder:text-secondary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
                        isError && 'border-red-500 focus-visible:ring-red-500',
                        className
                    )}
                    ref={ref}
                    aria-invalid={isError}
                    aria-describedby={
                        error ? `${textareaId}-error` : helperText ? `${textareaId}-description` : undefined
                    }
                    {...props}
                />
                {error ? (
                    <p id={`${textareaId}-error`} className="text-sm font-medium text-red-500">
                        {error}
                    </p>
                ) : helperText ? (
                    <p id={`${textareaId}-description`} className="text-sm text-secondary-500">
                        {helperText}
                    </p>
                ) : null}
            </div>
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }
