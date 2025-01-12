import Link from "next/link"

import { PageRoutes } from "@/lib/pageroutes"
import { buttonVariants } from "@/components/ui/button"

import { SupportedLanguage } from "./layout"

export default async function Home({
  params,
}: {
  params: Promise<{ lang: SupportedLanguage }>
}) {
  const { lang } = await params
  return (
    <div className="min-h-[86.5vh] flex flex-col justify-center items-center text-center px-2 py-8 rtl:font-heebo">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold mb-4 sm:text-7xl rtl:hidden">
        Documents
      </h1>
      <h1 className="text-4xl font-bold mb-4 sm:text-7xl ltr:hidden">
        מרכז המידע
      </h1>

      {/* Description */}
      <p className="max-w-[600px] text-foreground mb-8 sm:text-base rtl:hidden">
        A simple open-source product documentation platform. That&apos;s simple
        to use and easy to customize.
      </p>
      <p className="max-w-[600px] text-foreground mb-8 sm:text-base ltr:hidden">
        מרכז המידע של Whizmanage מספק לך את כל המידע הנחוץ לתפעול מיטבי של
        המערכת. כאן תמצאו הדרכות מפורטות, מענה לשאלות נפוצות ומידע מקצועי שיסייע
        לכם להפיק את המירב מהמערכת.
      </p>

      {/* Button Section */}
      <div className="flex items-center gap-5">
        <Link
          href={`/${lang}/docs${PageRoutes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          <span className="rtl:hidden">Get Started</span>
          <span className="ltr:hidden">שנתחיל?</span>
        </Link>
      </div>
    </div>
  )
}
