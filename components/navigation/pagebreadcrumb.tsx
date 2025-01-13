import { Fragment } from "react"
import { SupportedLanguage } from "@/app/[lang]/layout"
import { Documents } from "@/settings/documents"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface PageBreadcrumbProps {
  paths: string[]
  lang: SupportedLanguage
}

function findPathTranslation(path: string, lang: SupportedLanguage): string {
  // חיפוש רקורסיבי בתוך Documents
  function searchInDocs(docs: typeof Documents): string | null {
    for (const doc of docs) {
      if ('spacer' in doc) continue
      
      // בדיקה אם זה הנתיב הנוכחי
      if (doc.href === `/${path}`) {
        return doc.title[lang]
      }

      // חיפוש רקורסיבי בתתי-תיקיות
      if (doc.items) {
        const found = searchInDocs(doc.items)
        if (found) return found
      }
    }
    return null
  }

  const translation = searchInDocs(Documents)
  return translation || path
}

export default function PageBreadcrumb({ paths, lang }: PageBreadcrumbProps) {
  const isRTL = lang === 'he'

  return (
    <div className="pb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              {isRTL ? "מרכז המידע" : "Docs"}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {paths.map((path, index) => {
            const href = `/${lang}/docs/${paths.slice(0, index + 1).join("/")}`
            const translatedText = findPathTranslation(path, lang)

            return (
              <Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index < paths.length - 1 ? (
                    <BreadcrumbLink href={href}>
                      {translatedText}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>
                      {translatedText}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}