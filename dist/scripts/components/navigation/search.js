"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { LuCommand, LuFileText, LuSearch } from "react-icons/lu";
import { getRoutes } from "@/lib/pageroutes";
import { advanceSearch, cn, debounce, highlight } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Anchor from "./anchor";
const placeholderText = {
    he: "חיפוש במרכז המידע...",
    en: "Search documents...",
};
const messages = {
    he: {
        minChars: "אנא הכנס לפחות 3 תווים",
        searching: "מחפש...",
        noResults: "לא נמצאו תוצאות עבור",
    },
    en: {
        minChars: "Please enter at least 3 characters",
        searching: "Searching...",
        noResults: "No results found for",
    },
};
export default function Search({ lang }) {
    const [searchedInput, setSearchedInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isRTL = lang === "he";
    const debouncedSearch = useMemo(() => debounce((input) => {
        setIsLoading(true);
        const results = advanceSearch(input.trim());
        setFilteredResults(results);
        setIsLoading(false);
    }, 200), []);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault();
                setIsOpen(true);
            }
            if (isOpen && event.key === "Enter" && filteredResults.length > 2) {
                const selected = filteredResults[0];
                if ("href" in selected) {
                    window.location.href = `/${lang}/docs${selected.href}`;
                    setIsOpen(false);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, filteredResults, lang]);
    useEffect(() => {
        if (searchedInput.length >= 3) {
            debouncedSearch(searchedInput);
        }
        else {
            setFilteredResults([]);
        }
    }, [searchedInput, debouncedSearch]);
    function renderDocuments(_documents, parentHref = `/${lang}/docs`, depth = 0 // הוספנו מונה עומק
    ) {
        // מניעת רקורסיה עמוקה מדי
        if (depth > 10)
            return []; // הגבלת עומק הרקורסיה
        const localizedDocs = depth === 0 ? getRoutes(lang) : _documents; // שימוש ב-getRoutes רק בקריאה הראשונה
        if (!localizedDocs || !Array.isArray(localizedDocs)) {
            return [];
        }
        return localizedDocs.flatMap((doc) => {
            if ("spacer" in doc) {
                return [];
            }
            if (!("href" in doc) || !doc.href || !("title" in doc) || !doc.title) {
                return [];
            }
            const href = `${parentHref}${doc.href}`;
            return [
                _jsx(DialogClose, { asChild: true, children: _jsx(Anchor, { className: cn("w-full px-3 flex items-center gap-2.5 text-[15px] rounded-sm hover:bg-slate-100 dark:hover:bg-slate-900", isRTL && "flex-row-reverse"), href: href, children: _jsxs("div", { className: cn("flex items-center h-full w-fit gap-1.5 py-3 whitespace-nowrap", isRTL && "flex-row-reverse"), children: [_jsx(LuFileText, { className: "h-[1.1rem] w-[1.1rem]" }), typeof doc.title === "string" ? doc.title : doc.title[lang]] }) }) }, href),
                ...(doc.items ? renderDocuments(doc.items, `${href}`, depth + 1) : []),
            ];
        });
    }
    return (_jsx("div", { children: _jsxs(Dialog, { open: isOpen, onOpenChange: (open) => {
                setIsOpen(open);
                if (!open) {
                    setTimeout(() => setSearchedInput(""), 200);
                }
            }, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs("div", { className: "relative flex-1 xl:w-[600px] cursor-pointer shadow-sm hover:scale-[1.02] hover:shadow-md transition-all", children: [_jsx(LuSearch, { className: cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400", isRTL ? "right-3" : "left-3") }), _jsx(Input, { className: cn("h-9 w-full rounded-md border bg-muted shadow-sm md:w-full ring-0 flex-1 bg-white dark:bg-slate-900 text-sm placeholder:text-muted-foreground", isRTL ? "pr-10 pl-2" : "pl-10 pr-2", isRTL && "text-right"), placeholder: placeholderText[lang], type: "search", dir: isRTL ? "rtl" : "ltr" }), _jsxs("div", { className: cn("absolute top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-sm bg-zinc-200 p-1 text-xs font-mono font-medium dark:bg-slate-700 sm:flex", isRTL ? "left-2" : "right-2"), children: [_jsx(LuCommand, { className: "w-3 h-3" }), _jsx("span", { children: "k" })] })] }) }), _jsxs(DialogContent, { className: "max-w-80 md:max-w-[650px] p-0 top-[45%] sm:top-[38%] rounded-lg", children: [_jsx(DialogTitle, { className: "sr-only", children: "Search" }), _jsx(DialogDescription, { className: "sr-only", children: lang === "he" ? "חיפוש במסמכים" : "Search documents" }), _jsx(DialogHeader, { children: _jsx("input", { value: searchedInput, onChange: (e) => setSearchedInput(e.target.value), placeholder: placeholderText[lang], autoFocus: true, className: cn("h-14 px-4 bg-transparent border-b text-[15px] outline-none w-full", isRTL && "text-right"), dir: isRTL ? "rtl" : "ltr" }) }), searchedInput.length > 0 && searchedInput.length < 3 && (_jsx("p", { className: cn("mx-auto mt-2 text-sm text-warning", isRTL && "text-right px-4"), children: messages[lang].minChars })), isLoading ? (_jsx("p", { className: cn("mx-auto mt-2 text-sm text-muted-foreground", isRTL && "text-right px-4"), children: messages[lang].searching })) : (filteredResults.length === 0 &&
                            searchedInput.length >= 3 && (_jsxs("p", { className: cn("mx-auto mt-2 text-sm text-muted-foreground", isRTL && "text-right px-4"), children: [messages[lang].noResults, " ", _jsx("span", { className: "text-primary", children: `"${searchedInput}"` })] }))), _jsx(ScrollArea, { className: "max-h-[350px] w-full", children: _jsx("div", { className: cn("flex flex-col items-start overflow-y-auto px-1 pt-1 pb-4 sm:px-3 w-full", isRTL && "items-end"), children: searchedInput
                                    ? filteredResults.map((item) => {
                                        if ("href" in item) {
                                            return (_jsx(DialogClose, { asChild: true, children: _jsxs(Anchor, { className: cn("p-3 flex flex-col max-w-[620px] gap-0.5 text-[15px] rounded-sm hover:bg-slate-100 dark:hover:bg-slate-900 w-full", isRTL && "items-end text-right"), href: `/${lang}/docs${item.href}`, children: [_jsxs("div", { className: cn("flex items-center h-full gap-x-2", isRTL && "flex-row-reverse"), children: [_jsx(LuFileText, { className: "h-[1.1rem] w-[1.1rem]" }), _jsx("span", { className: "truncate", children: item.title })] }), "snippet" in item && item.snippet && (_jsx("p", { className: cn("truncate text-xs text-slate-500 dark:text-slate-400", isRTL && "text-right"), dangerouslySetInnerHTML: {
                                                                __html: highlight(item.snippet, searchedInput),
                                                            } }))] }) }, item.href));
                                        }
                                        return null;
                                    })
                                    : renderDocuments([], `/${lang}/docs`, 0) }) })] })] }) }));
}
