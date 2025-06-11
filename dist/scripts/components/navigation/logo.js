import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { Settings } from "@/lib/meta";
export function Logo({ lang }) {
    return (_jsxs(Link, { href: `/${lang}`, className: "font-normal flex rtl:flex-row-reverse gap-0.5 items-center text-sm mr-4  text-black md:px-2  relative z-20 cursor-pointer", children: [_jsx(Image, { src: Settings.siteicon, alt: `${Settings.title} main logo`, width: 34, height: 34, loading: "lazy", decoding: "async" }), _jsxs("div", { className: "notranslate mt-2", children: [_jsx("span", { className: "dark:text-white text-xl", children: "hiz" }), _jsxs("span", { className: "dark:text-white font-bold text-xl", children: [_jsx("span", { children: "Man" }), _jsx("span", { children: "age" })] })] })] }));
}
