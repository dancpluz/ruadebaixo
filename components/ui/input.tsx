import * as React from "react"

import { cn } from "@/lib/utils"
import MaskedInput from "react-text-mask"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, children, ...props }, ref) => {
    const InputName = mask ? MaskedInput : "input"
    return (
      <div className='flex gap-2 grow relative'>
        <InputName
          type={type}
          mask={mask || []}
          guide={mask ? false : undefined}
          className={cn(
            "flex h-10 w-full border border-foreground bg-background px-3 py-2 text-sm ring-offset-foreground placeholder:uppercase file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {children}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
