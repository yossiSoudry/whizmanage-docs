import { notFound } from "next/navigation"

import { getDocument } from "@/lib/markdown"
import { Settings } from "@/lib/meta"
import { PageRoutes } from "@/lib/pageroutes"
import { Typography } from "@/components/ui/typography"
import { BackToTop } from "@/components/navigation/backtotop"
import Feedback from "@/components/navigation/feedback"
import PageBreadcrumb from "@/components/navigation/pagebreadcrumb"
import Pagination from "@/components/navigation/pagination"
import Toc from "@/components/navigation/toc"
import { SupportedLanguage } from "../../layout"

type PageProps = {
  params: Promise<{
    lang: SupportedLanguage
    slug?: string[]
  }>
}

export default async function Pages({ params }: PageProps) {
  const { lang, slug = [] } = await params
  const pathName = slug.join("/")
  const res = await getDocument(pathName, lang)

  if (!res) notFound()

  const { frontmatter, content, tocs } = res

  return (
    <div className="flex items-start gap-14">
      <div className="flex-[3] pt-10">
        <PageBreadcrumb paths={slug} lang={lang} />
        <Typography>
          <h1 className="text-3xl -mt-2">{frontmatter.title}</h1>
          <p className="-mt-4 text-base text-muted-foreground text-[16.5px]">
            {frontmatter.description}
          </p>
          <div>{content}</div>
          <Pagination pathname={pathName} lang={lang} />
        </Typography>
      </div>
      {Settings.rightbar && (
        <div className="hidden xl:flex xl:flex-col sticky top-16 gap-3 py-8 min-w-[230px] h-[94.5vh] toc">
          {Settings.toc && <Toc tocs={tocs} />}
          {Settings.feedback && (
            <Feedback lang={lang} />
          )}
          {Settings.totop && (
            <BackToTop className="mt-6 self-start text-sm text-neutral-800 dark:text-neutral-300/85" />
          )}
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug = [] } = await params
  const pathName = slug.join("/")
  const res = await getDocument(pathName, lang)

  if (!res) return null

  const { frontmatter, lastUpdated } = res

  return {
    title: `${frontmatter.title} - ${Settings.title}`,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    ...(lastUpdated && {
      lastModified: new Date(lastUpdated).toISOString(),
    }),
  }
}

export function generateStaticParams() {
  const locales = ["en", "he"]
  return locales.flatMap((lang) =>
    PageRoutes.filter((item) => item.href).map((item) => ({
      lang,
      slug: item.href.split("/").slice(1),
    }))
  )
}
