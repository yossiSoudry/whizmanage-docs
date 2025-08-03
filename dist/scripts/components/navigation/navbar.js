import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigations } from "@/settings/navigation";
import { LuArrowUpRight } from "react-icons/lu";
import { SheetClose } from "@/components/ui/sheet";
import Anchor from "@/components/navigation/anchor";
import { Logo } from "@/components/navigation/logo";
import Search from "@/components/navigation/search";
import { SheetLeft } from "@/components/navigation/sidebar";
import { ModeToggle } from "@/components/navigation/theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
export function Navbar({ lang }) {
    return (_jsx("nav", { className: "sticky top-0 z-50 w-full h-16 border-b backdrop-filter backdrop-blur-xl bg-opacity-5 md:px-4 px-2", children: _jsxs("div", { className: "mx-auto flex h-full items-center justify-between gap-2 p-1 sm:p-3 md:gap-2", children: [_jsxs("div", { className: "flex items-center md:gap-5", children: [_jsx(SheetLeft, { lang: lang }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("div", { className: "hidden md:flex", children: _jsx(Logo, { lang: lang }) }), _jsx("div", { className: "hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground", children: _jsx(NavMenu, { lang: lang }) })] })] }), _jsx(Search, { lang: lang }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "hidden md:block w-40" }), _jsxs("div", { className: "flex sm:ml-0 gap-2", children: [_jsx(LanguageSwitcher, {}), _jsx(ModeToggle, {})] })] })] }) }));
}
// הניווט העליון של האפליקציה
export function NavMenu({ isSheet = false, lang }) {
    return (_jsx(_Fragment, { children: Navigations.map((item) => {
            // עדכון הניתוב להכיל את השפה אם זה לא קישור חיצוני
            const href = item.external ? item.href : `/${lang}${item.href}`;
            const Comp = (_jsxs(Anchor, { activeClassName: "font-bold text-primary", absolute: true, className: "flex items-center gap-1 text-sm rtl:flex-row-reverse hover:text-primary transition-colors duration-200", href: href, target: item.external ? "_blank" : undefined, rel: item.external ? "noopener noreferrer" : undefined, children: [item.title[lang], " ", item.external && (_jsx(LuArrowUpRight, { className: "w-3 h-3 align-super rtl:-rotate-90", strokeWidth: 3 }))] }, item.title + href));
            return isSheet ? (_jsx(SheetClose, { asChild: true, children: Comp }, item.title + href)) : (Comp);
        }) }));
}
