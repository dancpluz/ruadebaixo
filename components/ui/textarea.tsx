import * as React from "react"

import { cn } from "@/lib/utils"
import { FloatingLabel } from '@/components/ui/floating-label-input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className='relative'>
        <textarea
          className={cn(
            "flex min-h-[80px] peer w-full border border-foreground bg-background px-3 py-2 text-sm ring-offset-foreground placeholder:uppercase placeholder:text-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <FloatingLabel>
          {label}
        </FloatingLabel>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
