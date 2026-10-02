import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu(props) {
  return <DropdownMenuPrimitive.Root {...props} />
}

function DropdownMenuTrigger(props) {
  return <DropdownMenuPrimitive.Trigger {...props} />
}

function DropdownMenuGroup(props) {
  return <DropdownMenuPrimitive.Group {...props} />
}

function DropdownMenuPortal(props) {
  return <DropdownMenuPrimitive.Portal {...props} />
}

function DropdownMenuSub(props) {
  return <DropdownMenuPrimitive.Sub {...props} />
}

function DropdownMenuRadioGroup(props) {
  return <DropdownMenuPrimitive.RadioGroup {...props} />
}

function DropdownMenuContent({
  className,
  sideOffset = 8,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          `
          z-50 min-w-[220px]
          overflow-hidden rounded-2xl
          border border-white/10
          bg-white/80 dark:bg-zinc-900/80
          backdrop-blur-xl
          p-2
          text-zinc-900 dark:text-zinc-100
          shadow-2xl
          animate-in fade-in zoom-in-95
          duration-200
          `,
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        `
        relative flex items-center
        gap-2 rounded-xl
        px-3 py-2
        text-sm font-medium
        cursor-pointer
        outline-none
        transition-all duration-200
        select-none

        hover:bg-zinc-100
        hover:dark:bg-zinc-800

        focus:bg-zinc-100
        focus:dark:bg-zinc-800

        data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50

        [&_svg]:size-4
        [&_svg]:shrink-0
        `,
        inset && "pl-8",
        variant === "destructive" &&
          `
          text-red-500
          hover:bg-red-500/10
          focus:bg-red-500/10
          `,
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        `
        relative flex items-center
        rounded-xl px-3 py-2
        pl-8 text-sm
        outline-none
        cursor-pointer
        transition-all duration-200

        hover:bg-zinc-100
        hover:dark:bg-zinc-800

        focus:bg-zinc-100
        focus:dark:bg-zinc-800
        `,
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        `
        relative flex items-center
        rounded-xl px-3 py-2
        pl-8 text-sm
        outline-none
        cursor-pointer
        transition-all duration-200

        hover:bg-zinc-100
        hover:dark:bg-zinc-800

        focus:bg-zinc-100
        focus:dark:bg-zinc-800
        `,
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        `
        px-3 py-2
        text-xs font-semibold
        uppercase tracking-wider
        text-zinc-500
        `,
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn(
        "my-2 h-px bg-zinc-200 dark:bg-zinc-800",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        `
        ml-auto text-xs
        tracking-widest
        text-zinc-400
        `,
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        `
        flex items-center
        rounded-xl px-3 py-2
        text-sm
        outline-none
        cursor-pointer
        transition-all duration-200

        hover:bg-zinc-100
        hover:dark:bg-zinc-800

        focus:bg-zinc-100
        focus:dark:bg-zinc-800
        `,
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}

      <ChevronRight className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        `
        z-50 min-w-[200px]
        overflow-hidden rounded-2xl
        border border-white/10
        bg-white/80 dark:bg-zinc-900/80
        backdrop-blur-xl
        p-2
        shadow-2xl
        animate-in fade-in zoom-in-95
        duration-200
        `,
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
}