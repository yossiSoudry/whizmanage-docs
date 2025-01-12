import { SupportedLanguage } from "@/app/[lang]/layout"
import { PageRoutes } from "@/lib/pageroutes"

type NavigationItem = {
  title: Record<SupportedLanguage, string>
  href: string
  external?: boolean
}

export const Navigations: NavigationItem[] = [
  {
    title: {
      en: "Docs",
      he: "מרכז המידע",
    },
    href: `/docs${PageRoutes[0].href}`,
  },
  {
    title: { 
      en: "Home", 
      he: "אתר הבית" 
    },
    href: "https://www.whizmanage.com/",
    external: true,
  },
]


export const GitHubLink = {
  href: "https://github.com/whizmanagevi/whizmanage-documents",
}
