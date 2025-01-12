import { Sidebar } from "@/components/navigation/sidebar"
import { SupportedLanguage } from "../layout"

// app/[lang]/docs/layout.tsx
export default async function Documents({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: SupportedLanguage }>
}) {
  const { lang } = await params

  return (
    <div className="flex items-start gap-14">
      <Sidebar lang={lang} />
      <div className="flex-1 md:flex-[6]">{children}</div>
    </div>
  )
}
