import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `
  inline-flex items-center justify-center
  whitespace-nowrap rounded-xl
  text-sm font-semibold
  transition-all duration-300
  outline-none
  disabled:pointer-events-none
  disabled:opacity-50
  active:scale-[0.98]
  focus-visible:ring-2
  focus-visible:ring-offset-2
  shadow-sm
  [&_svg]:pointer-events-none
  [&_svg]:size-4
  `,
  {
    variants: {
      variant: {
        default:
          `
          bg-[#2874f0]
          text-white
          hover:bg-[#1f67df]
          hover:shadow-sm
          hover:shadow-blue-500/20
          dark:bg-[#2874f0]
          dark:text-white
          dark:hover:bg-[#1f67df]
          `,

        primary:
          `
          bg-blue-600 text-white
          hover:bg-blue-700
          hover:shadow-blue-500/30
          hover:shadow-lg
          `,

        success:
          `
          bg-green-500 text-white
          hover:bg-green-600
          hover:shadow-green-500/30
          hover:shadow-lg
          `,

        destructive:
          `
          bg-red-500 text-white
          hover:bg-red-600
          hover:shadow-red-500/30
          hover:shadow-lg
          `,

        outline:
          `
          border border-zinc-300
          bg-white/10
          backdrop-blur-md
          hover:bg-zinc-100
          dark:border-zinc-700
          dark:bg-zinc-900/50
          dark:hover:bg-zinc-800
          `,

        ghost:
          `
          hover:bg-zinc-100
          dark:hover:bg-zinc-800
          `,

        link:
          `
          text-blue-600
          underline-offset-4
          hover:underline
          dark:text-blue-400
          `,
      },

      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }