"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
const RTLScrollArea = React.forwardRef(({ className, children, isRTL, ...props }, ref) => (_jsxs(ScrollAreaPrimitive.Root, { ref: ref, className: cn("relative overflow-hidden", className), ...props, children: [_jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children: children }), _jsx(ScrollAreaPrimitive.Scrollbar, { orientation: "vertical", className: cn("flex h-full w-2.5 touch-none select-none transition-colors border-l border-l-transparent p-[1px]", isRTL && "!left-0 !right-auto !border-l-0 !border-r !border-r-transparent"), style: isRTL ? {
                position: 'absolute',
                left: '0',
                right: 'auto'
            } : undefined, children: _jsx(ScrollAreaPrimitive.Thumb, { className: "relative flex-1 rounded-full bg-border" }) }), _jsx(ScrollAreaPrimitive.Corner, {})] })));
RTLScrollArea.displayName = "RTLScrollArea";
export { RTLScrollArea };
