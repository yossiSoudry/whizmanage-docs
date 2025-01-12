import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"

export type SupportedLanguage = 'he' | 'en'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: SupportedLanguage  }>
}) {
  const { lang } = await params
  
  // הגדרת כיוון לפי השפה
  const direction = lang === 'he' ? 'rtl' : 'ltr'

  return (
    <div dir={direction} className={`${direction === 'rtl' ? 'font-hebrew' : ''}`}>
      <Navbar lang={lang} />
      <main className="px-5 sm:px-8 h-auto">{children}</main>
      <Footer />
    </div>
  )
}