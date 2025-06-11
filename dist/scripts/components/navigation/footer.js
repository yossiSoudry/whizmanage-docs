import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { Company } from "@/lib/meta";
import { Logo } from "./logo";
export function Footer({ lang }) {
    return (_jsx("footer", { className: "w-full h-16 border-t", children: _jsxs("div", { className: "flex ltr:flex-row-reverse ltr:md:flex-row rtl:md:flex-row-reverse flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-0 w-full h-full px-2 sm:py-0 py-3 sm:px-4 lg:px-8 text-sm text-muted-foreground", children: [_jsx("div", { className: "hidden md:block w-20" }), _jsxs("p", { className: "text-center", children: ["\u00A9 ", new Date().getFullYear(), " ", _jsx(Link, { className: "font-semibold", href: Company.link, children: Company.name })] }), Company.branding !== false && (_jsxs("div", { className: "text-center", children: [_jsx(Link, { className: "font-semibold sm:hidden", href: "https://whizmanage.com/", target: "_blank", rel: "noopener noreferrer", children: _jsx(Image, { src: "/icon.svg", alt: "WhizManage Logo", width: 30, height: 30 }) }), _jsx("div", { className: "hidden sm:block", children: _jsx(Logo, { lang: lang }) })] }))] }) }));
}
