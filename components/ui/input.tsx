import * as React from "react"

import { cn } from "@/lib/utils"
import MaskedInput from "react-text-mask"

function Input({ className, type, mask, ...props }: React.ComponentProps<"input"> & { mask?: (string | RegExp)[] }) {
  const InputName = mask ? MaskedInput : "input"
  return (
    <InputName
      type={type}
      mask={mask || []}
      guide={mask ? false : undefined}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-foreground/50 selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
