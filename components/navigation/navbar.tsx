import { Navigations } from "@/settings/navigation"
import { LuArrowUpRight } from "react-icons/lu"

import { SheetClose } from "@/components/ui/sheet"
import Anchor from "@/components/navigation/anchor"
import { Logo } from "@/components/navigation/logo"
import Search from "@/components/navigation/search"
import { SheetLeft } from "@/components/navigation/sidebar"
import { ModeToggle } from "@/components/navigation/theme-toggle"
import { SupportedLanguage } from "@/app/[lang]/layout"

import { LanguageSwitcher } from "./language-switcher"

type NavProps = {
  lang: SupportedLanguage
}

export function Navbar({ lang }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 w-full h-16 border-b backdrop-filter backdrop-blur-xl bg-opacity-5 md:px-4 px-2">
      <div className="mx-auto flex h-full items-center justify-between gap-2 p-1 sm:p-3 md:gap-2">
        <div className="flex items-center md:gap-5">
          <SheetLeft lang={lang} />
          <div className="flex items-center gap-6">
            <div className="hidden md:flex">
              <Logo lang={lang} />
            </div>
            <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
              <NavMenu lang={lang} />
            </div>
          </div>
        </div>

        <Search lang={lang} />

        <div className="flex items-center gap-2">
        <div className="hidden md:block w-40"></div>
          <div className="flex sm:ml-0 gap-2">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

type NavMenuProps = {
  isSheet?: boolean
  lang: SupportedLanguage
}


// הניווט העליון של האפליקציה
export function NavMenu({ isSheet = false, lang }: NavMenuProps) {
  return (
    <>
      {Navigations.map((item) => {
        // עדכון הניתוב להכיל את השפה אם זה לא קישור חיצוני
        const href = item.external ? item.href : `/${lang}${item.href}`

        const Comp = (
          <Anchor
            key={item.title + href}
            activeClassName="font-bold text-primary"
            absolute
            className="flex items-center gap-1 text-sm rtl:flex-row-reverse"
            href={href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {item.title[lang]}{" "}
            {item.external && (
              <LuArrowUpRight
                className="w-3 h-3 align-super rtl:-rotate-90"
                strokeWidth={3}
              />
            )}
          </Anchor>
        )
        return isSheet ? (
          <SheetClose key={item.title + href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        )
      })}
    </>
  )
}
