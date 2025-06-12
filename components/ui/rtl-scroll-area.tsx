"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

interface RTLScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  isRTL?: boolean
}

const RTLScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  RTLScrollAreaProps
>(({ className, children, isRTL, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      orientation="vertical"
      className={cn(
        "flex h-full w-2.5 touch-none select-none transition-colors border-l border-l-transparent p-[1px]",
        isRTL && "!left-0 !right-auto !border-l-0 !border-r !border-r-transparent"
      )}
      style={isRTL ? { 
        position: 'absolute',
        left: '0',
        right: 'auto'
      } : undefined}
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))

RTLScrollArea.displayName = "RTLScrollArea"

export { RTLScrollArea }