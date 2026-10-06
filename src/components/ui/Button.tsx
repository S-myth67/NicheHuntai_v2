import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-black text-white hover:bg-zinc-800 font-semibold shadow-sm',
        outline:
          'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400',
        secondary:
          'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200',
        ghost: 'text-zinc-700 hover:bg-zinc-100 hover:text-black',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({ children, className, variant, size, ...rest }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...rest}>
      {children}
    </button>
  )
}
