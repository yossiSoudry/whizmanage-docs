"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from 'react'
import { getRoutes } from "@/lib/pageroutes"
import SubLink from "@/components/navigation/sublink"
import { SupportedLanguage } from "@/app/[lang]/layout"

type PageMenuProps = {
  isSheet?: boolean
  lang: SupportedLanguage
}

// פונקציית עזר לחילוץ טקסט לפי שפה
function getLocalizedText(text: { en: string; he: string } | string, lang: SupportedLanguage): string {
  if (typeof text === 'string') return text
  return text[lang]
}

export default function PageMenu({ isSheet = false, lang }: PageMenuProps) {
  const pathname = usePathname()
  const [routes, setRoutes] = useState<ReturnType<typeof getRoutes>>([])

  useEffect(() => {
    setRoutes(getRoutes(lang))
  }, [lang])

  if (!pathname.startsWith(`/${lang}/docs`)) return null

  return (
    <div className="flex flex-col gap-3.5 mt-5 pb-6">
      {routes.map((item, index) => {
        if ("spacer" in item) {
          return (
            <div key={`spacer-${index}`} className="my-2 mr-3">
              <hr className="border-t border-gray-300/50" />
            </div>
          )
        }
        return (
          <div key={getLocalizedText(item.title, lang) + index} className="mb-2">
            {item.heading && (
              <h2 className="text-sm font-bold mb-2 rtl:text-right">
                {getLocalizedText(item.heading, lang)}
              </h2>
            )}
            <SubLink
              lang={lang}
              {...{
                ...item,
                title: getLocalizedText(item.title, lang), // חילוץ הטקסט הנכון
                heading: item.heading ? getLocalizedText(item.heading, lang) : undefined, // חילוץ הטקסט הנכון
                href: `/${lang}/docs${item.href}`,
                level: 0,
                isSheet,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}