import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { RotateCw } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Button Variants Definition using CVA
 * Design System Reference: 6.1 Buttons
 */
const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none touch-target',
    {
        variants: {
            variant: {
                default: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm',
                secondary:
                    'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300',
                outline:
                    'border-2 border-secondary-200 bg-background hover:bg-secondary-50 hover:text-secondary-900 text-secondary-700',
                ghost: 'hover:bg-secondary-100 hover:text-secondary-900 text-secondary-600',
                link: 'text-primary-500 underline-offset-4 hover:underline',
                destructive:
                    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
            },
            size: {
                default: 'h-12 px-5 py-2.5', // MD size (48px)
                sm: 'h-10 rounded-md px-3 text-base', // SM size (40px)
                lg: 'h-14 rounded-xl px-8 text-xl', // LG size (56px) - Senior Friendly
                xl: 'h-16 rounded-2xl px-10 text-2xl font-bold', // XL size (64px) - Very Large
                icon: 'h-12 w-12',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            fullWidth: false,
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <RotateCw className="mr-2 h-5 w-5 animate-spin" />
                        {children}
                    </>
                ) : (
                    children
                )}
            </Comp>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
