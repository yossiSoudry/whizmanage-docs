import Link from "next/link"
import { LuArrowUpRight } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { SupportedLanguage } from "@/app/[lang]/layout"

export default function RightSideBar({ lang }: { lang: SupportedLanguage }) {
  const isRTL = lang === "he"
  
  // כתובת המייל לתמיכה
  const supportEmail = "support@whizmanage.com"
  
  // יצירת קישורים למייל עם נושאים שונים
  const supportLink = `mailto:${supportEmail}?subject=${encodeURIComponent(isRTL ? 'פנייה למרכז התמיכה' : 'Support Center Inquiry')}`
  const reportLink = `mailto:${supportEmail}?subject=${encodeURIComponent(isRTL ? 'דיווח על תקלה' : 'Issue Report')}`

  return (
    <div className="flex flex-col gap-3 pl-2">
      <h3 className="text-sm font-semibold">{isRTL ? "דברו איתנו" : "Contact Us"}</h3>
      <div className="flex flex-col gap-2">
        <Link
          href={supportLink}
          className={cn(
            "text-sm text-slate-800 dark:text-slate-300/85 no-underline flex items-center gap-1"
          )}
        >
          <span>{isRTL ? "למרכז התמיכה" : "Support Center"}</span>
          <LuArrowUpRight className="w-4 h-4 inline-block rtl:rotate-[270deg]" />
        </Link>
        <Link
          href={reportLink}
          className={cn(
            "text-sm text-slate-800 dark:text-slate-300/85 no-underline flex items-center gap-1"
          )}
        >
          <span>{isRTL ? "לדיווח על תקלה" : "Report Issue"}</span>
          <LuArrowUpRight className="w-4 h-4 inline-block rtl:rotate-[270deg]" />
        </Link>
      </div>
    </div>
  )
}
