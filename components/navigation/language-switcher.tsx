// components/language-switcher.tsx
"use client"

import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (locale: string) => {
    const segments = pathname.split("/")
    segments[1] = locale
    router.push(segments.join("/"))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="max-md:px-2 gap-2">
          <span className="hidden md:block">
          {pathname.split('/')[1] === 'he' ? 'עברית' : 'English'}
          </span>
          <Globe className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => switchLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("he")}>
          עברית
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
