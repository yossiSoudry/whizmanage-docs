import Link from "next/link"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

import { getPreviousNext } from "@/lib/markdown"
import { SupportedLanguage } from "@/app/[lang]/layout"

interface PaginationProps {
  pathname: string
  lang: SupportedLanguage
}

export default function Pagination({ pathname, lang }: PaginationProps) {
  const res = getPreviousNext(pathname, lang) // נעביר את השפה לפונקציה
  const isRTL = lang === "he"

  return (
    <div className="flex items-center justify-between sm:py-7 py-5">
      <div>
        {res.prev && (
          <Link
            className="inline-flex gap-1 items-center justify-center h-9 px-4 py-2 ml-auto whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background shadow-sm transition-colors hover:bg-accent dark:hover:bg-slate-800 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 !no-underline"
            href={`/${lang}/docs${res.prev.href}`} // הוספת השפה לנתיב
          >
            {isRTL ? (
              <>
                <LuChevronRight className="w-[1rem] h-[1rem]" />
                <p>{res.prev.title}</p>
              </>
            ) : (
              <>
                <LuChevronLeft className="w-[1rem] h-[1rem]" />
                <p>{res.prev.title}</p>
              </>
            )}
          </Link>
        )}
      </div>
      <div>
        {res.next && (
          <Link
            className="inline-flex items-center justify-center gap-1 h-9 px-4 py-2 ml-auto whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background shadow-sm transition-colors hover:bg-accent dark:hover:bg-slate-800 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 !no-underline"
            href={`/${lang}/docs${res.next.href}`} // הוספת השפה לנתיב
          >
            {isRTL ? (
              <>
                <p>{res.next.title}</p>
                <LuChevronLeft className="w-[1rem] h-[1rem]" />
              </>
            ) : (
              <>
                <p>{res.next.title}</p>
                <LuChevronRight className="w-[1rem] h-[1rem]" />
              </>
            )}
          </Link>
        )}
      </div>
    </div>
  )
}
