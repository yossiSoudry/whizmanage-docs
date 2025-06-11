"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import { getRoutes } from "@/lib/pageroutes";
import SubLink from "@/components/navigation/sublink";
// פונקציית עזר לחילוץ טקסט לפי שפה
function getLocalizedText(text, lang) {
    if (typeof text === 'string')
        return text;
    return text[lang];
}
export default function PageMenu({ isSheet = false, lang }) {
    const pathname = usePathname();
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
        setRoutes(getRoutes(lang));
    }, [lang]);
    if (!pathname.startsWith(`/${lang}/docs`))
        return null;
    return (_jsx("div", { className: "flex flex-col gap-3.5 mt-5 pb-6", children: routes.map((item, index) => {
            if ("spacer" in item) {
                return (_jsx("div", { className: "my-2 mr-3" }, `spacer-${index}`));
            }
            return (_jsxs("div", { className: "mb-2", children: [item.heading && (_jsx("h2", { className: "text-sm font-bold mb-2 rtl:text-right text-muted-foreground", children: getLocalizedText(item.heading, lang) })), _jsx(SubLink, { lang: lang, ...item,
                        title: getLocalizedText(item.title, lang), // חילוץ הטקסט הנכון
                        heading: item.heading ? getLocalizedText(item.heading, lang) : undefined, // חילוץ הטקסט הנכון
                        href: `/${lang}/docs${item.href}`,
                        level: 0,
                        isSheet })] }, getLocalizedText(item.title, lang) + index));
        }) }));
}
