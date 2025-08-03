import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
export default async function LangLayout({ children, params, }) {
    const { lang } = await params;
    // הגדרת כיוון לפי השפה
    const direction = lang === 'he' ? 'rtl' : 'ltr';
    return (_jsxs("div", { dir: direction, className: `${direction === 'rtl' ? 'font-hebrew' : ''}`, children: [_jsx(Navbar, { lang: lang }), _jsx("main", { className: "px-5 sm:px-8 h-auto", children: children }), _jsx(Footer, { lang: lang })] }));
}
