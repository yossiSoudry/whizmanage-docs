"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export default function Anchor({ absolute, className = "", activeClassName = "", disabled, children, ...props }) {
    const path = usePathname();
    let isMatch = absolute
        ? props.href.toString().split("/")[1] == path.split("/")[1]
        : path === props.href;
    if (props.href.toString().includes("http"))
        isMatch = false;
    if (disabled)
        return _jsx("div", { className: cn(className, "cursor-not-allowed"), children: children });
    return (_jsx(Link, { className: cn(className, isMatch && activeClassName), ...props, children: children }));
}
