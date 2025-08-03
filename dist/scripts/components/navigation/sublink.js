import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible";
import { SheetClose } from "@/components/ui/sheet";
import Anchor from "@/components/navigation/anchor";
function isRoute(item) {
    return "title" in item && "href" in item;
}
export default function SubLink(props) {
    const path = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const isRTL = props.lang === 'he';
    useEffect(() => {
        if (props.href && path !== props.href && path.includes(props.href)) {
            setIsOpen(true);
        }
    }, [path, props.href]);
    const { title, href, items, noLink, level, isSheet, lang } = props;
    // פונקציה לטיפול בלחיצה על הלינק הראשי
    const handleMainLinkClick = (e) => {
        e.preventDefault();
        // ניווט ללינק
        router.push(href);
        // פתיחה/סגירה של סאבלינקים
        if (items && items.length > 0) {
            setIsOpen(!isOpen);
        }
    };
    const Comp = (_jsx(Anchor, { activeClassName: "text-fuchsia-500 text-sm font-bold", href: href, onClick: handleMainLinkClick, children: title }));
    const titleOrLink = !noLink ? (isSheet ? (_jsx(SheetClose, { asChild: true, children: Comp })) : (Comp)) : (_jsx("h2", { className: "font-medium text-primary sm:text-sm cursor-pointer", onClick: () => items && items.length > 0 && setIsOpen(!isOpen), children: title }));
    if (!items) {
        return (_jsx("div", { className: cn("flex flex-col text-sm hover:underline", isRTL && "text-right"), children: titleOrLink }));
    }
    return (_jsx("div", { className: "flex flex-col w-full gap-1", children: _jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [_jsxs("div", { className: cn("flex items-center gap-2 text-sm", isRTL ? "mr-0 flex-row-reverse" : ""), children: [titleOrLink, _jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(Button, { className: cn("h-6 w-6", isRTL ? "mr-auto ml-0" : "ml-auto", "rtl:transform-none"), variant: "link", size: "icon", children: [!isOpen ? (_jsx(LuChevronRight, { className: cn("h-[0.9rem] w-[0.9rem]", isRTL && "rotate-180") })) : (_jsx(LuChevronDown, { className: "h-[0.9rem] w-[0.9rem]" })), _jsx("span", { className: "sr-only", children: "Toggle" })] }) })] }), _jsx(CollapsibleContent, { className: "CollapsibleContent", children: _jsx("div", { className: cn("mt-2.5 flex flex-col gap-3 text-sm border-l text-slate-800 dark:text-slate-300/85", isRTL ? "items-end border-r border-l-0 pr-4" : "items-start pl-4", level > 0 && cn(isRTL ? "mr-1 pr-4" : "ml-1 pl-4")), children: items?.map((innerLink) => {
                            if (!isRoute(innerLink)) {
                                return null;
                            }
                            const modifiedItems = {
                                ...innerLink,
                                href: `${href}${innerLink.href}`,
                                level: level + 1,
                                isSheet,
                                lang
                            };
                            return _jsx(SubLink, { ...modifiedItems }, modifiedItems.href);
                        }) }) })] }) }));
}
