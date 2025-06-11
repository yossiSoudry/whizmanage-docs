import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LuAlignLeft } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger, } from "@/components/ui/sheet";
import { Logo } from "@/components/navigation/logo";
import { NavMenu } from "@/components/navigation/navbar";
import PageMenu from "@/components/navigation/pagemenu";
export function Sidebar({ lang }) {
    return (_jsx("aside", { className: "md:flex hidden flex-[1] !w-48 !min-w-48 !max-w-48 sticky top-16 flex-col h-[94.5vh] overflow-y-auto", children: _jsx(ScrollArea, { className: "py-4", children: _jsx(PageMenu, { lang: lang }) }) }));
}
export function SheetLeft({ lang }) {
    return (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden flex", children: _jsx(LuAlignLeft, { className: "!size-6" }) }) }), _jsxs(SheetContent, { className: "flex flex-col gap-4 px-0", side: lang === "he" ? "right" : "left", dir: lang === "he" ? "rtl" : "ltr", children: [_jsx(DialogTitle, { className: "sr-only", children: "Menu" }), _jsx(SheetHeader, { children: _jsx(SheetClose, { className: "px-5", asChild: true, children: _jsx(Logo, { lang: lang }) }) }), _jsxs(ScrollArea, { className: "flex flex-col gap-4", children: [_jsx("div", { className: "flex flex-col gap-2.5 mt-3 mx-0 px-5", children: _jsx(NavMenu, { isSheet: true, lang: lang }) }), _jsx("div", { className: "mx-0 px-5", children: _jsx(PageMenu, { isSheet: true, lang: lang }) })] })] })] }));
}
