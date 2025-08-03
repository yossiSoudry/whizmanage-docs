"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from "next-themes";
import { RxMoon, RxSun } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (_jsxs(Button, { variant: "outline", size: "icon", onClick: toggleTheme, className: cn("h-9 w-9"), children: [_jsx(RxSun, { className: "w-[1.1rem] h-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), _jsx(RxMoon, { className: "absolute w-[1.1rem] h-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }));
}
