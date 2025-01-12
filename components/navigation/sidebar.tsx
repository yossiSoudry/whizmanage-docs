import { LuAlignLeft } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import { DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/navigation/logo"
import { NavMenu } from "@/components/navigation/navbar"
import PageMenu from "@/components/navigation/pagemenu"
import { SupportedLanguage } from "@/app/[lang]/layout"

// components/navigation/sidebar.tsx
type SidebarProps = {
  lang: SupportedLanguage
}

export function Sidebar({ lang }: SidebarProps) {
  return (
    <aside className="md:flex hidden flex-[1] min-w-[230px] sticky top-16 flex-col h-[94.5vh] overflow-y-auto">
      <ScrollArea className="py-4">
        <PageMenu lang={lang} />
      </ScrollArea>
    </aside>
  )
}

export function SheetLeft({ lang }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden flex">
          <LuAlignLeft className="!size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side={lang === "he" ? "right" : "left"}>
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <SheetHeader>
          <SheetClose className="px-5" asChild>
            <Logo />
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5 mt-3 mx-0 px-5">
            <NavMenu isSheet lang={lang} />
          </div>
          <div className="mx-0 px-5">
            <PageMenu isSheet lang={lang} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
