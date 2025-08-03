// components/language-switcher.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const switchLanguage = (locale) => {
        const segments = pathname.split("/");
        segments[1] = locale;
        router.push(segments.join("/"));
    };
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", className: "max-md:px-2 gap-2", children: [_jsx("span", { className: "hidden md:block", children: pathname.split('/')[1] === 'he' ? 'עברית' : 'English' }), _jsx(Globe, { className: "size-5" })] }) }), _jsxs(DropdownMenuContent, { align: "center", children: [_jsx(DropdownMenuItem, { onClick: () => switchLanguage("en"), children: "English" }), _jsx(DropdownMenuItem, { onClick: () => switchLanguage("he"), children: "\u05E2\u05D1\u05E8\u05D9\u05EA" })] })] }));
}
